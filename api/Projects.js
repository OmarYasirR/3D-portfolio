import axios from 'axios';
import { fetchReadmeImage } from './_lib/fetchReadmeImage.js';

// Server-side only — plain env var names, NOT prefixed with VITE_ or
// REACT_APP_. Set these in your Vercel project's Environment Variables
// dashboard (Settings -> Environment Variables), not in a client .env file.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const OWNER = 'OmarYasirR';

async function getGitHubRepos() {
  const res = await axios.get(`https://api.github.com/users/${OWNER}/repos`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  return res.data;
}

async function getVercelDeployments() {
  const res = await axios.get('https://api.vercel.com/v6/deployments', {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  });
  return res.data.deployments;
}

const normalizeName = (name) => name.toLowerCase().replaceAll(/[_-]/g, '');

const MOBILE_TOPICS = ['mobile', 'react-native', 'flutter', 'android', 'ios', 'expo'];
const BACKEND_TOPICS = ['backend', 'api', 'server', 'microservice'];
const FRONTEND_TOPICS = ['frontend', 'ui', 'landing-page', 'website'];
const FULLSTACK_TOPICS = ['fullstack', 'full-stack'];

// Languages that are only ever used on one side of the stack.
const BACKEND_LANGUAGES = ['Python', 'Java', 'Go', 'Ruby', 'PHP', 'C#', 'Rust', 'Kotlin', 'C++', 'C'];
const FRONTEND_ONLY_LANGUAGES = ['HTML', 'CSS', 'Vue', 'Svelte'];
// JavaScript/TypeScript deliberately excluded from both lists above — GitHub
// reports the same "language" for a React frontend and a Node/Express API,
// so language alone can't tell those apart. Falls through to the keyword
// scan below instead.

const BACKEND_KEYWORDS = ['api', 'server', 'backend', 'express', 'graphql', 'microservice'];
const FRONTEND_KEYWORDS = ['ui', 'landing', 'website', 'client', 'frontend'];
const MOBILE_KEYWORDS = ['mobile', 'android', 'flutter', 'react-native'];

function inferCategory(repo) {
  const topics = repo.topics || [];

  // 1. Explicit topics are the most reliable signal — tag your repos with
  //    these on GitHub (frontend/backend/fullstack/mobile) for accurate
  //    filtering instead of relying on any of the guesswork below.
  if (topics.some((t) => MOBILE_TOPICS.includes(t))) return 'mobile';
  if (topics.some((t) => FULLSTACK_TOPICS.includes(t))) return 'fullstack';
  const hasBackendTopic = topics.some((t) => BACKEND_TOPICS.includes(t));
  const hasFrontendTopic = topics.some((t) => FRONTEND_TOPICS.includes(t));
  if (hasBackendTopic && hasFrontendTopic) return 'fullstack';
  if (hasBackendTopic) return 'backend';
  if (hasFrontendTopic) return 'frontend';

  // 2. Unambiguous languages.
  if (BACKEND_LANGUAGES.includes(repo.language)) return 'backend';
  if (FRONTEND_ONLY_LANGUAGES.includes(repo.language)) return 'frontend';

  // 3. No topics, and language is JS/TS (or undetected) — scan name +
  //    description for hints instead of guessing from language alone.
  const haystack = `${repo.name} ${repo.description || ''}`.toLowerCase();
  const looksBackend = BACKEND_KEYWORDS.some((k) => haystack.includes(k));
  const looksFrontend = FRONTEND_KEYWORDS.some((k) => haystack.includes(k));
  const looksMobile = MOBILE_KEYWORDS.some((k) => haystack.includes(k));

  if (looksMobile) return 'mobile';
  if (looksBackend && looksFrontend) return 'fullstack';
  if (looksBackend) return 'backend';
  if (looksFrontend) return 'frontend';

  // 4. No signal anywhere — 'fullstack' is the safest default since it
  //    reads as "everything" rather than falsely committing to a side.
  return 'fullstack';
}

function mapRepoToProject(repo, vercelURL, imgURL) {
  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || 'No description provided.',
    technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
    category: inferCategory(repo),
    liveUrl: vercelURL || repo.homepage || null,
    githubUrl: repo.html_url,
    imgURL: imgURL || null,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const [githubRepos, vercelDeployments] = await Promise.all([
      getGitHubRepos(),
      getVercelDeployments(),
    ]);

    const projects = await Promise.all(
      githubRepos.map(async (repo) => {
        const match = vercelDeployments.find(
          (dep) => normalizeName(repo.name) === normalizeName(dep.name)
        );
        const imgURL = await fetchReadmeImage(repo.name, OWNER).catch(() => null);
        return mapRepoToProject(repo, match?.url || null, imgURL);
      })
    );

    // This data doesn't change second-to-second — cache it at the CDN edge
    // so repeat visits don't re-burn your GitHub/Vercel API rate limits.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ projects });
  } catch (err) {
    console.error('Failed to build projects list:', err.message);
    return res.status(502).json({ error: 'Failed to fetch projects' });
  }
}
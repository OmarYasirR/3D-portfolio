import axios from 'axios';
import { fetchReadmeImage } from './lib/FetchReadmeImage.js';

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


// ─── CATEGORY INFERENCE ──────────────────────────────────────────────

const normalizeName = (name) => name.toLowerCase().replaceAll(/[_-]/g, '');


function inferCategory(repo) {
  const topics = repo.topics || [];
  const category = topics.find(t => t.startsWith("cat-"))?.replace("cat-", "") ?? "other"

  return category
}

function mapRepoToProject(repo, vercelURL, imgURL) {
  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || 'No description provided.',
    technologies: [repo.language, ...(repo.topics.filter(t => !t.startsWith('cat-')) || [])].filter(Boolean),
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
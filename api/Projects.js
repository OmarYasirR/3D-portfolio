import axios from "axios";
import { fetchReadmeImage } from "./lib/FetchReadmeImage.js";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const OWNER = "OmarYasirR";

// ─── VERCEL PROJECTS ─────────────────────────────────────────────────

async function getVercelProjects() {
  if (!VERCEL_TOKEN) {
    console.warn(
      "VITE_VERCEL_TOKEN is not set — falling back to repo.homepage for live URLs.",
    );
    return [];
  }

  try {
    const res = await axios.get("https://api.vercel.com/v9/projects", {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      // No teamId — defaults to your personal account.
      params: { limit: 100 },
    });

    const projects = res.data.projects || [];
    return projects;
  } catch (err) {
    console.error("Failed to fetch Vercel projects:", err.message);
    return []; // fail gracefully — projects still render with homepage fallback
  }
}

// Extract the *stable* production URL from a Vercel project object.
// Returns the custom domain if one exists, otherwise the
// <project-name>.vercel.app production alias.
// NEVER returns an immutable deployment URL like <project>-<hash>-<team>.vercel.app.
function getVercelProductionUrl(project) {
  if (!project) return null;

  const prod = project.targets?.production;
  if (!prod) return null;

  // `alias` is an array of every domain currently pointing at production.
  const aliases = Array.isArray(prod.alias) ? prod.alias : [];

  // Prefer a custom domain (anything not ending in .vercel.app).
  const customDomain = aliases.find((d) => !d.endsWith(".vercel.app"));

  // Fall back to the first alias, then to prod.url.
  const chosen = customDomain || aliases[0] || prod.url;

  return chosen ? `https://${chosen}` : null;
}

// ─── CATEGORY INFERENCE ──────────────────────────────────────────────

const normalizeName = (name) => name.toLowerCase().replaceAll(/[_-]/g, "");

function inferCategory(repo) {
  const topics = repo.topics || [];
  const category =
    topics.find((t) => t.startsWith("cat-"))?.replace("cat-", "") ?? "other";

  return category;
}

function mapRepoToProject(repo, vercelURL, imgURL) {
  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || "No description provided.",
    technologies: [
      repo.language,
      ...(repo.topics.filter((t) => !t.startsWith("cat-")) || []),
    ].filter(Boolean),
    category: inferCategory(repo),
    liveUrl: vercelURL || repo.homepage || null,
    githubUrl: repo.html_url,
    imgURL: imgURL || null,
  };
}

export async function fetchProjects() {
  if (
    projectsCache.data &&
    Date.now() - projectsCache.timestamp < CACHE_TTL_MS
  ) {
    return projectsCache.data;
  }

  try {
    const [reposRes, vercelProjects] = await Promise.all([
      axios.get(
        `https://api.github.com/users/${OWNER}/repos?per_page=100&sort=updated`,
        {
          headers: {
            ...(GITHUB_TOKEN
              ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
              : {}),
            Accept: "application/vnd.github.v3+json",
          },
        },
      ),
      getVercelProjects(),
    ]);

    const projects = await Promise.all(
      reposRes.data.map(async (repo) => {
        // Match on project name — no more `dep.name` from a deployment record.
        const match = vercelProjects.find(
          (proj) => normalizeName(repo.name) === normalizeName(proj.name),
        );
        const imgURL = await fetchReadmeImage(repo.name).catch(() => null);
        return mapRepoToProject(repo, getVercelProductionUrl(match), imgURL);
      }),
    );

    projectsCache.data = projects;
    projectsCache.timestamp = Date.now();
    return projects;
  } catch (err) {
    console.error("Failed to fetch projects:", err.message);
    throw err;
  }
}

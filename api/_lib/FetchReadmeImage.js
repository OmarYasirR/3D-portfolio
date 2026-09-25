import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // server-only — no VITE_/REACT_APP_ prefix needed

const cache = new Map();

function decodeBase64Utf8(base64) {
  return Buffer.from(base64.replace(/\n/g, ''), 'base64').toString('utf-8');
}

function extractFirstImage(markdown) {
  const markdownMatch = markdown.match(/!\[[^\]]*\]\(([^)\s]+)/);
  if (markdownMatch) return markdownMatch[1];

  const htmlMatch = markdown.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (htmlMatch) return htmlMatch[1];

  return null;
}

function resolveImageUrl(imageUrl, readmeDownloadUrl) {
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  const base = readmeDownloadUrl.slice(0, readmeDownloadUrl.lastIndexOf('/') + 1);
  const cleanPath = imageUrl.replace(/^\.\//, '');
  return base + cleanPath;
}

async function fetchReadmeImage(repoName, owner) {
  const cacheKey = `${owner}/${repoName}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/readme`, {
      headers: {
        ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const { content, download_url: downloadUrl } = res.data;
    if (!content || !downloadUrl) {
      cache.set(cacheKey, null);
      return null;
    }

    const markdown = decodeBase64Utf8(content);
    const imageUrl = extractFirstImage(markdown);
    const resolved = imageUrl ? resolveImageUrl(imageUrl, downloadUrl) : null;

    cache.set(cacheKey, resolved);
    return resolved;
  } catch (err) {
    if (err.response?.status !== 404) {
      console.error(`Failed to fetch README image for ${repoName}:`, err.message);
    }
    cache.set(cacheKey, null);
    return null;
  }
}

export { fetchReadmeImage };
import axios from 'axios';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const DEFAULT_OWNER = 'OmarYasirR';

// In-memory cache so re-renders / re-measurements (pagination re-runs this
// on every filter change) don't refire a GitHub request per repo each time.
const cache = new Map();

function decodeBase64Utf8(base64) {
  // README content comes back base64-encoded, with embedded newlines.
  const binary = atob(base64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
}

function extractFirstImage(markdown) {
  // Markdown syntax: ![alt](url)
  const markdownMatch = markdown.match(/!\[[^\]]*\]\(([^)\s]+)/);
  if (markdownMatch) return markdownMatch[1];

  // Raw HTML: <img src="url" ...>
  const htmlMatch = markdown.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (htmlMatch) return htmlMatch[1];

  return null;
}

function resolveImageUrl(imageUrl, readmeDownloadUrl) {
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;

  // readmeDownloadUrl looks like:
  // https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md
  // Strip the filename to get the repo-root base, then resolve the
  // (possibly nested, possibly "./"-prefixed) relative path against it.
  const base = readmeDownloadUrl.slice(0, readmeDownloadUrl.lastIndexOf('/') + 1);
  const cleanPath = imageUrl.replace(/^\.\//, '');
  return base + cleanPath;
}

/**
 * Returns the first image found in a repo's README, resolved to an
 * absolute URL — or null if the repo has no README, the README has no
 * image, or the request fails (missing README is a normal 404, not an
 * error worth surfacing).
 */
export async function fetchReadmeImage(repoName, owner = DEFAULT_OWNER) {
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
    // 404 (no README) is expected and common — don't log those as errors.
    if (err.response?.status !== 404) {
      console.error(`Failed to fetch README image for ${repoName}:`, err);
    }
    cache.set(cacheKey, null);
    return null;
  }
}
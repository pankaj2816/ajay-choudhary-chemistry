/**
 * Helper to download files safely respecting basePath on GitHub Pages and local environments
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}

export async function triggerDownload(fileUrl: string, fileName?: string): Promise<void> {
  if (!fileUrl) return;

  const resolvedUrl = getAssetUrl(fileUrl);
  const targetName = fileName || fileUrl.split('/').pop() || 'chemistry_document.pdf';

  // If it's a base64 data URL (e.g. uploaded by teacher in admin)
  if (resolvedUrl.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = resolvedUrl;
    link.download = targetName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Fetch as blob for 100% reliable local & GitHub Pages download without browser security blocks
  try {
    const res = await fetch(resolvedUrl);
    if (!res.ok) throw new Error('File not found at ' + resolvedUrl);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = targetName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.warn('Direct blob download fallback:', err);
    // Fallback to direct link click
    const link = document.createElement('a');
    link.href = resolvedUrl;
    link.download = targetName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

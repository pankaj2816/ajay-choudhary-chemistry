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

export function triggerDownload(fileUrl: string, fileName?: string): void {
  const resolvedUrl = getAssetUrl(fileUrl);
  const link = document.createElement('a');
  link.href = resolvedUrl;
  if (fileName) {
    link.download = fileName;
  } else {
    link.download = fileUrl.split('/').pop() || 'chemistry_document.pdf';
  }
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

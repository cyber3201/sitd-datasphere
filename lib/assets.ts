
/**
 * Helper to resolve static asset paths.
 * Handles the logic for base paths if the app is deployed in a subdirectory.
 */
export const getAssetPath = (path: string): string => {
  if (path.startsWith('http')) return path;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If we are using Next.js runtime environment variables
  const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  
  // If we were using Vite, we might check import.meta.env.BASE_URL
  // But sticking to the requested spec:
  return `${publicBase}${normalizedPath}`;
};

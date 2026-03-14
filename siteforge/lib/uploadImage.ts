/**
 * Uploads a file to Cloudinary via the /api/upload server route.
 * Returns the permanent Cloudinary URL.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body:   formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Upload failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.url as string;
}

export function getFileUrl(path: string, fileName: string) {
  return new URL(`${path}${fileName}`, import.meta.url).href
}


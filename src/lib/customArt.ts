// Drop your own artwork into src/assets/custom/ and it will automatically replace the
// crayon placeholder. File name (without extension) = the "slot" name. See README.md in that folder.
const files = import.meta.glob('../assets/custom/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const customArt: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  customArt[name] = url;
}

/** Find the most specific custom image for an actor, e.g. "falcon-top" before "falcon". */
export function resolveCustom(key: string, p: Record<string, unknown> = {}): string | undefined {
  const parts: string[] = [];
  if (p.part && p.part !== 'full') parts.push(String(p.part));
  if (p.broken) parts.push('broken');
  if (p.sleep || p.sleepy) parts.push('asleep');
  const specific = [key, ...parts].join('-');
  return customArt[specific] ?? customArt[key];
}

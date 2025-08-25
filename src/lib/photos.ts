export const FIXED_WORK_QUERY = 'working adult'; // 単一の安定クエリ

export function unsplashFixed(seed: string, width = 800, height = 480) {
  const q = encodeURIComponent(FIXED_WORK_QUERY);
  // APIキー不要、横長優先。sigで適度にバラけつつ安定。
  return `https://source.unsplash.com/featured/${width}x${height}?${q}&orientation=landscape&sig=${seed}`;
}
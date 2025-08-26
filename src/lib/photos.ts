// 働く人の写真リスト（Unsplash静的URL）
const WORK_PHOTOS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296',
  'https://images.unsplash.com/photo-1559192823-e1d8e87def54',
  'https://images.unsplash.com/photo-1573497019418-b400bb3ab074',
  'https://images.unsplash.com/photo-1582896911227-c966f6e7fb93',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
  'https://images.unsplash.com/photo-1587691592099-24045742c181',
  'https://images.unsplash.com/photo-1551651056-dbdf6f173a52',
  'https://images.unsplash.com/photo-1508243771214-6e95d137426b',
  'https://images.unsplash.com/photo-1562113530-57ba467cea38',
  'https://images.unsplash.com/photo-1573496774426-fe3db3dd1731',
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
  'https://images.unsplash.com/photo-1542744094-24638eff58bb',
  'https://images.unsplash.com/photo-1581579188707-3d2b9baf2153',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
  'https://images.unsplash.com/photo-1556745757-8d76bdb6984b',
  'https://images.unsplash.com/photo-1552664730-d307ca884978'
];

// シンプルなハッシュ関数でseedから数値を生成
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function unsplashFixed(seed: string, width = 800, height = 480) {
  // seedから安定的にインデックスを生成
  const index = hashCode(seed) % WORK_PHOTOS.length;
  const photoId = WORK_PHOTOS[index];
  
  // Unsplashの最適化されたURL（サイズ指定付き）
  return `${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}
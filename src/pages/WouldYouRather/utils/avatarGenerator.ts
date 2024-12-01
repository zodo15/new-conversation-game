// Avatar generator utility
// Generates a random avatar URL using DiceBear Avatars API
// https://avatars.dicebear.com/docs/

const AVATAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'bottts',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral'
];

export const generateAvatar = (): string => {
  const style = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
  const seed = Math.random().toString(36).substring(7);
  return `https://avatars.dicebear.com/api/${style}/${seed}.svg`;
};

/** Hash routing keeps this a static site that works offline and on any host. */
export const go = (path: string) => {
  window.location.hash = path;
};

const KEY = 'myssri.wishlist';

/** Searches we couldn't match. Stored on this device only. */
export function saveWish(term: string) {
  try {
    const list: string[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!list.includes(term)) list.push(term);
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

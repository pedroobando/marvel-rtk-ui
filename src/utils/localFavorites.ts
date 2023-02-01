const nameFavorite = 'marvelfav';

const lSave = (favStore: any): void => {
  const favorites: string = JSON.stringify(favStore);

  localStorage.setItem(nameFavorite, favorites);
};

const lRead = () => {
  const favorites = localStorage.getItem(nameFavorite) || '';
  return JSON.parse(favorites);
};

export { lSave, lRead };

import { FormattedImage } from 'types';

export const getImages = (): Promise<{ results: FormattedImage[] }> => {
  return fetch('/api/contentful')
    .then((response) => {
      return response.json();
    })
    .catch(() => new Error('Error fetching images'));
};

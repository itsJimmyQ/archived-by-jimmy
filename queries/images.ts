import { FormattedImage } from 'types';

export const getImages = (): Promise<{ results: FormattedImage[] }> => {
  return new Promise((resolve, reject) => {
    fetch('/api/contentful')
      .then((response) => {
        resolve(response.json());
      })
      .catch(reject);
  });
};

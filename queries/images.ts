import { FormattedImage } from 'types';

export const getImages = (): Promise<{ results: FormattedImage[]; last_updated_at: string }> => {
  return fetch('/api/contentful')
    .then((response) => {
      return response.json();
    })
    .catch(() => new Error('Error fetching images'));
};

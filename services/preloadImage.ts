export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = `https:${src}`;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

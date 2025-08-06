import ImageNotFound from '../assets/image-error.jpeg';
export const handleErorrImage = (
  event: React.SyntheticEvent<HTMLImageElement>
) => {
  event.currentTarget.src = ImageNotFound.src;
  event.currentTarget.alt = 'Image Not Found';
};

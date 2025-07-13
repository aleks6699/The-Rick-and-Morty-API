import ImageNotFound from '../assets/image-error.jpeg';
export const handleErorrImage = (
  event: React.SyntheticEvent<HTMLImageElement>
) => {
  event.currentTarget.src = ImageNotFound;
  event.currentTarget.alt = 'Image Not Found';
};

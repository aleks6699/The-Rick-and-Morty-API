import { handleErorrImage } from '../utils/handleErrorImage';
import ImageNotFound from '../assets/image-error.jpeg';

describe('handleErorrImage', () => {
  it('should set the image source to ImageNotFound on error', () => {
    const event = {
      currentTarget: {
        src: '',
        alt: '',
      },
    } as React.SyntheticEvent<HTMLImageElement>;

    handleErorrImage(event);

    expect(event.currentTarget.src).toBe(ImageNotFound);
    expect(event.currentTarget.alt).toBe('Image Not Found');
  });
});

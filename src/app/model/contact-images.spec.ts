import { ContactImages } from './contact-images';

describe('ContactImages', () => {
  it('should create an instance', () => {
    expect(new ContactImages()).toBeTruthy();
  });
  it('should exercise constructor', () => {
    const large = 'largeImage.jpg';
    const medium = 'mediumImage.jpg';
    const thumbnail = 'thumbnail.jpg';
    const images = new ContactImages(large, medium, thumbnail);
    expect(images.large).toBe(large);
    expect(images.medium).toBe(medium);
    expect(images.thumbnail).toBe(thumbnail);
  })
});

import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightPipe();
    expect(pipe).toBeTruthy();
  });
  it('applies highlight span', () => {
    const pipe = new HighlightPipe();
    const valueIn = 'This is a test sentence.';
    const searchString = 'test';
    const expected = valueIn.replace(searchString, `<span class='highlight'>${searchString}</span>`);
    expect(pipe.transform(valueIn, searchString)).toBe(expected);
  });
});

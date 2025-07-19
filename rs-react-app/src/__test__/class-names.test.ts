import { cn } from '../utils/class-names';

describe('cn', () => {
  it('should return a single class name', () => {
    expect(cn('class1')).toBe('class1');
  });

  it('should return multiple class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should ignore falsy values', () => {
    expect(cn('class1', '', null, undefined, 'class2')).toBe('class1 class2');
  });

  it('should handle arrays of class names', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should handle mixed inputs', () => {
    expect(cn('class1', ['class2', 'class3'], null, 'class4')).toBe(
      'class1 class2 class3 class4'
    );
  });
});

import {
  assertIsHTMLButtonElement,
  assertIsHTMLInputElement,
  assertIsHTMLSelectElement,
  assertIsHTMLElement,
} from '../utils/asserts/domAsserts';
import { describe, expect, it } from 'vitest';

describe('DOM Asserts', () => {
  it('should assert HTMLElement', () => {
    const el = document.createElement('div');
    assertIsHTMLElement(el);
    expect(el).toBeInstanceOf(HTMLElement);
  });

  it('should assert HTMLInputElement', () => {
    const el = document.createElement('input');
    assertIsHTMLInputElement(el);
    expect(el).toBeInstanceOf(HTMLInputElement);
  });

  it('should assert HTMLButtonElement', () => {
    const el = document.createElement('button');
    assertIsHTMLButtonElement(el);
    expect(el).toBeInstanceOf(HTMLButtonElement);
  });

  it('should assert HTMLSelectElement', () => {
    const el = document.createElement('select');
    assertIsHTMLSelectElement(el);
    expect(el).toBeInstanceOf(HTMLSelectElement);
  });
  it('should throw error for non-HTMLElement', () => {
    expect(() => assertIsHTMLElement(null)).toThrow(
      'Element is not an HTMLElement'
    );
    expect(() => assertIsHTMLElement({})).toThrow(
      'Element is not an HTMLElement'
    );
  });
  it('should throw error for non-HTMLInputElement', () => {
    expect(() => assertIsHTMLInputElement(null)).toThrow(
      'Element is not an HTMLInputElement'
    );
    expect(() => assertIsHTMLInputElement({})).toThrow(
      'Element is not an HTMLInputElement'
    );
  });
  it('should throw error for non-HTMLButtonElement', () => {
    expect(() => assertIsHTMLButtonElement(null)).toThrow(
      'Element is not an HTMLButtonElement'
    );
    expect(() => assertIsHTMLButtonElement({})).toThrow(
      'Element is not an HTMLButtonElement'
    );
  });
  it('should throw error for non-HTMLSelectElement', () => {
    expect(() => assertIsHTMLSelectElement(null)).toThrow(
      'Element is not an HTMLSelectElement'
    );
    expect(() => assertIsHTMLSelectElement({})).toThrow(
      'Element is not an HTMLSelectElement'
    );
  });
});

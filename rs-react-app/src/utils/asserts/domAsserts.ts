export function assertIsHTMLElement(el: unknown): asserts el is HTMLElement {
  if (!(el instanceof HTMLElement)) {
    throw new Error('Element is not an HTMLElement');
  }
}
export function assertIsHTMLInputElement(
  el: unknown
): asserts el is HTMLInputElement {
  if (!(el instanceof HTMLInputElement)) {
    throw new Error('Element is not an HTMLInputElement');
  }
}
export function assertIsHTMLButtonElement(
  el: unknown
): asserts el is HTMLButtonElement {
  if (!(el instanceof HTMLButtonElement)) {
    throw new Error('Element is not an HTMLButtonElement');
  }
}
export function assertIsHTMLSelectElement(
  el: unknown
): asserts el is HTMLSelectElement {
  if (!(el instanceof HTMLSelectElement)) {
    throw new Error('Element is not an HTMLSelectElement');
  }
}

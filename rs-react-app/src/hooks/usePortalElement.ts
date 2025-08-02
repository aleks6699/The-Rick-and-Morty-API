import { useEffect, useState } from 'react';
import { assertIsHTMLElement } from '@/utils/asserts/domAsserts';

export function usePortalElement(id: string) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(id);
    if (el) {
      assertIsHTMLElement(el);
      setElement(el);
    }
  }, [id]);

  return element;
}

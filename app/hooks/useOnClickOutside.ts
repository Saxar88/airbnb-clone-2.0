import { useEffect, RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

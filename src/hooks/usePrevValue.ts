import { useEffect, useRef } from 'react';

/**
 * Hook to store previous ref
 * @param value
 */
export default function usePrevious(value: number) {
    const ref = useRef({});

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

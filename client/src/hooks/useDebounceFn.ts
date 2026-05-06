import { useRef, useCallback } from 'react'

export const useDebounceFn = <T extends (...args: any[]) => void>(callback: T, delay = 400) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    return useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }

            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )
}

'use client'
import { animate, KeyframeOptions, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

export const AnimationCounter = ({ from, to, animationOptions }: {
    from: number,
    to: number,
    animationOptions?: KeyframeOptions
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref);
    const duration = to <= 10 ? 0.5 : 1.5;

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;
        if (!element || !inView) return;

        element.textContent = from.toString();
        const control = animate(from, to, {
            duration: duration,
            ease: 'easeOut',
            ...animationOptions,
            onUpdate(value) {
                element.textContent = value.toFixed(0);
            }
        });

        return () => {
            control.stop();
        }

    }, [ref, inView, from, to]);
    return <span className="font-semibold" ref={ref} />
}
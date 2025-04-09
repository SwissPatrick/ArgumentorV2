
import { useEffect, useRef, useState } from "react";

interface ScrollingTickerProps {
    items: string[];
    duration?: number;
    className?: string;
}

export function ScrollingTicker({
                                    items,
                                    duration = 30,
                                    className = ""
                                }: ScrollingTickerProps) {
    const [duplicatedItems, setDuplicatedItems] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Duplicate items to ensure continuous scrolling
        setDuplicatedItems([...items, ...items]);
    }, [items]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div
                ref={containerRef}
                className="whitespace-nowrap inline-flex animate-marquee"
                style={{
                    animationDuration: `${duration}s`
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <div
                        key={index}
                        className="mx-8 inline-block"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

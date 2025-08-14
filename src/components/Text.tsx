import type { HTMLElementType, PropsWithChildren } from 'react';

interface Props {
    component?: HTMLElementType,
    size: "lg" | "md" | "sm",
    className?: string,
}

function Text({ component, children, size, className }: PropsWithChildren<Props>) {
    const Component = component || 'div';

    const sizeClasses =
        size === "lg" ? "text-4xl font-medium" :
        size === "md" ? "text-2xl font-medium" : "text-base font-medium"; 

    return (
        <Component className={`${sizeClasses} font-inter text-gray-700 ${className}`}>
            {children}
        </Component>
    );
}

export { Text }

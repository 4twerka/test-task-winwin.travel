import type { ElementType, PropsWithChildren, MouseEventHandler } from 'react';

interface Props<T extends HTMLElement = HTMLDivElement> {
    component?: ElementType;
    size: "lg" | "md" | "sm";
    className?: string;
    onClick?: MouseEventHandler<T>;
}

function Text<T extends HTMLElement = HTMLDivElement>({
    component,
    children,
    size,
    className,
    onClick
}: PropsWithChildren<Props<T>>) {
    const Component = component || 'div';

    const sizeClasses =
        size === "lg" ? "text-4xl font-medium" :
        size === "md" ? "text-2xl font-medium" :
        "text-base font-medium";

    return (
        <Component onClick={onClick} className={`${sizeClasses} font-inter text-gray-700 ${className}`}>
            {children}
        </Component>
    );
}

export { Text };
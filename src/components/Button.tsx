interface Props {
    children: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
    variant: "primary" | "secondary",
}

function Button({ children, onClick, className, variant }: Props) {
    const primaryClasses = "bg-customOrange text-white border-none hover:bg-customOrangeHover transition-colors duration-200";
    const secondaryClasses = "bg-none border-2 border-gray-400 text-gray-700 hover:bg-gray-300 transition-colors duration-200";
    return (
        <button
            className={`${variant === "primary" ? primaryClasses : variant === "secondary" ? secondaryClasses : ""} cursor-pointer font-semibold font-inter px-18 py-4 rounded-2xl ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export { Button }
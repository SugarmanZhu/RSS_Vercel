interface ButtonProps {
    onClick: () => void;
    text?: string;
    Icon?;
    className?: string;
}

export default function Button({ 
    text="This is a button", 
    onClick, 
    Icon,
    className } : ButtonProps
) {
    return (
        <button className={`flex-col opacity-80 hover:opacity-100
        bg-neutral-300 dark:bg-neutral-700 
        hover:bg-neutral-800 hover:text-neutral-50
        dark:hover:bg-neutral-50 dark:hover:text-neutral-900 
        transition-all ${className}`} 
        onClick={onClick}>
            <Icon className="m-auto w-8 md:w-12 lg:w-16"/>
            <p className="hidden lg:flex">{text}</p>
        </button>
    );
};
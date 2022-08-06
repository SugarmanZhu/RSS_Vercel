interface ButtonProps {
    onClick: () => void;
    text: string;
    className?: string;
}

export default function Button({ 
    text="This is a button", 
    onClick, 
    className } : ButtonProps
) {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
};
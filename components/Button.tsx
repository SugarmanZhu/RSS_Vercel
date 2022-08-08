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
        <button className={className} onClick={onClick}>
            <Icon />{text}
        </button>
    );
};
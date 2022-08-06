interface TitleProps {
    title: string;
    className?: string;
}

function Title({ title = "This is a title", className } : TitleProps) {
    return <h1 className={className}>{title}</h1>
}

export default Title;
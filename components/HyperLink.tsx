interface HyperLinkProps {
    text: string;
    link: string;
    className?: string;
}

export default function HyperLink({ 
    text = "This is a link", 
    link, 
    className } : HyperLinkProps
) {
    return <a className={`m-2 p-2 h-fit rounded-lg transition-colors ${className}`} href={link}>{text}</a>
};
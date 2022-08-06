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
    return <a className={className} href={link}>{text}</a>
};
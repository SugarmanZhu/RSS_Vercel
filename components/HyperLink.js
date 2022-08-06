export default function HyperLink({ text, link, className }) {
    return <a className={className} href={link}>{text}</a>
};
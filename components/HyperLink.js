export default function HyperLink({ id, text, link }) {
    return <a id={id} href={link}>{text}</a>
};
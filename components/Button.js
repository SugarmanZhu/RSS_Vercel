export default function Button({ id, text, onClick, className }) {
    return <button id={id} className={className} onClick={onClick}>{text}</button>
};
export default function Button({ id, text, onClick }) {
    return <button id={id} className="button" onClick={onClick} >{text}</button>
};
function RSSItem({ rss, fetch_time }) {
    return (
        <div className="rss-item">
            <a className="rss-title" href={rss.link}>{rss.title}</a>
            <p className="rss-info">
                <span className="provider">{rss.provider}</span>
                <span> · </span>
                <span className="date" alt_time={rss.time} onClick={(e) => toggleDate(e)}>{rss.time_passed}</span>
            </p>
            <p className="rss-content" onClick={(e) => toggleExpand(e)}>{rss.content}</p>
        </div>
    );
}

function toggleDate(clicked) {
    const time = clicked.target.getAttribute("alt_time");
    clicked.target.setAttribute("alt_time", clicked.target.innerText);
    clicked.target.innerText = time;
}

function toggleExpand(clicked) {
    clicked.target.classList.toggle("expand");
}

// function processContent(content, maxLength) {
//     if (content.length > maxLength) {
//         return content.substring(0, maxLength - 3) + "...";
//     }
//     return content;
// }

export default RSSItem;
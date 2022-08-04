function RSSItem({ rss }) {
    return (
        <div className="rss-item">
            <a className="rss-title" href={rss.link}>{rss.title}</a>
            <p className="rss-info">
                <span className="provider">{rss.provider}</span>
                <span> · </span>
                <span className="date" alt_time={rss.time_string} 
                onClick={(e) => toggleDate(e)}>{rss.time_passed}</span>
            </p>
            <p className="rss-content collapse" onClick={(e) => toggleExpand(e)}>{rss.content}</p>
        </div>
    );
}

function toggleDate(clicked) {
    const time = clicked.target.getAttribute("alt_time");
    clicked.target.setAttribute("alt_time", clicked.target.innerText);
    clicked.target.innerText = time;
}

async function toggleExpand(clicked) {
    const classList = clicked.target.classList;
    if (classList.contains("expand")) {
        classList.remove("expand");
        await new Promise(r => setTimeout(r, 250));  // wait for collapse animation
        classList.add("collapse");
    } else {
        classList.add("expand");
        classList.remove("collapse");
    }
}

// function processContent(content, maxLength) {
//     if (content.length > maxLength) {
//         return content.substring(0, maxLength - 3) + "...";
//     }
//     return content;
// }

export default RSSItem;
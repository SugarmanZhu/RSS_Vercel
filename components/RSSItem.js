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
    // if user not trying to select text, toggle date
    if (window.getSelection().type != "Range") {
        // toggle date format (45 minutes ago <-> Fri, 05 Aug 2022 02:37:25 GMT)
        const time = clicked.target.getAttribute("alt_time");
        clicked.target.setAttribute("alt_time", clicked.target.innerText);
        clicked.target.innerText = time;
    }
}

async function toggleExpand(clicked) {
    // if user not trying to select text, toggle expand
    if (window.getSelection().type != "Range") {
        const classList = clicked.target.classList;
        if (classList.contains("expand")) {
            classList.remove("expand");
            /* 
                -webkit-line-clamp breaks css animation for some reason
                wait for collapse animation (250ms) to finish before line-clamp
            */
            await new Promise(r => setTimeout(r, 250));
            classList.add("collapse");
        } else {
            classList.add("expand");
            classList.remove("collapse");
        }
    }
}

export default RSSItem;
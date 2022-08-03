function RSSItem({ rss }) {
    return (
        <div className="rss-item">
            <a className="rss-title" href={rss.link}>{rss.title}</a>
            <p className="rss-info">
                <span className="provider">{rss.provider}</span>
                <span> · </span>
                <span className="date" alt_time={rss.date} onClick={(e) => toggleDate(e)}>{timePassed(rss.date)}</span>
            </p>
            <p className="rss-content" onClick={(e) => toggleExpand(e)}>{rss.content}</p>
        </div>
    );
}

function timePassed(time) {
    const date = new Date(Date.parse(time));
    const now = new Date();
    const diff = now - date;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 1) {
        return days + " days ago";
    } else if (days === 1) {
        return "1 day ago";
    } 

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours > 1) {
        return hours + " hours ago";
    } else if (hours === 1) {
        return "1 hour ago";
    } 

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes > 1) {
        return minutes + " minutes ago";
    } else if (minutes === 1) {
        return "1 minute ago";
    } 
    
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (seconds > 1) {
        return seconds + " seconds ago";
    } else if (seconds === 1) {
        return "1 second ago";
    }
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
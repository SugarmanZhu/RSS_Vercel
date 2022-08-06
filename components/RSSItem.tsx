function RSSItem({ rss }) {
    return (
        <div className="p-4 mt-2 border-b-4 border-neutral-300 
            dark:border-neutral-700 transition-colors">
            <a className="text-2xl font-bold" href={rss.link}>{rss.title}</a>
            <p className="text-neutral-500 py-px justify-center">
                <span>{rss.provider}</span>
                <span> · </span>
                <span data-alt_time={rss.time_string} 
                onClick={(e) => toggleDate(e)}>
                    {rss.time_passed}
                </span>
            </p>
            <p onClick={(e) => toggleExpand(e)} 
                className="my-2 max-h-60 line:max-h-96 leading-normal 
                transition-[max-height] line-clamp-10 line:line-clamp-16">
                {rss.content}
            </p>
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
    // if user is trying to select text, DO NOT toggle expand
    if (window.getSelection().type != "Range") {
        const classList = clicked.target.classList;
        // TODO - improve this
        if (classList.contains("max-h-96")) {
            classList.remove("max-h-96");
            classList.add("max-h-60");
            /* 
                -webkit-line-clamp breaks css animation for some reason
                wait for collapse animation (150ms) to finish before line-clamp
            */
            await new Promise(r => setTimeout(r, 150));
            classList.remove("line-clamp-16");
            classList.add("line-clamp-10");
        } else {
            classList.remove("max-h-60");
            classList.add("max-h-96");
            classList.remove("line-clamp-10");
            classList.add("line-clamp-16");
        }
    }
}

export default RSSItem;
import RSSItem from "./RSSItem";

function RSSList({ feeds }) {
    return (
        <div className="rss-list">
            <ul>
                {feeds.map((feed, f_id) => (
                    <li key={f_id}>
                        <RSSItem rss={feed} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RSSList;
import RSSItem from "./RSSItem";

function RSSList({ feeds }) {
    return (
        <div className="relative">
            <div className="rss-list">
                <ul>
                    {feeds.map((feed, f_id) => (
                        <li key={f_id}>
                            <RSSItem rss={feed} />
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className="absolute bottom-0 w-full h-20 text-center">End of RSS Feeds</h2>
            <div id="bottom_fade" className="fixed bottom-0 left-0 w-full h-28 transition duration-200 ease-in-out bg-gradient-to-t from-black" />
        </div>)
}

export default RSSList;
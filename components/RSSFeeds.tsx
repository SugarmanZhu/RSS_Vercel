import Title from "./Title";
import RSSList from "./RSSList";

function RSSFeeds({ feeds }) {
    return (
        <div className="max-w-6xl p-4 m-auto">
          <Title 
            title="Welcome to RSS Feeds" 
            className="text-5xl font-bold text-center m-8"
          />
          <RSSList feeds={feeds} />
        </div>
    );
}

export default RSSFeeds;
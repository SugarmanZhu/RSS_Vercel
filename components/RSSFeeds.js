import Title from "../components/Title";
import RSSList from "../components/RSSList";

function RSSFeeds({ feeds }) {
    return (
        <div className="container">
          <Title title="Welcome to RSS Feeds"/>
          <RSSList feeds={feeds} />
        </div>
    );
}

export default RSSFeeds;
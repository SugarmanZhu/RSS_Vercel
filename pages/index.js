import Parser from "rss-parser";
import RSSFeeds from "../components/RSSFeeds";

function HomePage({ allFeeds }) {
  return <RSSFeeds feeds={allFeeds} />
}

export default HomePage;

async function getFeeds(rss_sources, limit) {
  const parser = new Parser();
  let feeds = [];
  for (const [source, link] of Object.entries(rss_sources)) {
    const rss_feeds = await parser.parseURL(link);
    for (const item of rss_feeds.items) {
      const date = item.isoDate.substring(0, 10) + " " + item.isoDate.substring(11, 19);
      feeds.push({
        "title" : item.title,
        "link" : item.link,
        "date" : date,
        "content" : item.contentSnippet,
        "provider" : source,
      });
    }
  }
  feeds.sort((a, b) => b.date.localeCompare(a.date))

  return feeds.slice(0, limit);
}

export const getStaticProps = async () => {

  const sources = {
    "知乎每日精选" : "https://www.zhihu.com/rss",
    "微软亚洲研究院" : "https://msra.cn/feed",
    "MIT Technology Review" : "https://www.technologyreview.com/feed/",
    "TechCrunch" : "https://techcrunch.com/feed",
    "The Verge" : "https://www.theverge.com/rss/frontpage",
    "Mashable" : "https://mashable.com/feeds/rss/all",
    "Wired" : "https://www.wired.com/feed/rss",
    "The New York Times" : "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "BBC News" : "http://feeds.bbci.co.uk/news/technology/rss.xml",
  }

  const allFeeds = await getFeeds(sources, 50);
  return {
    props: {
      allFeeds,
    },
    revalidate: 60,
  };
}
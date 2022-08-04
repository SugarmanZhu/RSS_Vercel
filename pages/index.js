import Parser from "rss-parser";
import RSSFeeds from "../components/RSSFeeds";

function HomePage({ allFeeds }) {
  return <RSSFeeds feeds={allFeeds}/>;
}

export default HomePage;

function timePassed(time, fetch_time) {
  const date = new Date(Date.parse(time));
  const diff = fetch_time - date;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 1) {
      return days + " days ago";
  } else if (days === 1) {
      return "1 day ago";
  } 

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 1) {
      return hours + " hours ago";
  } else if (hours === 1) {
      return "1 hour ago";
  } 

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes > 1) {
      return minutes + " minutes ago";
  } else if (minutes === 1) {
      return "1 minute ago";
  } 
  
  const seconds = Math.floor(diff / 1000);
  if (seconds > 1) {
      return seconds + " seconds ago";
  } else if (seconds === 1) {
      return "1 second ago";
  }
}

async function getFeeds(rss_sources, limit, fetch_time) {
  const parser = new Parser();
  let feeds = [];
  for (const [source, link] of Object.entries(rss_sources)) {
    const rss_feeds = await parser.parseURL(link);
    for (const item of rss_feeds.items) {
      const date = item.isoDate.substring(0, 10) + " " + item.isoDate.substring(11, 19);
      const time_passed = timePassed(date, fetch_time);
      feeds.push({
        "title" : item.title,
        "link" : item.link,
        "date" : date,
        "time_passed" : time_passed,
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

  const fetch_time = Date.now();
  const allFeeds = await getFeeds(sources, 50, fetch_time);
  
  return {
    props: {
      allFeeds,
    },
    revalidate: 10,
  };
}
import Parser from "rss-parser";

function timePassed(rss_time, fetch_time) {

  const diff = fetch_time - rss_time;

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
    try {
      const rss_feeds = await parser.parseURL(link);
      for (const item of rss_feeds.items) {
        const time_string = new Date(Date.parse(item.isoDate)).toUTCString();
        const rss_time = Date.parse(item.isoDate);
        const time_passed = timePassed(rss_time, fetch_time);
        feeds.push({
          "title" : item.title,
          "link" : item.link,
          "isoDate" : item.isoDate,
          "time_string" : time_string,
          "time_passed" : time_passed,
          "content" : item.contentSnippet,
          "provider" : source,
        });
      }
      console.log(`Loaded ${source}`);
    } catch (error) {
      console.log(`Error while loading ${source}: ${error}`);
    }
  }
  feeds.sort((a, b) => b.isoDate.localeCompare(a.isoDate))

  return feeds.slice(0, limit);
}

export default async function handler(req, res) {
  const sources = {
    "知乎每日精选" : "https://www.zhihu.com/rss",
    "知乎日报" : "https://rsshub.app/zhihu/daily",
    "知乎热榜" : "https://rsshub.app/zhihu/hot/",
    "新浪创事记" : "https://rsshub.app/sina/csj",
    "央视新闻" : "https://rsshub.app/cctv/xwlb",
    "外交动态" : "https://rsshub.app/gov/mfa/wjdt/fyrbt",
    "GitHub" : "https://github.com/sugarmanzhu.atom",
    "The Verge" : "https://www.theverge.com/rss/frontpage",
    // "微软亚洲研究院" : "https://msra.cn/feed",
    // "MIT Technology Review" : "https://www.technologyreview.com/feed/",
    // "TechCrunch" : "https://techcrunch.com/feed",
    // "Mashable" : "https://mashable.com/feeds/rss/all",
    // "Wired" : "https://www.wired.com/feed/rss",
    // "The New York Times" : "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    // "BBC News" : "http://feeds.bbci.co.uk/news/technology/rss.xml",
  }

  const fetch_time = new Date().getTime();
  const allFeeds = await getFeeds(sources, 50, fetch_time);
  res.status(200).json(allFeeds);
}
import Parser from "rss-parser";
import { sources } from "../../config/rss_sources";

function timePassed(rss_time, fetch_time) {
  // Get the difference in milliseconds between rss_time and fetch_time
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
      /* 
        parser throws error
        Updated next to canary.9 fixes the issue
        See https://github.com/vercel/next.js/discussions/39242
      */
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
  // sort by time (lastest first)
  feeds.sort((a, b) => b.isoDate.localeCompare(a.isoDate))
  // limit to the first n items
  return feeds.slice(0, limit);
}

export default async function handler(req, res) {
  const fetch_time = new Date().getTime();
  const allFeeds = await getFeeds(sources, 50, fetch_time);
  res.status(200).json(allFeeds);
}

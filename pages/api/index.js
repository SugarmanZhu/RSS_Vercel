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

async function fetchFeeds(source, link, fetch_time, timeout) {
  const feeds = [];
  try {
    const parser = new Parser({
      timeout: timeout,  // max time in milliseconds on each request
    });
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
    console.log(`Successfully fetched from ${source}`);
  } catch (error) {
    console.log(`Error while fetching ${source} => ${error}`);
  }
  return feeds;
}

async function fetchAll(rss_sources, limit, timeout) {
  const fetch_time = Date.now();
  const promises = [];
  for (const [source, link] of Object.entries(rss_sources)) {
    promises.push(fetchFeeds(source, link, fetch_time, timeout));
  }
  // Promise.all() returns an array of all the promises fetched parallely
  let res = await Promise.all(promises);
  console.log(`time taken: ${Date.now() - fetch_time}ms`);
  return res.flat().sort((a, b) => b.isoDate.localeCompare(a.isoDate)).slice(0, limit);
}

export default async function handler(req, res) {
  // get n_top most recent RSS feeds from all sources
  const n_top = 50;
  // limit fetch time to 8 seconds (Vercel free tier limit to 10 seconds)
  // more than 10 seconds on Vercel will result in a timeout error (code 504)
  const timeout = 8000;
  const allFeeds = await fetchAll(sources, n_top, timeout);
  res.status(200).json(allFeeds);
}

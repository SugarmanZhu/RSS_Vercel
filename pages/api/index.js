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
      feeds.push({
        "title" : item.title,
        "link" : item.link,
        "isoDate" : item.isoDate,
        // e.g. "Tue, 15 Jun 2020 09:00:00 GMT"
        "time_string" : new Date(Date.parse(item.isoDate)).toUTCString(),
        // time passed since the rss_time (seconds ago, minutes ago, etc.)
        "time_passed" : timePassed(Date.parse(item.isoDate), fetch_time),
         // remove extra spaces between words (max 1 space between words)
        "content" : item.contentSnippet.replace(/\s+/g, " "),
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
  return (
    // flatten the array of arrays into a single array
    res.flat()
    // sort by time_passed (ascending)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    // limit the number of items to be returned
    .slice(0, limit)
  );
}

export default async function handler(req, res) {
  // get n_top most recent RSS feeds from all sources
  const n_top = 50;
  /* 
    Vercel Hobby (free tier) Serverless Function Execution Timeout: 10 seconds
    See https://vercel.com/docs/concepts/limits/
    More than 10 seconds on Vercel will result in a timeout error (code 504)
    Feeds usually take less than 3 seconds to fetch
    Limit fetch time to 8 seconds to avoid timeout error
  */
  const timeout = 8000;
  const allFeeds = await fetchAll(sources, n_top, timeout);
  res.status(200).json(allFeeds);
}

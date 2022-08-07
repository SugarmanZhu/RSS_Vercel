import Parser from "rss-parser";
import { sources } from "../../config/rss_sources";
import { Request, Response } from 'express';
import { RSSItemType } from "../../types/RSSItemType";

function timePassed(rss_time : number, fetch_time : number) : string {
  // Get the difference in milliseconds between rss_time and fetch_time
  const diff : number = fetch_time - rss_time;

  const days : number = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 1) {
      return days + " days ago";
  } else if (days === 1) {
      return "1 day ago";
  } 

  const hours : number = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 1) {
      return hours + " hours ago";
  } else if (hours === 1) {
      return "1 hour ago";
  } 

  const minutes : number = Math.floor(diff / (1000 * 60));
  if (minutes > 1) {
      return minutes + " minutes ago";
  } else if (minutes === 1) {
      return "1 minute ago";
  } 
  
  const seconds : number = Math.floor(diff / 1000);
  if (seconds > 1) {
      return seconds + " seconds ago";
  } else if (seconds === 1) {
      return "1 second ago";
  }
}

async function fetchFeeds(
  source : string, link : string, fetch_time : number, timeout : number
) : Promise<Array<RSSItemType>> {
  const feeds : Array<RSSItemType> = [];
  try {
    const parser : Parser = new Parser({
      timeout: timeout,  // max time in milliseconds on each request
    });
    const rss_feeds : Parser.Output<Parser.Item> = await parser.parseURL(link);
    for (const item of rss_feeds.items) {
      feeds.push({
        "title" : !item.title.trim() ? `Feed from ${source}` : item.title,
        "link" : item.link,
        "isoDate" : item.isoDate,
        // e.g. "Tue, 15 Jun 2020 09:00:00 GMT"
        "time_string" : new Date(Date.parse(item.isoDate)).toUTCString(),
        // time passed since the rss_time (seconds ago, minutes ago, etc.)
        "time_passed" : timePassed(Date.parse(item.isoDate), fetch_time),
        /*
          remove extra spaces between words (max 1 space between words)
          /\s+/g is a regex to match all whitespace
          \s for whitespaces including tabs, newlines, etc.
          + for one or more
          g for global (match all) 
        */
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

async function fetchAll(
  rss_sources : Record<string, string>, limit : number, timeout : number
) : Promise<Array<RSSItemType>> {
  const fetch_time : number = Date.now();
  const promises : Array<Promise<Array<RSSItemType>>> = [];
  for (const [source, link] of Object.entries(rss_sources)) {
    promises.push(fetchFeeds(source, link, fetch_time, timeout));
  }
  // Promise.all() returns an array of all the promises fetched parallely
  let res : Array<Array<RSSItemType>> = await Promise.all(promises);
  
  console.log(`time taken: ${Date.now() - fetch_time}ms`);

  const feeds : Array<RSSItemType> = 
  // flatten the array of arrays into a single array
  res.flat()
  // sort by time_passed (ascending)
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  if (limit > 0) {
    // limit the number of items to be returned
    return feeds.slice(0, limit);
  }
  // return all feeds if limit is 0 or n oldest feeds if limit is negative
  return feeds.slice(limit);
}

export default async function handler(
    req : Request, res : Response
) : Promise<void> {
    // get n_top most recent RSS feeds from all sources
    const limit : string = req.query.limit as string;
    const n_top : number = parseInt(limit);
    if (isNaN(n_top)) {
        res.status(404).json({message: `${limit} is not a number`});
    } else {
        /* 
        Vercel Hobby (free tier) has Serverless Function Execution Timeout: 
        10 seconds. See https://vercel.com/docs/concepts/limits/
        More than 10 seconds on Vercel will result in a timeout error (code 504)
        Feeds usually take less than 3 seconds to fetch
        Limit fetch time to 8 seconds to avoid timeout error
        */
        const timeout : number = 8000;
        const feeds : Array<RSSItemType> = await fetchAll(
            sources, n_top, timeout
        );
        res.status(200).json(feeds);
    }
  }
  
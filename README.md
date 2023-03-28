# RSS Vercel

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## View the Page

Open a browser and navigate to the URL [https://rss.zhuxiaotan.com](https://rss.zhuxiaotan.com) to view the RSS page.

Note: I now own the domain [zhuxiaotan.com](https://zhuxiaotan.com) and you can view the page at [https://rss.zhuxiaotan.com](https://rss.zhuxiaotan.com).

### Parameter

A parameter may be added to the URL to specify the number of feeds to display.

The main page ([https://rss.zhuxiaotan.com](https://rss.zhuxiaotan.com)) displays 50 latest feeds.

Display 20 lastest feeds: [https://rss.zhuxiaotan.com/20](https://rss.zhuxiaotan.com/20)

Display 10 oldest feeds: [https://rss.zhuxiaotan.com/-10](https://rss.zhuxiaotan.com/10)

Display all feeds: [https://rss.zhuxiaotan.com/0](https://rss.zhuxiaotan.com/0)

Note: the number of feeds is recommanded to be kept less than 50 for performance.

### Cached pages

The main page ([https://rss.zhuxiaotan.com](https://rss.zhuxiaotan.com)) is being cached ~~and updated~~ every 10 seconds.

The following pages are being cached ~~and updated~~ every 60 seconds:
- [https://rss.zhuxiaotan.com/-300](https://rss.zhuxiaotan.com/-300)
- [https://rss.zhuxiaotan.com/-200](https://rss.zhuxiaotan.com/-200)
- [https://rss.zhuxiaotan.com/-100](https://rss.zhuxiaotan.com/-100)
- [https://rss.zhuxiaotan.com/0](https://rss.zhuxiaotan.com/0)
- [https://rss.zhuxiaotan.com/100](https://rss.zhuxiaotan.com/100)
- [https://rss.zhuxiaotan.com/200](https://rss.zhuxiaotan.com/200)
- [https://rss.zhuxiaotan.com/300](https://rss.zhuxiaotan.com/300)

All other pages are not cached (loading takes longer).

Note: due to the serverless function bandwidth limit on Vercel, the pages are no longer being updated, you may need to refresh the page manually.


## API Usage

### Parameter

A parameter must be added to the URL to specify the number of feeds to fetch.

### Browser

Open a browser and navigate to the URL [https://rss.zhuxiaotan.com/api/50](https://rss.zhuxiaotan.com/api/50)

### Terminal

```bash
curl https://rss.zhuxiaotan.com/api/50 | json_pp
```

### Query Examples

- Fetch 20 lastest RSS feeds: 
```bash
curl https://rss.zhuxiaotan.com/api/20 | json_pp
```

- Fetch 10 oldest RSS feeds:
```bash
curl https://rss.zhuxiaotan.com/api/-10 | json_pp
```

- Fetch all the RSS feeds:
```bash
curl https://rss.zhuxiaotan.com/api/0 | json_pp
```


## Running the code loaclly

First, run the development server:

```bash
git clone https://github.com/SugarmanZhu/RSS_Vercel.git
cd RSS_Vercel
npm install
npm run build
npm run start
```

Then, open the browser and navigate to the URL:

Open [http://localhost:3000](http://localhost:3000) with your browser to view the page.


## Deploy on Vercel

Fork this repository and then import and deploy on Vecel.

More information on Vercel Deployment: [Next.js deployment documentation](https://nextjs.org/docs/deployment).


## DONE

- Gather RSS feeds from multiplable sources
- Sort feeds chronologically
- Click on content to expand or collapse
- Click on time to toggle time ago text and GMT time
- Use Incremental Static Regeneration to serve pages
- Support dark mode
- Support fetching feeds via API
- Fetch feeds in parallel
- Add bottom fade
- Deployed on Vercel


## TODO

- Allow user to specify the RSS feed source
- Add filter to filter out unwanted content
- Add lazy loading to load more content when user scrolls to the bottom of the page
- Add a search bar to search content
- Convert UTC time to Locale time on front end (using Intl / momentJS)
- Use database to store RSS feeds and allow user to check past RSS feeds
- Use ISR to cache API responses?
- Add tests (`npm run test`)


## Screenshot
![RSS Screenshot](https://github.com/SugarmanZhu/RSS_Vercel/blob/main/RSS_screenshot.png)

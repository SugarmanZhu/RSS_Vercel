# RSS Vercel

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## View the Page
Open a browser and navigate to the URL [https://rss.zhuxiaotan.xyz](https://rss.zhuxiaotan.xyz) to view the RSS page.

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

## Features
- Gather RSS feeds from multiplable sources
- Sort feeds chronologically
- Click on content to expand or collapse
- Click on time to toggle time ago text and GMT time
- Use Incremental Static Regeneration to serve pages
- Support dark mode
- Support fetching feeds via API (e.g. https://rss.zhuxiaotan.xyz/api/)
- Fetch feeds in parallel
- Deployed on Vercel

## Features to be added
- Allow user to specify the RSS feed source
- Add filter to filter out unwanted content
- Add lazy loading to load more content when user scrolls to the bottom of the page
- Add a search bar to search content
- Improve styling
- Add API to get RSS feeds
- Use database to store RSS feeds and allow user to check past RSS feeds

const dev : boolean = process.env.NODE_ENV !== 'production';

export const server : string = 
    dev ? 'http://localhost:3000' : 'https://rss.zhuxiaotan.com';

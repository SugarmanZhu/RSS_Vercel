import { server } from "../../config/server";
import { Request, Response } from 'express';

export default async function handler(
  req : Request, res : Response
) : Promise<void> {
  res.status(200).json({message: `Hello from ${server}/api. 
  Please use ${server}/api/[number of feeds] to fetch RSS feeds.
  For more information visit 
  https://github.com/SugarmanZhu/RSS_Vercel/blob/main/README.md#api-usage`});
}

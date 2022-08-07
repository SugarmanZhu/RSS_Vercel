import { server } from "../../config/server";
import { Request, Response } from 'express';

export default async function handler(
  req : Request, res : Response
) : Promise<void> {
  res.status(200).json({message: `Hello from ${server}/api. Please use ${server}/api/[limit] to fetch RSS feeds.`});
}

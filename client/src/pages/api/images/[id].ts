import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid image ID' });
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/images/${id}`, {
      responseType: 'arraybuffer',
      headers: {
        ...(req.headers.authorization && { 
          Authorization: req.headers.authorization 
        }),
      },
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Cache-Control', 'public, max-age=604800');
    res.send(response.data);

  } catch (error: any) {
    const status = error.response?.status || 500;
    res.status(status).json({ 
      error: error.response?.data?.error || 'Failed to fetch image' 
    });
  }
}
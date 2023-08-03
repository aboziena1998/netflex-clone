import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const session = await getServerSession(options);

    const currentUser = session?.user;

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

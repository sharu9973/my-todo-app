import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import type {tasks} from '@prisma/client';

import {prisma} from '../../util/prisma';

const handlar: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<tasks[]>
) => {
  try {
    const todos = await prisma.tasks.findMany();
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default handlar;

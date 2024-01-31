import {prisma} from '../../../util/prisma';
import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';

const handlar: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // GET
  if (req.method === 'GET') {
    try {
      const todos = await prisma.tasks.findMany();
      res.status(200).json(todos);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // POST
  if (req.method === 'POST') {
    const body = req.body;
    try {
      const insertTodo = await prisma.tasks.create({
        data: {
          title: body.title,
          content: body.content,
        },
      });
      res.status(200).json(insertTodo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handlar;

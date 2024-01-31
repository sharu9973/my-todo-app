import {prisma} from '../../util/prisma';

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
      const updateTodo = await prisma.tasks.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.newTitle,
          content: body.newContent,
        },
      });
      res.status(200).json(updateTodo);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    const body = req.body;
    try {
      const deleteTodo = await prisma.tasks.delete({
        where: {id: body.id},
      });
      res.status(200).json(deleteTodo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handlar;

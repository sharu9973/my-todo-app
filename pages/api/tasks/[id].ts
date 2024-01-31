import {prisma} from '../../../util/prisma';

import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';

const handlar: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {id} = req.query;

  // PUT
  if (req.method === 'PUT') {
    const body = req.body;
    try {
      const updateTodo = await prisma.tasks.update({
        where: {
          id: Number(id),
        },
        data: {
          title: body.newTitle,
          content: body.newContent,
        },
      });
      res.status(204).json({});
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    try {
      const deleteTodo = await prisma.tasks.delete({
        where: {id: Number(id)},
      });
      res.status(200).json(deleteTodo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handlar;

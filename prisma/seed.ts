import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const todo1 = await prisma.tasks.createMany({
    data: [
      {title: 'Title1', content: 'Content1'},
      {title: 'Title2', content: 'Content2'},
      {title: 'Title3', content: 'Content3'},
      {title: 'Title4', content: 'Content4'},
      {title: 'Title5', content: 'Content5'},
    ],
  });
  console.log(todo1);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
  });

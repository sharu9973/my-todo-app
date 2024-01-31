import React from 'react';
import Head from 'next/head';
import {
  Stack,
  Card,
  CardBody,
  Heading,
  Text,
  Box,
  Center,
  CardFooter,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';

import type {tasks} from '@prisma/client';

const Task: React.FC<{
  task: tasks;
  handleEdit: (task: tasks, newTitle: string, newContent: string) => void;
  handleDelete: (task: tasks) => void;
}> = ({task, handleEdit, handleDelete}) => {
  return (
    <Card size="sm" variant="outline">
      <CardBody>
        <Stack spacing={3}>
          <Heading size="md">{task.title}</Heading>
          <Text>{task.content}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <EditButton
            oldTask={task}
            onEdit={(newTitle, newContent) =>
              handleEdit(task, newTitle, newContent)
            }
          />
          <DeleteButton onDelete={() => handleDelete(task)} />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  const toast = useToast();
  const [todos, setTodos] = React.useState<tasks[]>([]);

  const fetchTodos = async (): Promise<tasks[]> => {
    const res = await fetch('/api/todo', {method: 'GET'});
    const data = await res.json();
    return data;
  };

  React.useEffect(() => {
    fetchTodos().then(todos => setTodos(todos));
  }, []);

  const handleEdit = (oldTask: tasks, newTitle: string, newContent: string) => {
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: oldTask.id,
        newTitle: newTitle,
        newContent: newContent,
      }),
    }).then(res => {
      if (res.status === 200) {
        toast({
          title: `'${oldTask.title}' modified to ${newTitle}`,
          status: 'success',
          isClosable: true,
        });
        fetchTodos().then(todos => setTodos(todos));
      } else {
        toast({
          title: 'Edit Error!',
          status: 'warning',
          isClosable: true,
        });
      }
    });
  };

  const handleDelete = (task: tasks) => {
    fetch('/api/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then(res => {
      if (res.status === 200) {
        toast({
          title: `Task "${task.title}" has been successfully deleted.`,
          status: 'success',
          isClosable: true,
        });
        // DELETE を叩いて、また POST を叩いて更新、ってどうなの
        fetchTodos().then(todos => setTodos(todos));
      } else {
        toast({
          title: 'Error!',
          status: 'warning',
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box margin="2.0rem 1.5rem">
          <Center>
            <Heading mb="8">MY TODO APP</Heading>
          </Center>
          <Center>
            <Stack width="20rem" spacing="4">
              {todos.map(task => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Stack>
          </Center>
        </Box>
      </main>
    </>
  );
};

export default Home;

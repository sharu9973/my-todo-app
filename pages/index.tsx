import React from 'react';
import Head from 'next/head';
import {Stack, Heading, Box, Center, useToast} from '@chakra-ui/react';
import Task from '@/components/Task';

import type {tasks} from '@prisma/client';

const Home = () => {
  const toast = useToast();
  const [todos, setTodos] = React.useState<tasks[]>([]);

  const fetchTodos = async (): Promise<tasks[]> => {
    const res = await fetch('/api/tasks', {method: 'GET'});
    const data = await res.json();
    return data;
  };

  React.useEffect(() => {
    fetchTodos().then(todos => setTodos(todos));
  }, []);

  const handleEdit = (oldTask: tasks, newTitle: string, newContent: string) => {
    fetch(`/api/tasks/${oldTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newTitle: newTitle,
        newContent: newContent,
      }),
    }).then(res => {
      if (res.status === 200 || res.status === 204) {
        toast({
          title: `Task '${oldTask.title}' modified to '${newTitle}'.`,
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
    fetch(`/api/tasks/${task.id}`, {
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

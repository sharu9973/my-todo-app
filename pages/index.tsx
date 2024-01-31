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
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';

import type {tasks} from '@prisma/client';

const DeleteButton: React.FC<{
  onDelete: () => void;
}> = ({onDelete}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <React.Fragment>
      <Button onClick={onOpen} colorScheme="pink">
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task Deletion</ModalHeader>
          <ModalBody>Do you want to delete this task?</ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                onClose();
                onDelete();
              }}
              colorScheme="pink"
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

const Task: React.FC<{task: tasks; handleDelete: (task: tasks) => void}> = ({
  task,
  handleDelete,
}) => {
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
          <Button colorScheme="teal">Edit</Button>
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
                  <Task key={task.id} task={task} handleDelete={handleDelete} />
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

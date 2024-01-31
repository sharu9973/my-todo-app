import React from 'react';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
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
          <DeleteButton
            taskName={task.title}
            onDelete={() => handleDelete(task)}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Task;

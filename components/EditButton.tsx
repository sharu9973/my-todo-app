import React from 'react';
import {tasks} from '@prisma/client';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const EditButton: React.FC<{
  oldTask: tasks;
  onEdit: (newTitle: string, newContent: string) => void;
}> = ({oldTask, onEdit}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [title, setTitle] = React.useState(oldTask.title);
  const [content, setContent] = React.useState(oldTask.content);

  return (
    <React.Fragment>
      <Button onClick={onOpen} colorScheme="blue">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Input
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClose();
                onEdit(title, content);
              }}
            >
              Submit
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

export default EditButton;

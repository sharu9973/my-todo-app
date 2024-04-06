import {
  Button,
  Modal,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import React from 'react';

const CreateButton: React.FC<{
  handleCreate: (title: string, content: string) => void;
}> = ({handleCreate}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  return (
    <React.Fragment>
      <Button mb={8} leftIcon={<AddIcon />} onClick={onOpen}>
        New Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Task</ModalHeader>
          <ModalBody>
            <FormControl mb={2}>
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
              mr={3}
              colorScheme="blue"
              onClick={() => {
                onClose();
                handleCreate(title, content);
              }}
            >
              Create
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

export default CreateButton;

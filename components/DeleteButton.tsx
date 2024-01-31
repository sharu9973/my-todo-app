import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Code,
  Text,
  HStack,
} from '@chakra-ui/react';

const DeleteButton: React.FC<{
  taskName: string;
  onDelete: () => void;
}> = ({taskName, onDelete}) => {
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
          <ModalBody>
            <HStack>
              <Text>Do you want to delete task</Text>
              <Code colorScheme="pink">{taskName}</Code>
              <Text>?</Text>
            </HStack>
          </ModalBody>
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

export default DeleteButton;

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
} from '@chakra-ui/react';

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

export default DeleteButton;

import { AlertDialog, Button, Center, Text } from "native-base";
import React, { useRef } from "react";

interface DeleteAlertProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  description: string;
  next: () => void;
}

export function DeleteAlert({
  isOpen,
  setIsOpen,
  children,
  title,
  description,
  next,
}: DeleteAlertProps) {
  const handleDelete = () => {
    next();
    setIsOpen(false);
  };

  const cancelRef = useRef(null);

  return (
    <Center w="full">
      {children}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{description}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setIsOpen(false)}
                ref={cancelRef}
              >
                <Text fontWeight={600}>Cancel</Text>
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                <Text fontWeight={600} color="white">
                  Delete
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { useState } from "react";
import { useApi } from "../hooks/useApi";

const ModalTurma = ({ isOpen, onClose, edit, resgataTurmas }) => {
  const [name, setName] = useState(edit.data ? edit.data.name : "");
  const { usePost, usePut } = useApi();

  const handleSave = async () => {
    if (!name) return;
    await usePost("/turmas/", {
      name,
    });
    resgataTurmas();
    onClose();
  };

  const handleUpdate = async () => {
    if (!name) return;
    await usePut("/turmas/" + edit.data._id, {
      name,
    });
    resgataTurmas();
    onClose();
  };

  const handleForm = async () => {
    if (edit.editable) {
      await handleUpdate();
    } else {
      await handleSave();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Turmas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              {edit.data && (
                <Box>
                  <FormLabel>Id</FormLabel>
                  <Input disabled={true} type="text" value={edit.data._id} />
                </Box>
              )}
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleForm}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTurma;

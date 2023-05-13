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

const ModalDisc = ({ isOpen, onClose, edit, resgataDisciplinas }) => {
  const [name, setName] = useState(edit.data ? edit.data.name : "");
  // const [horario, setHorario] = useState(edit.data ? edit.data.horario : "");

  const { usePost, usePut } = useApi();

  const handleSave = async () => {
    if (!name) return;
    await usePost("/disciplinas/", {
      name,
      horario: null,
    });
    resgataDisciplinas();
    onClose();
  };

  const handleUpdate = async () => {
    if (!name) return;
    await usePut("/disciplinas/" + edit.data._id, {
      name,
      horario: null,
    });
    resgataDisciplinas();
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
          <ModalHeader>Cadastro de Disciplinas</ModalHeader>
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
              {/* <Box>
                <FormLabel>Horário</FormLabel>
                <Input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </Box> */}
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

export default ModalDisc;

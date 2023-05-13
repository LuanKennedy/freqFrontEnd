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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

const ModalAluno = ({ isOpen, onClose, edit, resgataAlunos, turmas }) => {
  const [name, setName] = useState(edit.data ? edit.data.name : "");
  const [emailResponsavel, setEmailResponsavel] = useState(
    edit.data ? edit.data.emailResponsavel : ""
  );
  const [turma, setTurma] = useState(edit.data ? edit.data.turma._id : "");
  const { usePost, usePut } = useApi();

  const handleSave = async () => {
    if (!name) return;
    await usePost("/alunos/", {
      name,
      turma,
      emailResponsavel,
    });
    resgataAlunos();
    onClose();
  };

  const handleUpdate = async () => {
    if (!name) return;
    await usePut("/alunos/" + edit.data._id, {
      name,
      turma,
      emailResponsavel,
    });
    resgataAlunos();
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
          <ModalHeader>Cadastro de Alunos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              {edit.data && (
                <Input disabled={true} type="text" value={edit.data._id} />
              )}
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Email do responsável</FormLabel>
                <Input
                  type="text"
                  value={emailResponsavel}
                  onChange={(e) => setEmailResponsavel(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Turma</FormLabel>
                <Select
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                >
                  <option value={""} disabled>
                    Selecione uma turma
                  </option>
                  {turmas.map((turma) => {
                    return <option value={turma._id}>{turma.name}</option>;
                  })}
                </Select>
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

export default ModalAluno;

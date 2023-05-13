import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalProfessores from "../../../components/ModalProf";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useApi } from "../../../hooks/useApi";

export default function Professor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState({
    editable: false,
    data: null,
  });
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const { useGet, useDelete } = useApi();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  async function resgataProfessores() {
    const response = await useGet("/professores");
    const professoresResgatados = response.data.body;
    setProfessores(professoresResgatados);
  }

  async function resgataDisciplinas() {
    const response = await useGet("/disciplinas");
    const disciplinasResgatadas = response.data.body;
    setDisciplinas(disciplinasResgatadas);
  }

  async function resgataTurmas() {
    const response = await useGet("/turmas");
    const turmasResgatadas = response.data.body;
    setTurmas(turmasResgatadas);
  }

  useEffect(() => {
    resgataProfessores();
    resgataDisciplinas();
    resgataTurmas();
  }, []);

  const handleRemove = async (id) => {
    const response = await useDelete("/professores/" + id);
    if (response.status >= 200) {
      await resgataProfessores();
    }
  };

  function handleOpenModal(type, data) {
    if (type == "new") {
      setEdit({
        editable: false,
      });
      onOpen();
    }
    if (type == "edit") {
      setEdit({
        editable: true,
        data,
      });
      onOpen();
    }
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
      flexDirection={"column"}
    >
      <NavbarAdmin />
      <Box maxW={900} w="100%" height={"calc(100vh - 72px)"} py={10}>
        <Button colorScheme="blue" onClick={() => handleOpenModal("new", null)}>
          Novo professor
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  E-mail
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Disciplina
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Turma
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {professores.map(({ name, email, disciplina, turma, _id }) => (
                <Tr key={_id} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{disciplina.name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{turma.name}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() =>
                        handleOpenModal("edit", {
                          name,
                          email,
                          disciplina,
                          turma,
                          _id,
                        })
                      }
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(_id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {isOpen && (
          <ModalProfessores
            isOpen={isOpen}
            onClose={onClose}
            edit={edit}
            turmas={turmas}
            disciplinas={disciplinas}
            resgataProfessores={resgataProfessores}
          />
        )}
      </Box>
    </Flex>
  );
}

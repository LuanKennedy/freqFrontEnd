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
import ModalDisciplina from "../../../components/ModalDisc";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useApi } from "../../../hooks/useApi";

export default function Disciplina() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState({
    editable: false,
    data: null,
  });
  const [disciplinas, setDisciplinas] = useState([]);
  const { useGet, useDelete } = useApi();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  async function resgataDisciplinas() {
    const response = await useGet("/disciplinas");
    const disciplinasResgatadas = response.data.body;
    setDisciplinas(disciplinasResgatadas);
  }

  useEffect(() => {
    resgataDisciplinas();
  }, []);

  const handleRemove = async (id) => {
    const response = await useDelete("/disciplinas/" + id);
    if (response.status >= 200) {
      await resgataDisciplinas();
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
          Nova Disciplina
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Horário
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {disciplinas.map(({ name, professor, horario, _id }) => (
                <Tr key={_id} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{horario}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() =>
                        handleOpenModal("edit", {
                          name,
                          horario,
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
          <ModalDisciplina
            isOpen={isOpen}
            onClose={onClose}
            edit={edit}
            resgataDisciplinas={resgataDisciplinas}
          />
        )}
      </Box>
    </Flex>
  );
}

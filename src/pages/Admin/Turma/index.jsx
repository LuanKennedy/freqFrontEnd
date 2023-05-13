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
import ModalTurma from "../../../components/ModalTurma";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { useApi } from "../../../hooks/useApi";

export default function Turma() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState({
    editable: false,
    data: null,
  });
  const [turmas, setTurmas] = useState([]);
  const { useGet, useDelete } = useApi();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  async function resgataTurmas() {
    const response = await useGet("/turmas");
    const turmasResgatadas = response.data.body;
    setTurmas(turmasResgatadas);
  }

  useEffect(() => {
    resgataTurmas();
  }, []);

  const handleRemove = async (id) => {
    const response = await useDelete("/turmas/" + id);
    if (response.status >= 200) {
      await resgataTurmas();
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
          Nova Turma
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>

                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {turmas.map(({ name, _id }) => (
                <Tr key={_id} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => handleOpenModal("edit", { name, _id })}
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
          <ModalTurma
            isOpen={isOpen}
            onClose={onClose}
            edit={edit}
            resgataTurmas={resgataTurmas}
          />
        )}
      </Box>
    </Flex>
  );
}

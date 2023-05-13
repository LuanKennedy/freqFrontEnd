import { Box, Button, Flex, Link, Spacer } from "@chakra-ui/react";

export default function NavbarAdmin() {
  return (
    <Box bg="gray.100" py={4}>
      <Flex width={"100vw"}>
        <Box
          width={"100%"}
          maxWidth={"900px"}
          alignItems="center"
          margin={"0 auto"}
          display={"flex"}
        >
          <Link href="/admin/aluno" mr={4}>
            <Button colorScheme="blue" size="md">
              Admin/Aluno
            </Button>
          </Link>
          <Link href="/admin/professor" mr={4}>
            <Button colorScheme="blue" size="md">
              Admin/Professor
            </Button>
          </Link>
          <Link href="/admin/turma" mr={4}>
            <Button colorScheme="blue" size="md">
              Admin/Turma
            </Button>
          </Link>
          <Link href="/admin/disciplina">
            <Button colorScheme="blue" size="md">
              Admin/Disciplina
            </Button>
          </Link>
          <Spacer />
          <Link href="/" mr={4}>
            <Button
              onClick={() => {
                localStorage.removeItem("usuario");
              }}
              colorScheme="red"
              size="md"
            >
              Logout
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

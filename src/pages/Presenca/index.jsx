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
import { useApi } from "../../hooks/useApi";
import "./styles.css";

export function Presenca() {
  const [usuario, setUsuario] = useState(null);
  const [dadosProfessor, setDadosProfessor] = useState(null);
  const [alunosTurma, setAlunosTurma] = useState([]);
  const { useGet } = useApi();
  const [alunosFaltosos, setAlunosFaltosos] = useState([]);

  const handleAlunoClick = (aluno) => {
    let alunoExiste = false;
    alunosFaltosos.forEach((alunoFaltoso) => {
      if (alunoFaltoso == aluno._id) {
        alunoExiste = true;
      }
    });
    if (alunoExiste) {
      return;
    }
    setAlunosFaltosos([...alunosFaltosos, aluno._id]);
  };

  useEffect(() => {
    const dadosUsuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(dadosUsuario);
  }, []);

  useEffect(() => {
    if (usuario) {
      obtemDadosProfessorLogado();
    }
  }, [usuario]);

  useEffect(() => {
    if (dadosProfessor) {
      obtemAlunosPorTurma();
    }
  }, [dadosProfessor]);

  if (!usuario || !dadosProfessor) {
    return <div>Carregando...</div>;
  }

  async function obtemDadosProfessorLogado() {
    const response = await useGet("/professores/" + usuario.idProfessor);
    setDadosProfessor(response.data.body);
  }

  async function obtemAlunosPorTurma() {
    const response = await useGet("/alunos/");
    const alunosTurma = response.data.body.filter(
      (aluno) => aluno.turma._id == dadosProfessor.turma._id
    );
    setAlunosTurma(alunosTurma);
  }

  return (
    <div className="container-faltas">
      <h2>Lista de faltas turma: {dadosProfessor.turma.name}</h2>
      <ul className="lista-faltas">
        {alunosTurma.map((aluno) => {
          return (
            <li key={aluno._id} onClick={() => handleAlunoClick(aluno)}>
              {aluno.name}
            </li>
          );
        })}
      </ul>
      <h3>Alunos faltosos:</h3>
      <ul>
        {alunosFaltosos.map((id) => {
          const aluno = alunosTurma.find((aluno) => aluno._id === id);
          return <li key={id}>{aluno.name}</li>;
        })}
      </ul>
    </div>
  );
}

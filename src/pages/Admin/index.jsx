;
import Professor from "../Admin/Prof/index"
import Turma from "../Admin/Turma/index"
import Aluno from "../Admin/Aluno/index";
import Disciplina from "../Admin/Disciplina/index";



export function Admin() {
  return(
    <>
      <Turma/>
      <Disciplina/>
      <Professor/>
      <Aluno/>
    </>
  );
};

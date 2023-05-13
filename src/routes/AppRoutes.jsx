import { BrowserRouter, Route, Routes } from "react-router-dom";

import Aluno from "../pages/Admin/Aluno";
import Disciplina from "../pages/Admin/Disciplina";
import Professor from "../pages/Admin/Prof";
import Turma from "../pages/Admin/Turma";
import { Login } from "../pages/Login";
import { Presenca } from "../pages/Presenca";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/presenca" element={<Presenca />} />
        <Route path="/admin/turma" element={<Turma />} />
        <Route path="/admin/aluno" element={<Aluno />} />
        <Route path="/admin/disciplina" element={<Disciplina />} />
        <Route path="/admin/professor" element={<Professor />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useState } from "react";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/school.svg";

import { useApi } from "../../hooks/useApi";
import "./styles.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { usePost } = useApi();

  async function handleSignIn(e) {
    e.preventDefault();
    let loginData;
    try {
      loginData = await usePost("/usuario/login/", {
        email,
        senha: password,
      });
    } catch (err) {
      alert(err);
    }
    if (loginData.status >= 200) {
      let dadosUsuario = {
        ...loginData.data.body.data,
        senha: null,
      };
      localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
      if (dadosUsuario.cargo == "ADMIN") {
        window.location.href = "/admin/professor";
      } else if (dadosUsuario.cargo == "PROFESSOR") {
        window.location.href = "/presenca";
      }
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="escola" className="logoImg" />
        <span>Por favor digite suas informações de login</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="luanc7459@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="button" onClick={handleSignIn}>
          {/* <Link to="/admin/professor">Entrar</Link>{" "} */}
          <img src={arrowImg} alt="->" />
        </button>
      </form>
    </div>
  );
}

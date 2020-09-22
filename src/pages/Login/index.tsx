import React, { useState, FormEvent } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import firebase from "../../services/firebase";
import "./styles.css";

function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginUser(e: FormEvent) {
    e.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);

        history.push("/user");
      })
      .catch(function (error) {});
    console.log(email, password);
  }

  function goToSignUp() {
    history.push("/create-user");
  }

  return (
    <>
      <header className="header">
        <h1 className="title">Login</h1>
        <p className="subtitle">Acesse sua conta.</p>
      </header>

      <form onSubmit={handleLoginUser}>
        <Input
          name="email"
          label="Email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          name="senha"
          label="Senha"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button type="submit">Login</Button>
      </form>
      <Button className="secondary" onClick={goToSignUp}>
        Criar Conta
      </Button>

      <p className="about">
        Projeto criado com o objetivo de entender mais sobre como o Firebase
        funciona e seus usos.
      </p>
    </>
  );
}

export default LoginPage;

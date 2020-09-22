import React, { useState } from "react";
import Input from "../../components/Input";
import { useHistory } from "react-router-dom";
// import { Container } from './styles';
import firebase from "../../services/firebase";
import firebaseService, { generateUserDocument } from "../../services/firebase";
import Button from "../../components/Button";

function CreateUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleCreateUser(e) {
    e.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(async (data) => {
        const userId = firebaseService.getUserId();

        await generateUserDocument(
          {
            displayName: "",
            phoneNumber: "",
            email: userId?.email,
            photoURL: "",
            uid: userId?.uid,
          },
          null
        );

        history.push("/user");
      })
      .catch(function (error) {});
  }

  function goToLoginPage() {
    history.push("/");
  }

  return (
    <>
      <header className="header">
        <h1 className="title">Criar uma conta</h1>
        <p className="subtitle">
          Insira seus dados abaixo para criar uma conta
        </p>
      </header>
      <form onSubmit={handleCreateUser}>
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
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button type="submit">Criar Conta</Button>
      </form>
      <Button className="secondary" onClick={goToLoginPage}>
        Já tem uma conta?
      </Button>
    </>
  );
}

export default CreateUser;

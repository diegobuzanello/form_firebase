import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebaseService, { database } from "../../services/firebase";
import "firebase/storage";
import Button from "../../components/Button";
import profile from "../../assets/profile.svg";
import "./styles.css";
require("firebase/database");
require("firebase/auth");

const UserPage = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  const userId = firebaseService.getUserId();

  useEffect(() => {
    function getUserInfo() {
      console.log(name, phone, gender, age, picture);
      database.ref(`users/${userId?.uid}`).once("value", (snapshot) => {
        const user = snapshot.val();
        setName(user?.name);
        setPhone(user?.phone);
        setGender(user?.gender);
        setAge(user?.age);
        setPicture(user?.picture);
      });
    }
    getUserInfo();
  }, [name, phone, gender, age, picture, userId]);

  function logoutUser() {
    firebaseService.logout().then((data) => {
      history.push("/");
    });
  }

  function goToEditUser() {
    history.push("/edit-user");
  }

  return (
    <>
      <img className="profile" src={`${picture || profile} `} alt="" />
      <div className="profile-data">
        <h2>Perfil</h2>
        <p className="profile-data-item">
          <span>Email:</span>
          {userId?.email}
        </p>

        <p className="profile-data-item">
          <span>Nome:</span>
          {name || "Não adicionado"}
        </p>
        <p className="profile-data-item">
          <span>Gênero:</span>
          {gender || "Não adicionado"}
        </p>
        <p className="profile-data-item">
          <span>Idade:</span>
          {age || "Não adicionado"}
        </p>
        <p className="profile-data-item">
          <span>Telefone:</span>
          {phone || "Não adicionado"}
        </p>
      </div>

      <Button onClick={goToEditUser}>EDITAR DADOS</Button>
      <Button className="secondary" onClick={logoutUser}>
        SAIR
      </Button>
    </>
  );
};

export default UserPage;

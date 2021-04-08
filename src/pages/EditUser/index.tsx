import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import firebaseService, { database } from '../../services/firebase';
import 'firebase/storage';
import Button from '../../components/Button';
import './styles.css';
require('firebase/database');
var firebase = require('firebase/app');
require('firebase/auth');

const EditPage = () => {
  let history = useHistory();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [picture, setPicture] = useState('');

  const userId = firebaseService.getUserId();

  function handleUserData(e: FormEvent) {
    e.preventDefault();
    console.log('foi', userId?.uid, name, phone, gender, age, picture);

    const userData = {
      name: name,
      gender: gender,
      age: age,
      phone: phone,
      picture: picture,
    };

    database
      .ref(`users/${userId?.uid}`)
      .update(userData)
      .then((data) => {
        history.push('/user');
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    database.ref(`users/${userId?.uid}`).on('value', (snapshot) => {
      const user = snapshot.val();
      setName(user?.name);
      setPhone(user?.phone);
      setGender(user?.gender);
      setAge(user?.age);
      setPicture(user?.picture);
    });
  }

  function handlePreview(e) {
    e.preventDefault();

    let file = e.target.files[0];

    // Create a root reference
    var storageRef = firebase.storage().ref();
    // Create a reference to 'mountains.jpg'
    var imagesRef = storageRef.child(
      `${userId?.uid}/profilePicture/${file.name}`
    );

    imagesRef.put(file).on(
      'state_changed',
      null,
      function (error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      },
      function () {
        console.log(
          'Uploaded',
          imagesRef.put(file).snapshot.totalBytes,
          'bytes.'
        );
        console.log(
          imagesRef.getDownloadURL().then((result) => {
            console.log(result);
            setPicture(result);
          })
        );
      }
    );
  }

  function goToUser() {
    history.push('/user');
  }
  return (
    <>
      <h2 className="title">Editar Dados</h2>
      <form onSubmit={handleUserData}>
        <Input
          name="name"
          label="Name"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            console.log(e);
            setName(e.target.value);
          }}
        />
        <Input
          name="gender"
          label="Gender"
          placeholder="Gênero"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <Input
          name="age"
          label="Age"
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <Input
          name="phone"
          label="Phone"
          type="number"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />

        <Input type="file" onChange={handlePreview} />
        <Button type="submit">SALVAR DADOS</Button>
      </form>
      <Button className="secondary" onClick={goToUser}>
        VOLTAR
      </Button>
    </>
  );
};

export default EditPage;

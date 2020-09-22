import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DEV_APP_ID,
  measurementId: process.env.REACT_APP_DEV_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

const firebaseService = {
  doSignInWithEmailAndPassword(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  },
  doCreateUserWithEmailAndPassword(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        database
          .ref(`users/${userCredential.user?.uid}`)
          .set({
            name: "",
            gender: "",
            age: "",
            phone: "",
            picture: "",
            email: userCredential.user?.email,
            uid: userCredential.user?.uid,
          })
          .then((success) => {
            console.log(success);
          });
      });
  },
  logout() {
    return auth
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  },
  getUserId() {
    return auth.currentUser;
  },
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = database.ref(`users/${user.uid}`);
  const snapshot = await userRef.on("value", function (snapshot) {
    console.log(snapshot.val());
  });

  console.log(userRef, "snapshot: ", snapshot);

  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await database
      .ref(`users/${uid}`)
      .on("value", function (snapshot) {
        snapshot.val();
      });

    console.log(userDocument);
    return {
      uid,
      ...userDocument,
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export default firebaseService;

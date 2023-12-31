import React, { useState } from "react";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import "./FormLogin.css";

export const UsersContext = React.createContext();

const Auth = (props) => {
  const [authenticated, setAuthenticated] = useState(false);

  const authUser = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Usuário logado com sucesso', user);
        setAuthenticated(true);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log('Problemas ao logar usuário', error);
        setAuthenticated(false);
      });
  };

  return (
    <UsersContext.Provider value={{ authenticated: authenticated, authUser: authUser }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default Auth;
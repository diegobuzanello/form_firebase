import React from "react";
import UserProvider from "./providers/UserProvider";
import Routes from "./routes";
import "./styles.css";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;

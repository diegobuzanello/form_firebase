import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import UserPage from "./pages/User";
import { UserContext } from "../src/providers/UserProvider";
import LoginPage from "./pages/Login";
import EditPage from "./pages/EditUser";

const Routes: React.FC = () => {
  const user = useContext(UserContext);

  console.log(user);
  return user ? (
    <BrowserRouter>
      <Route path="/user" component={UserPage} />
      <Route path="/edit-user" component={EditPage} />
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      {/* <Route path="/logged" component={LoggedPage} /> */}
      <Route path="/create-user" component={CreateUser} />
    </BrowserRouter>
  );
};

export default Routes;

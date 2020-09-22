import React, { createContext } from "react";
import { auth, generateUserDocument } from "../services/firebase";

export const UserContext = createContext<any | null>({ user: null });

class UserProvider extends React.Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      console.log();
      const user = await generateUserDocument(userAuth, null);
      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;

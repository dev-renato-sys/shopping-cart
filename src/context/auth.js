import { reloadPage } from "helpers/page";
import React, { createContext } from "react";
import loginJson from "../jsons/login.json";
import { useNotification } from "./notification";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    JSON.parse(String(localStorage.getItem("@App:user"))) ?? null
  );

  const { setNotification } = useNotification();

  async function Login({ username, pass }) {
    if (username !== loginJson.username || pass !== loginJson.password) {
      setNotification({
        isOpen: true,
        type: "error",
        message:
          "There's possibly a problem with your username or password, check it!.",
      });
    } else {
      await localStorage.setItem("@App:user", JSON.stringify(loginJson));
      reloadPage();
    }
    return;
  }

  const Logout = async () => {
    await setUser(null);
    await localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user?.name), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}

export default AuthContext;

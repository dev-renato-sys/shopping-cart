import { Notification } from "components/notification";
import React, { createContext } from "react";

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = React.useState({
    isOpen: false,
    type: null,
    message: "",
  });

  return (
    <>
      <NotificationContext.Provider value={{ setNotification }}>
        <Notification
          notification={notification}
          setNotification={setNotification}
        ></Notification>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export function useNotification() {
  const context = React.useContext(NotificationContext);

  return context;
}

export default NotificationContext;

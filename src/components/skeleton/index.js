import AppMenu from "components/menu";
import React from "react";

export const ShowPage = ({ children }) => {
  return (
    <div style={{ height: "100vh" }}>
      <AppMenu />
      {children}
    </div>
  );
};

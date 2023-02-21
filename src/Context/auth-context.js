import React, { useState } from "react";

const AuthContext = React.createContext({
  editMode: false,
  onEditHandler: () => {},
  onCancelHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [editMode, setEditMode] = useState(false);
  const onEditHandler = () => {
    setEditMode(true);
  };
  const onCancelHandler = () => {
    setEditMode(false);
  };
  return (
    <AuthContext.Provider
      value={{
        editMode: editMode,
        onEditHandler: onEditHandler,
        onCancelHandler: onCancelHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

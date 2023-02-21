import React, { useState, useEffect, useRef } from "react";
import AddAccount from "./components/Accounts/AddAccount";
import AccountsList from "./components/Accounts/AccountsList";
//import AuthContext from "./Context/auth-context";

function App() {
  let intialAccounts = [];
  const [usersData, setUsersData] = useState(intialAccounts);
  // const ctx = useContext(AuthContext);
  const inputEdit = useRef();

  useEffect(() => {
    const storedUsersData = JSON.parse(localStorage.getItem("usersData"));
    if (storedUsersData) {
      setUsersData(storedUsersData);
    }
  }, []);

  function onDeleteHandler(id) {
    const updatedUsers = usersData.filter((user) => user.id !== id);
    setUsersData(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
  }

  function onEditHandler(id, link) {
    const editableItem = usersData.filter((user) => user.id === id);

    const editableUserData = {
      id: id,
      platform: editableItem[0].platform,
      link: link,
      username: editableItem[0].username,
      password: editableItem[0].password,
    };

    console.log(editableUserData);
    if (inputEdit.current.editMode === false) {
      inputEdit.current.edit();
    }

    setTimeout(() => {
      inputEdit.current.activate();
      inputEdit.current.scrollY();
      inputEdit.current.fillForm(editableUserData);

      onDeleteHandler(id);
    }, 0);
  }

  function addAccountHandler(user) {
    setUsersData([user, ...usersData]);
    localStorage.setItem("usersData", JSON.stringify([user, ...usersData]));
  }

  return (
    <>
      <AddAccount addUser={addAccountHandler} ref={inputEdit} />
      {usersData.length > 0 && (
        <AccountsList
          usersData={usersData}
          onDelete={onDeleteHandler}
          onEdit={onEditHandler}
        />
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import AddAccount from "./components/Accounts/AddAccount";
import AccountsList from "./components/Accounts/AccountsList";

function App() {
  let intialAccounts = [];
  const [usersData, setUsersData] = useState(intialAccounts);

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
  function addAccountHandler(user) {
    setUsersData([user, ...usersData]);
    localStorage.setItem("usersData", JSON.stringify([user, ...usersData]));
  }

  return (
    <div>
      <AddAccount addUser={addAccountHandler} />
      {usersData.length > 0 && (
        <AccountsList usersData={usersData} onDelete={onDeleteHandler} />
      )}
    </div>
  );
}

export default App;

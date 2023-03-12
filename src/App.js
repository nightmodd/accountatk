import React, { useState, useEffect } from "react";
import AddAccount from "./components/Accounts/AddAccount";
import AccountsList from "./components/Accounts/AccountsList";
import Button from "./components/UI/Button";
import Card from "./components/UI/Card";

import inputStyles from "./components/Accounts/AddAccount.module.css";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [editing, setEditing] = useState();

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

  function onEditHandler(id) {
    const object = usersData.find((user) => user.id === id);
    setEditing(object);
  }

  function onCancel() {
    setEditing(null);
  }

  function onSave(account) {
    // null, object id m4 mwgood, object id mwgood
    if (usersData.find((existAccount) => existAccount.id === account.id)) {
      const updatedUsers = usersData.map((existAccount) =>
        existAccount.id === account.id ? account : existAccount
      );

      setUsersData(updatedUsers);
      localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    } else {
      setUsersData([account, ...usersData]);
      localStorage.setItem(
        "usersData",
        JSON.stringify([account, ...usersData])
      );
    }

    setEditing(null);
  }

  return (
    <>
      {!editing ? (
        <Card className={inputStyles.input}>
          <Button
            type="button"
            onClick={() =>
              setEditing({
                platform: "",
                link: "",
                username: "",
                password: "",
                id: `A${Date.now()}`,
              })
            }
          >
            New Account
          </Button>
        </Card>
      ) : (
        <AddAccount onSave={onSave} onCancel={onCancel} editing={editing} />
      )}

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

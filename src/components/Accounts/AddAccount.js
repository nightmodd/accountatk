import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./AddAccount.module.css";
import Button from "../UI/Button";
import AlertModal from "../UI/AlertModal";

const AddAccount = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState();

  const onEditHandler = () => {
    setEditMode(true);
  };
  const onCancelHandler = () => {
    setEditMode(false);
  };
  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;

    const data = new FormData(form);

    const userData = {
      platform: data.get("platform"),
      link: data.get("link"),
      username: data.get("username"),
      password: data.get("password"),
      id: `A${Date.now()}`,
    };

    if (
      userData.platform === "" ||
      userData.username === "" ||
      userData.password === ""
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid input",
      });
      return;
    }

    console.log(userData);
    props.addUser(userData);
    form.reset();
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <AlertModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        {!editMode && (
          <Button type="button" onClick={onEditHandler}>
            New Account
          </Button>
        )}
        {editMode && (
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="platform">PlatForm</label>
            <input id="platform" type="text" name="platform" />
            <label htmlFor="link">PlatForm Link</label>
            <input id="link" type="text" name="link" />
            <label htmlFor="username">Username/Email</label>
            <input id="username" type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
            <div className={styles.buttons}>
              <Button type="submit">Add Account</Button>
              <Button type="button" onClick={onCancelHandler}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Card>
    </>
  );
};

export default AddAccount;

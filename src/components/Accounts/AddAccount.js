import React, { useState, useRef, useImperativeHandle } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import AlertModal from "../UI/AlertModal";

import styles from "./AddAccount.module.css";

const AddAccount = React.forwardRef((props, ref) => {

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState();
  const platformLabelRef = useRef();
  const platformRef = useRef();
  const linkRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const activate = () => {
    platformRef.current.focus();
  };

  const fillForm = (data) => {
    platformRef.current.value = data.platform;
    linkRef.current.value = data.link;
    usernameRef.current.value = data.username;
    passwordRef.current.value = data.password;
  };

  const scrollY = () => {
    platformLabelRef.current.scrollIntoView({ behavior: "smooth" ,top: 50});
  };

  useImperativeHandle(ref, () => {
    return {
      edit: onEditHandler,
      editMode: editMode,
      activate: activate,
      fillForm: fillForm,
      scrollY: scrollY,
    };
  });

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
    props.addUser(userData);
    form.reset();
    setEditMode(false);
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
            <label htmlFor="platform" ref={platformLabelRef}>
              PlatForm
            </label>
            <input
              id="platform"
              type="text"
              name="platform"
              ref={platformRef}
            />
            <label htmlFor="link">PlatForm Link</label>
            <input id="link" type="text" name="link" ref={linkRef} />
            <label htmlFor="username">Username/Email</label>
            <input
              id="username"
              type="text"
              name="username"
              ref={usernameRef}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              ref={passwordRef}
            />
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
});

export default AddAccount;

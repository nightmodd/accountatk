import React, { useState, useRef, useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import AlertModal from "../UI/AlertModal";

import styles from "./AddAccount.module.css";

/**
 * props:
 * -
 */

const AddAccount = (props) => {
  const [error, setError] = useState();
  const platformRefLabel = useRef();

  const editing = props.editing;

  useEffect(() => {
    if (editing && platformRefLabel.current) {
      platformRefLabel.current.focus();
      platformRefLabel.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editing]);

  const errorHandler = () => {
    setError(null);
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
      id: editing?.id,
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

    props.onSave(userData);
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
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="platform" ref={platformRefLabel}>
            PlatForm
          </label>
          <input
            id="platform"
            type="text"
            name="platform"
            defaultValue={editing?.platform}
          />
          <label htmlFor="link">PlatForm Link</label>
          <input
            id="link"
            type="text"
            name="link"
            defaultValue={editing?.link}
          />
          <label htmlFor="username">Username/Email</label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={editing?.username}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={editing?.password}
          />

          <div className={styles.buttons}>
            <Button type="submit">Add Account</Button>
            <Button type="button" onClick={() => props.onCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddAccount;

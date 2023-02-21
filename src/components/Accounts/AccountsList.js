import React, { useState } from "react";
import Card from "../UI/Card";
import AlertModal from "../UI/AlertModal";

import close from "../../assets/close.svg";
import edit from "../../assets/edit.svg";

import styles from "./AccountsList.module.css";

//

const AccountsList = (props) => {
  const [alert, serAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState();

  const copyText = (ev) => {
    const copiedText = ev.currentTarget.innerText;
    navigator.clipboard.writeText(copiedText);
    setAlertMsg({
      title: "Copied",
      message: copiedText,
    });
    serAlert(true);
  };

  const deleteHandler = (ev) => {
    const List = ev.currentTarget.parentNode.parentNode.nextSibling;
    const ID = List.dataset.id;

    props.onDelete(ID);
  };

  const editHandler = (ev) => {
    const list = ev.currentTarget.parentNode.parentNode.nextSibling;
    const id = list.dataset.id;
    const link = list.firstChild.firstChild.getAttribute("href");
    props.onEdit(id, link);
  };

  const errorHandler = () => {
    serAlert(null);
  };

  return (
    <>
      {alert && (
        <AlertModal
          title={alertMsg.title}
          message={alertMsg.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.users}>
        <ul>
          <div className={styles.list_upper}>
            <span>Accounts</span>
          </div>
          {props.usersData.map((user) => (
            <Card className={styles.list} key={user.id}>
              <div className={styles.action_buttons}>
                <div className={styles.list__button}>
                  <button onClick={editHandler} title="edit">
                    <img src={edit} alt="edit icon" />
                  </button>
                </div>
                <div className={styles.list__button}>
                  <button onClick={deleteHandler} title="delete">
                    <img src={close} alt="close icon" />
                  </button>
                </div>
              </div>
              <li data-id={user.id}>
                <Card className={`${styles.platform} ${styles.class_center}`}>
                  <a href={user.link}>{user.platform}</a>
                </Card>
                <div className={`${styles.account_data} `}>
                  <button
                    className={styles.account_data__button}
                    onClick={copyText}
                    title="copy username"
                  >
                    <p>{user.username}</p>
                  </button>
                  <button
                    className={styles.account_data__button}
                    onClick={copyText}
                    title="copy password"
                  >
                    <p>{user.password}</p>
                  </button>
                </div>
              </li>
            </Card>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default AccountsList;

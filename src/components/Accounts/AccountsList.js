import React from "react";
import Card from "../UI/Card";
import styles from "./AccountsList.module.css";
import close from "../../assets/close.svg";

//

const AccountsList = (props) => {
  const deleteHandler = (ev) => {
    const List = ev.currentTarget.parentNode.nextSibling;
    props.onDelete(List.dataset.id);
  };

  return (
    <Card className={styles.users}>
      <ul>
        <div className={styles.list_upper}>
          <span>Accounts</span>
        </div>
        {props.usersData.map((user) => (
          <Card className={styles.list} key={user.id}>
            <div className={styles.list__delete}>
              <button onClick={deleteHandler}>
                <img src={close} alt="close icon"/>
              </button>
            </div>
            <li data-id={user.id}>
              <Card className={`${styles.platform} ${styles.class_center}`}>
                <div>{user.platform}</div>
              </Card>
              <div className={`${styles.account_data} `}>
                <div className={styles.account_data__username}>
                  {user.username}
                </div>
                <div className={styles.account_data__password}>
                  {user.password}
                </div>
              </div>
            </li>
          </Card>
        ))}
      </ul>
    </Card>
  );
};

export default AccountsList;

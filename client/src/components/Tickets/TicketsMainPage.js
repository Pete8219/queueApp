import React, { useState } from "react";
import { List } from "./List/List";
import { useSelector } from "react-redux";
import { SearchForm } from "../../UI/SearchForm/SearchForm";
import { Input } from "../../UI/Input/Input";
import { Calendar } from "../../UI/Calendar/Calendar";
import styles from "./mainPage.module.css";

export const TicketsMainPage = () => {
  const { userId } = useSelector((state) => state.userRole);

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [visitor, setVisitor] = useState("");

  const updateDate = (d) => {
    setDate(d);
    setName("");
    setVisitor("");
  };

  const handleChange = (e) => {
    setVisitor(e.target.value.toUpperCase());
  };

  //Обработчик нажатия кнопки Enter в  поле поиска зявителя
  const pressHandler = async (e) => {
    setName("");
    if (e.key === "Enter") {
      setName(visitor);
      e.preventDefault();
      setVisitor("");
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Header}>
        <div>
          <SearchForm>
            <Input
              placeholder="Поиск посетителя по фамилии"
              id="filterUser"
              name="filterUser"
              type="text"
              value={visitor}
              onChange={handleChange}
              onKeyPress={pressHandler}
            />
          </SearchForm>
        </div>

        <div>
          <Calendar props={{ updateDate, date }} />
        </div>
      </div>

      <div>{<List props={{ userId, date, name }} />}</div>
    </div>
  );
};

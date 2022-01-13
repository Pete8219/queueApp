import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessage } from "../hooks/message.hook";
import M from "materialize-css";
import axios from "axios";
import { WrongActivation } from "./WrongActivation";
import { SuccessActivation } from "../components/SuccessActivation/SuccessActivation";
import { Loader } from "../components/Loader";

export const Confirm = () => {
  const { code } = useParams();
  const message = useMessage();
  console.log(code);

  const [activate, setActivate] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    if (!code) {
      return message("Отсутствует код активации");
    }
    const confirmUser = async () => {
      setLoading(true);
      await axios
        .get(`/auth/activate/${code}`)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setActivate(true);
        })
        .catch((error) => {
          setLoading(false);
          message(error.response.data.message);
          setActivate(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    confirmUser();
  }, [code, message]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {!loading && activate !== null ? (
        activate ? (
          <SuccessActivation />
        ) : (
          <WrongActivation />
        )
      ) : null}
    </div>
  );
};

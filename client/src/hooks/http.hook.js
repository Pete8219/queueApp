import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "./message.hook";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const message = useMessage();

  const auth = useContext(AuthContext);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);

      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      try {
        const response = await fetch(url, { method, body, headers });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            auth.logout();
          }

          //throw new Error(response.status || "Что то пошло не так123123!!!");
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    [auth]
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

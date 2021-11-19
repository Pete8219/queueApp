import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";
const storageName = "userData";

export const useRole = () => {
  const { request } = useHttp();
  const data = JSON.parse(localStorage.getItem(storageName));

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((userRole) => {
    setRole(userRole);
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await request(
          `/auth/checkToken/${data.token}`,
          "GET",
          {}
        );
        login(result.role);
        console.log(result);
      } catch (error) {}
    };

    getUser();
  }, [login]);

  return { login, token, role };
};

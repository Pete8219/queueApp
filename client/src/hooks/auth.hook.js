import { useState, useCallback, useEffect } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwtToken, id, type) => {
    setToken(jwtToken);
    setUserId(id);
    setUserType(type);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        userType: type,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserType(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userType);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, userType, ready };
};

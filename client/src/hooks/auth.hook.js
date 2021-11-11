import { useState, useCallback, useEffect } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [exp, setExp] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwtToken, id, type, expDate) => {
    setToken(jwtToken);
    setUserId(id);
    setUserType(type);
    setExp(expDate);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        userType: type,
        token: jwtToken,
        expires: expDate,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserType(null);
    setExp(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userType, data.expires);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, userType, ready, exp };
};

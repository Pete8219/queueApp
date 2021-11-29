import React, { useState, useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";
import { Detail } from "../../../components/Users/Detail";

import { useSelector } from "react-redux";
import api from "../../../http";

export const UserDetailPage = () => {
  const userId = useParams().id;
  const { users } = useSelector((state) => state.users);

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userId]);

  return <>{!loading && user && <Detail user={user} />}</>;
};

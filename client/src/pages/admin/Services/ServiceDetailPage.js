import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { Detail } from "../../../components/Service/Detail";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export const ServiceDetailPage = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const [service, setService] = useState("");
  const [users, setUsers] = useState("");
  const [categories, setCategories] = useState("");
  const { loading, request } = useHttp();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetched = await request(`/services/${id}`, "GET", null, {});
        setService(fetched);
      } catch (e) {}
    };
    fetchService();
  }, [request, id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetched = await request("/users", "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        setUsers(fetched);
      } catch (e) {}
    };
    fetchUsers();
  }, [request]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetched = await request("/categories", "GET", null, {});
        setCategories(fetched);
      } catch (e) {}
    };
    fetchCategories();
  }, [request]);

  return (
    <>
      {!loading && service && users && (
        <Detail service={service} users={users} categories={categories} />
      )}
    </>
  );
};

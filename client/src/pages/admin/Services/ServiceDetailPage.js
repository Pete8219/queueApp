import React from "react";
import { Detail } from "../../../components/Service/Detail";
import { useParams } from "react-router-dom";

export const ServiceDetailPage = () => {
  const { id } = useParams(); // get Id from URL params

  return <>{<Detail id={id} />}</>;
};

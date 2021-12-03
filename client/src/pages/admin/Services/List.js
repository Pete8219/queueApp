import React from "react";

import { ServicesList } from "../../../components/Service/Services";
import { useSelector } from "react-redux";

export const List = () => {
  const { services } = useSelector((state) => state.services);

  return <>{services && <ServicesList services={services} />}</>;
};

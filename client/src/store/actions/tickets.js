import api from "../../http";
import { getTickets, loading, updateTicket } from "../ticketsReducer";

export const getUserTicketsFromAPI = (userId) => {
  return (dispatch) => {
    dispatch(loading());
    api
      .get(`/tickets/${userId}`)
      .then((response) => {
        dispatch(getTickets(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const updateTicketStatus = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(loading());
    api
      .patch(`/tickets/status/update`, { ...data })
      .then((response) => {
        dispatch(updateTicket(response.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

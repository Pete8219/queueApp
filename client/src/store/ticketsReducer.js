const GET_TICKETS = "GET_TICKETS"; //список заявок текущего пользователя системы
const LOADING = "LOADING"; //статус загрузки заявок
const END_LOADING = "END_LOADING"; //окончание загрузки
const DELETE_TICKET = "DELETE_TICKET";
const FILTER_BY_DATE = "FILTER_BY_DATE"; //список заявок на выбранную дату
const UPDATE_STATUS = "UPDATE_STATUS"; // обновление статуса заявки выбранного тикета

const initialState = {
  isLoading: false,
  tickets: [],
  ticketsByDate: [],
};

export const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: [...action.payload],
        isLoading: false,
      };
    case DELETE_TICKET:
      const filteredTickets = state.tickets.filter(
        (ticket) => ticket._id !== action.payload
      );
      return {
        ...state,
        tickets: [...filteredTickets],
        isLoading: false,
      };
    case FILTER_BY_DATE:
      const date = state;
      const filterByDate = state.tickets.filter(
        (ticket) => ticket.date === action.payload
      );
      return {
        ...state,
        isLoading: false,
        ticketsByDate: [...filterByDate],
      };

    case UPDATE_STATUS:
      const updateState = { ...state };
      updateState.tickets.forEach((ticket) => {
        if (ticket._id === action.payload._id) {
          ticket.status = action.payload.status;
        }
      });
      return {
        ...state,
        tickets: [...updateState.tickets],
        isLoading: false,
      };

    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getTickets = (payload) => ({ type: GET_TICKETS, payload });
export const filterByDate = (payload) => ({ type: FILTER_BY_DATE, payload });
export const deleteTicket = (payload) => ({ type: DELETE_TICKET, payload });
export const updateTicket = (payload) => ({ type: UPDATE_STATUS, payload });
export const loading = () => ({ type: LOADING });
export const endLoading = () => ({ type: END_LOADING });

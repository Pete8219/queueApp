const dotenv = require("dotenv");
dotenv.config();

export const fetchUserData = () => (dispatch, getState, data) => {
  dispatch(requestData());
  return fetch(
    `${process.env.API_SERVER}/auth/login`,
    { method: "POST" },
    { body: JSON.stringify(...data) }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch(receiveData(responseJson));
      console.log(responseJson);
    })
    .catch((error) => {
      dispatch(receiveError(error));
    });
};

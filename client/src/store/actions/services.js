import api from '../../http'
import { getServices, fetchStart, fetchComplited, filterServices, addService, showError} from '../serviceReducer'

export const getServicesFromApi = () => {
    return (dispatch) => {
        dispatch(fetchStart())
      api
        .get("/services")
        .then(function (response) {
          dispatch(getServices(response.data));
        })
        .catch(function (error) {
          console.log(error.response);
          dispatch(fetchComplited());
        });
    };
  };

  export const createService = (data) => {
      console.log(data)
      return (dispatch) => {
          dispatch(fetchStart())
          api.post('/services/create', {...data})
          .then((response) => {
              dispatch(addService(response.data))
          })
          .catch((error) => {
              console.log(error.response)
              dispatch(showError(error.response.data.errors))
          })
      }
  }

  export const deleteService = (id) => {
      return (dispatch) => {
          dispatch(fetchStart())
          api.delete(`/services/${id}`)
          .then(() => {
              dispatch(filterServices(id))
          })
          .catch((error) => {
                console.log(error.response)
          })
      }
  }
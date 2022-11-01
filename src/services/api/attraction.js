import { apiInstance } from ".";

// 근데 이렇게 하면 서버에서 난 error가 err.response로 리턴이 되고, 
// 그게 try .. catch에서 걸리나 ?
export const getAttractions = async ({ query }) => {

  const urlWithQuery = '/api/attractions/?query=' + query; 

  return await apiInstance
    .get(urlWithQuery)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    })
};

export const putLike = async({ id }) => {
  const url = `/api/attractions/${id}/like`;

  return await apiInstance
    .put(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    })
};

export const deleteLike = async({ id }) => {
  const url = `/api/attractions/${id}/like`;

  return await apiInstance
    .put(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    })
};
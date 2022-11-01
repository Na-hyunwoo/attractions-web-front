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
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답되었을 경우 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우 
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 생긴 경구 
        console.log('Error', err.message);
      }
      console.log(err.config);
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
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답되었을 경우 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우 
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 생긴 경구 
        console.log('Error', err.message);
      }
      console.log(err.config);
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
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답되었을 경우 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우 
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 생긴 경구 
        console.log('Error', err.message);
      }
      console.log(err.config);
    })
};
import Reactotron from 'reactotron-react-native';
// No trailing `/`
// const baseUrl = 'http://localhost:8000';
const baseUrl = 'https://api.egobie.com';

export default (method, url, body, headers) => {
  let _headers = headers ? headers : {};
  let _body = body ? body : {};

  return fetch(`${baseUrl}/${url}`, {
    method: method,
    headers: Object.assign(_headers, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(Object.assign(_body, {
      user_id: 1,
      user_token: 'bc2543',
    })),
  }).then((response) => {
    return response.json();
  }, (error) => {
    return error;
  });
};

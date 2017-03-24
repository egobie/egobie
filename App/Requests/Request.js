// No trailing `/`
// const baseUrl = 'http://localhost:8000';
const baseUrl = 'http://egobie-app-lb-1883256124.us-east-1.elb.amazonaws.com';

export default (method, url, headers, body) => {
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
  });
};

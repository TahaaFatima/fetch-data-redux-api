import { fetchPostsBegin, fetchPostsSuccess, fetchPostsFailure } from './actions';

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsBegin());
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPostsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
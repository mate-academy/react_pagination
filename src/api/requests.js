const URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => fetch(`${URL}/posts`).then(res => res.json());
export const getUsers = () => fetch(`${URL}/users`).then(res => res.json());
export const getCom = () => fetch(`${URL}/comments`).then(res => res.json());

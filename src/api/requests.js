const URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => fetch(`${URL}/posts`).then(res => res.json());

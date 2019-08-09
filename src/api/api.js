const baseUrl = 'https://jsonplaceholder.typicode.com';

export const getPosts = async() => {
  const url = '/posts';
  const response = await fetch(`${baseUrl}${url}`);
  const posts = await response.json();

  return posts;
};

export default getPosts();

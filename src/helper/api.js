export const PostFromSever = async() => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts');

  return posts.json();
};

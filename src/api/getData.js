const getData = async(type) => {
  const url = `https://jsonplaceholder.typicode.com/${type}`;

  return fetch(url)
    .then(response => response.json());
};

const getPreparedData = async() => {
  const posts = await getData('posts');
  const users = await getData('users');
  const comments = await getData('comments');

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
};

export default getPreparedData;

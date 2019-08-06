const url = 'https://jsonplaceholder.typicode.com/';

const getPosts = async() => (
  fetch(`${url}posts`)
    .then(response => response.json())
);

const getUsers = async() => (
  fetch(`${url}users`)
    .then(response => response.json())
);

const getComments = async() => (
  fetch(`${url}comments`)
    .then(response => response.json())
);

const getData = async() => {
  const posts = await getPosts();
  const users = await getUsers();
  const comments = await getComments();

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
};

export default getData;

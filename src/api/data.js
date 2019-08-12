const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const getData = async() => {
  const response = await fetch(API_URL);

  return response.json();
};

export default getData;

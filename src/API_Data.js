const getPlanes = async() => {
  const url = 'https://api.iev.aero/api/flights/13-06-2019';
  const planes = await fetch(url);

  return planes.json();
};

export default getPlanes;

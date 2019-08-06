const getCountries = async() => {
  const url = 'https://restcountries.eu/rest/v2/all';
  const countries = await fetch(url);

  return countries.json();
};

export default getCountries;

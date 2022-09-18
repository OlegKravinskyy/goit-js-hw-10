const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FIELD_INPUT = '?fields=name,capital,population,flags,languages';

export { fetchCountries };

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}${FIELD_INPUT}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

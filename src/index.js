import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountryName.addEventListener(
  'input',
  debounce(onInputCountryName, DEBOUNCE_DELAY)
);

function onInputCountryName(e) {
  let name = e.target.value;
  clearDate();
  if (name.length === 0) {
    return;
  }

  fetchCountries(name.trim())
    .then(countries => renderCountriesList(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function murkupCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list-item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="50">
          <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('afterbegin', markup);
}

function murkupCountryInfo(countries) {
  const markup = countries
    .map(country => {
      const languages = onCurrentArrayLanguages(country.languages);
      return `<div class="country-item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="200">
          <p>Name: ${country.name.official}</p>
          <p>Capital: ${country.capital}</p>
          <p>Languages: ${languages}</p>
          <p>Population: ${country.population}</p>
        </div>`;
    })
    .join('');
  countryInfo.insertAdjacentHTML('afterbegin', markup);
}

function clearDate() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (countries.length === 1) {
    clearDate();
    murkupCountryInfo(countries);
  } else {
    murkupCountriesList(countries);
  }
}

function onCurrentArrayLanguages(languages) {
  const language = [];
  for (let key in languages) {
    language.push(languages[key]);
  }
  return language;
}

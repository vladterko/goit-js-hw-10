import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputName.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));

function onInputName(evt) {
    inputValue = evt.target.value.trim();
    if (!inputValue) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue).then(data => {
        if (!data) {
            return;
        } else if (data.length > 10) {
            Notiflix.Notify.success('Too many matches found. Please enter a more specific name.')
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            return;
        } else {
          murkup(data);  
        }
    });
}

function murkup(arr) {
    countryList.innerHTML = '';
    arr.forEach(element => {
    const countryName = element.name.official;
    const capital = element.capital[0];
    const population = element.population;
    const flags = element.flags.svg;
    const languages = Object.values(element.languages).join(', ');        
        if (arr.length === 1) {
            countryList.innerHTML = '';
            countryInfo.innerHTML = 
            `<div class="country-info">
            <div class="title">
                <img class="flag-img" src="${flags}" alt="${countryName}" width="40px" heigth="20px" />
                <span class="country-name">${countryName}</span>
            </div>
            <div class="field">
                <span class="label">Capital: </span>
                <span class="value">${capital}</span>
            </div>
            <div class="field">
                <span class="label">Population: </span>
                <span class="value">${population}</span>
            </div>
            <div class="field">
                <span class="label">Languages: </span>
                <span class="value">${languages}</span>
            </div>
            </div>`;
        return;
        }
        countryInfo.innerHTML = '';
        countryList.insertAdjacentHTML('beforeend', `
        <li class="item">
            <img class="flag-img" src="${flags}" alt="${countryName}" width="40px" heigth="20px" />
            <span class="label">${countryName}</span>
        </li>`);
    });
}

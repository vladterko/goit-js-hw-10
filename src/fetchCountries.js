import Notiflix from 'notiflix';
export const fetchCountries = name => {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const OPTIONS = 'fields=name,capital,population,flags,languages';
    return fetch(`${BASE_URL}${name}?${OPTIONS}`)
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

import Notiflix, { Notify } from 'notiflix';
import SlimSelect from 'slim-select';

import {
  fetchBreeds,
  fetchCatByBreed,
  createBreedSelectMarkup,
  createCatMarkup,
} from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.getElementById('catInfo'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

refs.breedSelect.addEventListener('change', onCatId);

fetchBreeds()
  .then(arr => {
    load();

    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      createBreedSelectMarkup(arr.data)
    );
  })
  .then(() => slim())
  .catch(fetchError);

function onCatId(e) {
  const id = e.target.value;
  fetchCatByBreed(id)
    .then(obj => {
      load();

      return (refs.catInfo.innerHTML = createCatMarkup(obj.data));
    })
    .then(() => success())
    .catch(fetchError);
}

function success() {
  Notify.success('Search was successful', '');
}

function fetchError() {
  Report.failure(refs.errorEl.textContent, '');
}

function load() {
  refs.breedSelect.hidden = false;
  refs.loaderEl.classList.remove('loader');
}

function slim() {
  new SlimSelect({
    select: refs.breedSelect,
  });
}

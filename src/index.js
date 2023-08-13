import {
  fetchBreeds,
  fetchCatByBreed,
  createBreedSelectMarkup,
  createCatMarkup,
} from './cat-api';

const refs = {
  breedSelect: document.getElementById('breedSelect'),
  catInfo: document.getElementById('catInfo'),
};

refs.breedSelect.addEventListener('change', onCatId);

fetchBreeds().then(data => {
  //   console.log(data[0]);
  //   console.log(createBreedSelectMarkup(data));
  refs.breedSelect.insertAdjacentHTML(
    'beforeend',
    createBreedSelectMarkup(data)
  );
});

function onCatId(e) {
  const id = e.target.value;
  fetchCatByBreed(id);
  console.log(id);
  // .then(data => {
  //   console.log(data);
  //   return (refs.catInfo.innerHTML = createCatMarkup(data));
  // })
  // .catch(err => console.error(err));
}

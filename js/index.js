const imagesSection = document.querySelector('.images');
const breedsSection = document.querySelector('.breeds');

const radios = document.querySelector('.header__switch-model');

let currentModel = 'images';

console.log(radios);
radios.addEventListener('change', (event) => {
  const target = event.target;
  switch (target.id) {        // I could use if else here since there are only two options,
                              // but decided to use switch so that it is possible to add more models later
    case 'images':
      currentModel = 'images';
      imagesSection.style.display = 'flex';
      breedsSection.style.display = 'none';
      break;
    case 'breeds':
      currentModel = 'breeds';
      imagesSection.style.display = 'none';
      breedsSection.style.display = 'flex';
      break;
  }
  console.log(currentModel);
});

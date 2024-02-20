const imagesSection = document.querySelector('.images');
const breedsSection = document.querySelector('.breeds');
const radios = document.querySelector('.header__switch-model');

const modelToSectionMap = new Map();
modelToSectionMap.set('images', imagesSection);
modelToSectionMap.set('breeds', breedsSection);

const modelToEndpointMap = new Map();
modelToEndpointMap.set('images', '/images/search?limit=30&');
modelToEndpointMap.set('breeds', '/breeds?');
const apiUrl = 'https://api.thedogapi.com/v1';
const apiKey = 'live_VGn6Yc4Ii5dj8aO10q2FfFGzNejAouSMOTBhPwMNAC1FArHRJlSn0kaNEIAoKPEd';

let currentModel = 'images';
const currentDataArray = [];

radios.addEventListener('change', (event) => {
  const target = event.target;
  switch (target.id) {
    // I could use if else here since there are only two options,
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
  generatePageElements(currentModel);
});

const generatePageElements = (model) => {
  // get current section's container
  const container = modelToSectionMap.get(model).querySelector('.section__container');
  // clear current data array
  currentDataArray.length = 0;
  // add Loading element/spinner
  showLoadingSpinner(container);
  // fetch data
  const requestUrl = `${apiUrl}${modelToEndpointMap.get(model)}api_key=${apiKey}`;
  fetchData(requestUrl, model, container);
}

async function fetchData(url, model, container) {

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      data.forEach(el => appendDataToArray(el, model));
      // create html elements and append them to the section container
      container.innerHTML = '';
      console.log(currentDataArray);
      currentDataArray.forEach(el => container.appendChild(createDataCard(el, model)));
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
}

const showLoadingSpinner = (container) => {
  container.innerHTML = '';
  const spinnerDiv = document.createElement('div');
  spinnerDiv.classList.add('loading-spinner');
  let circle;
  for (let i = 0; i < 12; i++) {
    circle = document.createElement('div');
    circle.classList.add('circle');
    spinnerDiv.appendChild(circle);
  }
  container.appendChild(spinnerDiv);
}

const appendDataToArray = (data, model) => {
  switch (model) {
    case 'images':
      const breed = data.breeds[0] ? data.breeds[0].name : '';
      const imageUrl = data.url;
      if (!imageUrl.endsWith('.gif')) { // do not include gifs
        currentDataArray.push({ 'breed': breed, 'imageUrl': imageUrl });
      }
      break;
    case 'breeds':

  }
}

const createDataCard = (data, model) => {
  const card = document.createElement('div');
  switch (model) {
    case 'images':
      card.classList.add('images__card');
      const img = document.createElement('img');
      img.src = data.imageUrl;
      img.alt = `Picture of ${data.breed ? data.breed : 'a dog'}`;
      card.appendChild(img);
      const text = document.createElement('h3');
      text.innerText = `Breed: ${data.breed ? data.breed : 'no breed information'}`;
      card.appendChild(text);
      break;
    case 'breeds':

  }
  return card;
}


generatePageElements(currentModel);
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
</svg>
</div>`;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const controlRecipes = async function () {
  try {
    const hashValue = window.location.hash.slice(1);

    if (!hashValue) return;

    renderSpinner(recipeContainer);

    // 1. Loading Recipe
    await model.loadRecipe(hashValue);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// controlRecipes();

['hashChange', 'load'].map(ev => window.addEventListener(ev, controlRecipes));

// window.addEventListener('hashChange', controlRecipes);
// window.addEventListener('load', controlRecipes);

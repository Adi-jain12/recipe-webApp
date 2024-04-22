import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}/?search=${query}`);

    const [...recipes] = data.data.recipes;

    state.search.results = recipes.map(item => {
      return {
        id: item.id,
        title: item.title,
        publisher: item.publisher,
        image: item.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getResultsPerPage = (pageNo = state.search.page) => {
  state.search.page = pageNo;

  const start = (pageNo - 1) * state.search.resultsPerPage; // 0
  const end = pageNo * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQuantity = oldQuantity * newServings / oldServings
    // 2 * 8 /4 = 4
  });

  state.recipe.servings = newServings;
};

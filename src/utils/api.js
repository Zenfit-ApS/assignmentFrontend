import axios from 'axios';


const client = axios.create({
  baseURL: '/'
});

export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

/** 
 * @param {number} clientId 
 */
export function fetchPlans(clientId) {
  return client.get(`/api/v3/meal/client/${clientId}`);
}

/**
 * @param {Object} params 
 */
export function fetchRecipes(params, options = {}) {
  return client.get('/api/recipe/get-recipes', {
    params,
    ...options,
  });
}

/**
 * @param {*} params 
 */
export function deletePlan(params) {
  return client.delete('/api/v3/meal/plan/delete', { params });
}

/**
 * 
 * @param {Object} params 
 */
export function deleteMeal(params) {
  return client.delete('/api/v3/meal', { params });
}

/**
 * @param {Object} plan 
 * @param {?Object} options
 * 
 * @return {Promise<any>}
 */
export function fetchPdf(plan, options = {}) {
  return client.get(`/pdf/exportPlansPdfMealClient/${plan.id}`, {
    params: {
      name: `${plan.client_name}-mealplan`,
      ...(options.params || {}),
      varsion: 2,
    },
    ...options,
  });
}

import { domain, activities, makeRequest } from './api';

const base = domain + activities.root;

// data is the JSON request body
export default {
  async upcoming(data, token) {
    return makeRequest([base, activities.upcoming], 'GET', data, token)
  },
  async completed(data, token) {
    return makeRequest([base, activities.completed], 'GET', data, token)
  },
}

import { domain, account, makeRequest, toQueryString } from 'util/Api';

const base = domain + activities.root;

// data is the JSON request body
export default {
    async upcoming(params, token) {
      params = toQueryString(params);
      return makeRequest([base, activities.upcoming, params], 'GET', null, token);
    },
    async completed(params, token) {
      params = toQueryString(params);
      return makeRequest([base, activities.completed, params], 'GET', null, token);
    },
    async alerts(params, token) {
      params = toQueryString(params);
      return makeRequest([base, activities.alerts, params], 'GET', null, token);
    }
  }
  
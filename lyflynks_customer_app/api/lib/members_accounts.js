import { domain, members_accounts, makeRequest } from './api';

const base = domain + members_accounts.root;

export default {
  async list(token) {
    return makeRequest([base], 'GET', null, token)
  },
  async update(data, token) {
    return makeRequest([base], 'PATCH', data, token)
  },
  
  async memberInvite(data) {
    return makeRequest([base], 'POST', data)
  },
}

import { domain, memberInvitation, members, makeRequest } from './api';

const base = domain + members.root;
const memberInvite = domain + memberInvitation.root;

// data is the JSON request body
export default {
  async detail(memberID, token) {
    return makeRequest([base, `/${memberID}`], 'GET', data, token)
  },
  async create(data) {
    return makeRequest([base], 'POST', data, token)
  },
  async update(data) {
    return makeRequest([base], 'PATCH', data, token)
  },
  async memberInvite(data) {
  	debugger
    return makeRequest([memberInvite], 'POST', data)
  },
}

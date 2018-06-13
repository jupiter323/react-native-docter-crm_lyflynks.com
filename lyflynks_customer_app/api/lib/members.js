import { domain, members, makeRequest, memberInvite } from "./api";

const base = domain + members.root;
const baseForMemberInvite = domain + memberInvite.root;
// data is the JSON request body
export default {
  async detail(memberID, token) {
    return makeRequest([base, `/${memberID}`], "GET", data, token);
  },
  async create(data) {
    return makeRequest([base], "POST", data, token);
  },
  async update(data) {
    return makeRequest([base], "PATCH", data, token);
  },
  async memberInvite(data) {
  	debugger
    return makeRequest([memberInvite], 'POST', data)
  },
  sendInvites(invites) {
    return makeRequest([baseForMemberInvite], "POST", invites);
  }
};

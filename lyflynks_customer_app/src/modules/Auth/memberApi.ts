import { domain, members, makeRequest, memberInvite } from "util/Api";

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
    return makeRequest([memberInvite], 'POST', data)
  },
  async sendInvites(data) {
    const { token } = data;
    delete data.token;
    return makeRequest([baseForMemberInvite], "POST", data, token);
  },
  async sendInvites1(data) {
    console.log('baseForMemberInvite',baseForMemberInvite);
    return makeRequest([baseForMemberInvite], "POST", data);
  }
};

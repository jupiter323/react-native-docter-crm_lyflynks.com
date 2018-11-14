import { domain, accounts, makeRequest } from "util/Api";

const base = domain + accounts.root;
const baseForMemberAccount = domain + accounts.members;

export default {
  createAccount(member) {
    return makeRequest([base], "POST", member);
  },

  createMemberAccount(memberAcount, userToken) {
    return makeRequest([baseForMemberAccount], "POST", memberAcount, userToken);
  },
  getOrderCall(id, token) {
    return makeRequest([base, `/${id}`, '/call_order'], "GET", null, token)
  },
  updateOrderCall(id, token, data) {
    return makeRequest([base, `/${id}`, '/call_order'], "PATCH", data, token)
  }
};

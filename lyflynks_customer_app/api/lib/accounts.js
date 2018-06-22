import { domain, accounts, makeRequest } from "./api";

const base = domain + accounts.root;
const baseForMemberAccount = domain + accounts.members;

export default {
  createAccount(member) {
    return makeRequest([base], "POST", member);
  },

  createMemberAccount(memberAcount, userToken) {
    return makeRequest([baseForMemberAccount], "POST", memberAcount, userToken);
  }
};

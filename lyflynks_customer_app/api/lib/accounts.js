import { domain, accounts, makeRequest } from "./api";

const base = domain + accounts.root;

export default {
  createAccount(member) {
    return makeRequest([base], "POST", member);
  }
};

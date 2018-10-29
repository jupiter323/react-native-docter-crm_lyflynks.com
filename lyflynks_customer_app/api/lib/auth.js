import { domain, auth, makeRequest, pushNotification } from "./api";

const base = domain + auth.root;

// data is the JSON request body
export default {
  async member(data) {
    return makeRequest([base, auth.members], "POST", data);
  },
  async member_account(data, token) {
   
    return makeRequest([base, auth.members_accounts], "GET", data, token);
  },
  async member_account(data, token) {
    
    return makeRequest([base, auth.members_accounts], "POST", data, token);
  },
  async reset_password(data) {
    return makeRequest([base, auth.reset], "POST", data);
  },
  async forgot_username(data) {
    return makeRequest([base, auth.forgot], "POST", data);
  },
  async member_logout(data) {
    return makeRequest([base, auth.logout], "POST", data);
  },
  async send_device_id(device_token, user_token) {
    return makeRequest([`${domain+pushNotification.root}`], "POST", { device_token }, user_token);
  }
};

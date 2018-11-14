import { makeRequest } from "util/Api";

export default {
  async member(data) {
    const url = '/auth/members';
    return makeRequest(url, "POST", data);
  },
//   async member_account(data, token) {
   
//     return makeRequest([base, auth.members_accounts], "GET", data, token);
//   },
//   async member_account(data, token) {
    
//     return makeRequest([base, auth.members_accounts], "POST", data, token);
//   },
//   async reset_password(data) {
//     return makeRequest([base, auth.reset], "POST", data);
//   },
//   async forgot_username(data) {
//     return makeRequest([base, auth.forgot], "POST", data);
//   },
//   async member_logout(data) {
//     return makeRequest([base, auth.logout], "POST", data);
//   },
  async send_device_id(device_token, user_token) {
    return makeRequest('/allow_push_notification', "POST", { device_token }, user_token);
  }
};

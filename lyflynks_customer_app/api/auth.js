const api = {
  domain: 'https://localhost:5002',
  path: {
    root: '/auth',
    member: '/member',
    memberAccount: '/member/account'
  },
  headers: {
    Accept: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

export default {
  async loginMember() {
    const url = api.domain + api.path.root + api.path.member;
    const login = await fetch(url, {
      ...api.headers,
      method: 'POST',
    });
    return login;
  },
  loginMemberAccount() {},
  resetPassword() {},
  forgotUsername() {},
}

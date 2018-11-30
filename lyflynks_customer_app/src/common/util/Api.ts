import { BASE_URL } from 'constants';
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';

export async function makeRequest(route, method, data, token, isLogin) {
  const url = route.reduce((a, b) => a.concat(b));
  console.log(token, url);
  const account_id = await AsyncStorage.getItem('account_id');
  const headers = getHeader(token, isLogin, data, account_id);

  let req;
  try {
    req = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,      
    });
  } catch (err) {
    console.log(err);
  }
  return req.json();
}

const getHeader = (token, isLogin, data, account_id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (isLogin) {
    const { username, password } = data;
    headers.append('Authorization', `Basic ` + base64.encode(username + ":" + password) )
  }

  if (data) {
    delete data.account_id;
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
    if (account_id) {
      headers.append('account_id', account_id);
    }
  }
  return headers;
};

export const toQueryString = obj => {
  if (!obj) return "";
  return (
    "?" +
    Object.keys(obj)
      .map(k => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
      })
      .join("&")
  );
};

// export const domain = "http://ec2-18-191-191-221.us-east-2.compute.amazonaws.com";
// export const domain = "http://prod-lyflynks-cluster-lb-c26ebae13e18ff67.elb.us-east-2.amazonaws.com";
// export const domain = "http://192.168.1.40:5002";

//export const domain = "http://prod-lyflynks-cluster-lb-c26ebae13e18ff67.elb.us-east-2.amazonaws.com";
export const domain = BASE_URL;

export const accounts = {
  root: "/accounts",
  members: "/members"
};

export const activities = {
  root: "/activities",
  upcoming: "/upcoming",
  completed: "/completed",
  alerts: "/alerts"
};

export const auth = {
  root: "/auth",
  members: "/members",
  members_accounts: "/members/accounts",
  forgot: "/forgot",
  reset: "/reset",
  logout: "/logout"
};

export const check_in_urls = {
  fetchMembers: '/accounts/members',
  members_account: '/members_accounts',
  postCheckIn: '/activities/check_in',
  fetchCheckIn: '/activities/',
};

export const members = {
  root: "/members"
};

export const members_accounts = {
  root: "/members_accounts"
};

export const memberInvite = {
  root: "/send-invite-mail"
};

export const pushNotification = {
  root: "/allow_push_notification"
}
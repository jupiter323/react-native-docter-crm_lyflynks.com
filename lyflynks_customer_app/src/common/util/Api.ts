import { BASE_URL } from 'constants';

export async function makeRequest(route, method, data, token) {
  const url = route.reduce((a, b) => a.concat(b));
  const body = data ? JSON.stringify(data) : null;
  console.log(token, url);

  let req;
  try {
    req = await fetch(url, {
      method,
      body,
      headers: getHeader(token)
    });
  } catch (err) {
    console.log(err);
  }
  return req.json();
}

const getHeader = token => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (token) {
    headers.append("x-access-token", token);
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
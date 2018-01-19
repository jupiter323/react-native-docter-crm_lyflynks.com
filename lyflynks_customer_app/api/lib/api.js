export async function makeRequest(route, method, body, token) {
  const url = route.reduce((a, b) => a.concat(b));
  let req;

  try {
    req = await fetch(url, {
      method,
      body,
      headers: getHeader(token),
    });
  } catch (err) {
    console.log(err);
  }

  return req.json();
}

const getHeader = (token) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')

  if (token) {
    headers.append('x-access-token', token);
  }

  return headers;
}

export const domain = 'http://localhost:5002';

export const accounts = {
  root: '/accounts',
  members: '/members',
}

export const activities = {
  root: '/activities',
  upcoming: '/upcoming',
  completed: '/completed',
}

export const auth = {
  root: '/auth',
  members: '/members',
  members_accounts: '/members/accounts',
  forgot: '/forgot',
  reset: '/reset',
}

export const members = {
  root: '/members',
}

export const members_accounts = {
  root: '/members_accounts',
}

const domain = "http://staging-lb-165144095.us-east-2.elb.amazonaws.com";
const getHeader = token => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    if (token) {
      headers.append("x-access-token", token);
    }
    return headers;
};

export async function makeRequest(route, method, data, token) {
    const url = `${domain}${route}`;
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
  
import queryString from 'query-string';
export const getRequest = async ({
  domain = process.env.NEXT_PUBLIC_API_URL,
  url = '/',
  params = {},
  auth = true,
  userState,
  userModoel,
} = {}) => {
  const headers = {
    Authorization: `Bearer ${userState?.playerAuth?.token}`,
  };
  if (!auth) {
    delete headers.Authorization;
  }
  const query = queryString.stringify({
    ...params,
  });
  const response = await fetch(`${domain}${url}${url.includes('?') ? '&' : '?'}${query}`, {
    method: 'GET',
    cache: 'no-cache',
    headers,
  });
  const res = await response.json();
  if (res.code === 200) {
    return res;
  } else if (res.code >= 3000 && userState?.playerAuth) {
    // token expired
    console.log('res code clear all');
    userModoel.clearAll();
  }
  return res;
};

export const postRequest = async ({
  domain = process.env.NEXT_PUBLIC_API_URL,
  url = '/',
  params = {},
  body = {},
  auth = true,
  userState,
  userModoel,
} = {}) => {
  const headers = {
    Authorization: `Bearer ${userState?.playerAuth?.token}`,
    'Content-Type': 'application/json',
  };
  if (!auth) {
    delete headers.Authorization;
  }
  const query = queryString.stringify({
    ...params,
  });
  const response = await fetch(`${domain}${url}${url.includes('?') ? '&' : '?'}${query}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers,
    body: JSON.stringify(body),
  });
  const res = await response.json();

  if (res.code === 200) {
    return res;
  } else if (res.code >= 3000) {
    // token expired
    userModoel.clearAll();
  }
  return res;
};

export const putRequest = async ({
  domain = process.env.NEXT_PUBLIC_API_URL,
  url = '/',
  params = {},
  body = {},
  auth = true,
  userState,
  userModoel,
} = {}) => {
  const headers = {
    Authorization: `Bearer ${userState?.playerAuth?.token}`,
    'Content-Type': 'application/json',
  };
  if (!auth) {
    delete headers.Authorization;
  }
  const query = queryString.stringify({
    ...params,
  });
  const response = await fetch(`${domain}${url}${url.includes('?') ? '&' : '?'}${query}`, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers,
    body: JSON.stringify(body),
  });
  const res = await response.json();

  if (res.code === 200) {
    return res;
  } else if (res.code >= 3000) {
    // token expired
    userModoel.clearAll();
  }
  return res;
};

export const deleteRequest = async ({
  domain = process.env.NEXT_PUBLIC_API_URL,
  url = '/',
  params = {},
  auth = true,
  userState,
  userModoel,
} = {}) => {
  const headers = {
    Authorization: `Bearer ${userState?.playerAuth?.token}`,
  };
  if (!auth) {
    delete headers.Authorization;
  }
  const query = queryString.stringify({
    ...params,
  });
  const response = await fetch(`${domain}${url}${url.includes('?') ? '&' : '?'}${query}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    headers,
  });
  const res = await response.json();

  if (res.code === 200) {
    return res;
  } else if (res.code >= 3000) {
    // token expired
    userModoel.clearAll();
  }
  return res;
};

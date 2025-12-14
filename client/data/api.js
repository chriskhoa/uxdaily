const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6790";
const USERS_ENDPOINT = `${API_URL}/users`;

const buildUrlWithQuery = (url, queryParams) => {
  const params = new URLSearchParams(queryParams);
  return `${url}${params.toString()}`;
};

const handleGet = async (url, queryParams = null, token = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${url}`, { headers });
  if (response.ok) {
    return await response.json();
  } else {
    console.error(`GET request to ${url} failed: ${response.statusText}`);
    throw new Error(`GET request to ${url} failed: ${response.statusText}`);
  }
};

const handlePost = async (url, body, queryParams = null, token = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`POST request to ${url} failed: ${response.statusText}`);
  }
};

const handlePatch = async (url, body, queryParams = null, token = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`PATCH request to ${url} failed: ${response.statusText}`);
  }
};

const handleDelete = async (url, queryParams = null, token = null) => {
  if (queryParams) {
    url = buildUrlWithQuery(url, queryParams);
  }
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });
  if (response.ok) {
    return response.statusText;
  } else {
    throw new Error(`DELETE request to ${url} failed: ${response.statusText}`);
  }
};

export { handleGet, handlePost, handlePatch, handleDelete, USERS_ENDPOINT };

import axios from "axios";
import router from "../router";

const DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://ctrello-server.herokuapp.com"
    : "http://localhost:3000";

const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  })
    .then(result => result.data)
    .catch(result => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) onUnauthorized();
      throw result.response;
    });
};

export const setAuthInHeader = token => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

export const board = {
  fetch(id) {
    return id ? request("get", `/board/${id}`) : request("get", "/board");
  },
  create(title) {
    return request("post", "/board", { title });
  },
  update(id, payload) {
    return request("put", `/board/${id}`, payload);
  },
  destroy(id) {
    return request("delete", `/board/${id}`);
  }
};

export const list = {
  create(payload) {
    return request("post", "/list", payload);
  },
  update(id, payload) {
    return request("put", `/list/${id}`, payload);
  },
  destroy(id) {
    return request("delete", `/list/${id}`);
  }
};

export const card = {
  fetch(id) {
    return request("get", `/card/${id}`);
  },
  create(title, pos, ListId) {
    return request("post", "/card", { title, pos, ListId });
  },
  update(id, payload) {
    return request("put", `/card/${id}`, payload);
  },
  destroy(id) {
    return request("delete", `/card/${id}`);
  }
};

export const auth = {
  register(email, password) {
    return request("post", "/user", { email, password });
  },
  login(email, password) {
    return request("post", "/user/login", { email, password });
  }
};

export const check = {
  create(content, CardId) {
    return request("post", "/check", { content, CardId });
  },
  fetch(id) {
    return id ? request("get", `/check/${id}`) : request("get", "/check");
  },
  update(id, value, content) {
    return request("patch", `/check/${id}`, { id, value, content });
  },
  destroy(id) {
    return request("delete", `/check/${id}`);
  }
};

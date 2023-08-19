import api from ".";

export const apiLogin = (url, data) => {
  return api.post(url, data)
}

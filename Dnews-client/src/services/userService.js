import * as request from "../services/apiService";

const apiUrl = "http://localhost:3030/users";

//////////////////////////////////////////////// LOGIN///////////////////////////////

export const login = (loginData) => request.post(`${apiUrl}/login`, loginData);

/////////////////////////////////////////////// REGISTER ///////////////////////////
export const register = (registerData) =>
  request.post(`${apiUrl}/register`, registerData);

/////////////////////////////////////////////// LOGOUT ///////////////////////////
export const logout = async () => {
  request.get(`${apiUrl}/logout`);

  localStorage.removeItem('user');
};

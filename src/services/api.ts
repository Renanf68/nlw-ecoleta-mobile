import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.13:3333",
});

export default api;

export const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/",
});

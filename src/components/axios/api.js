import axios from "axios";

const APIHeader = {
  Accept: "application/json",
  "Content-type": "application/json",
  "Access-Control-Allow-Origin": "", // acepta todo
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
};

export const API = axios.create({
  headers: APIHeader,
  timeout: 10000,
  baseURL: "https://node-cervezas-artesanales.vercel.app",
});


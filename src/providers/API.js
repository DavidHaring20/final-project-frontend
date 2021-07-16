import axios from "axios";
export default {
  service: "API",
  construct: function() {
    return axios.create({
      baseURL: process.env.API_URL
    });
  }
};
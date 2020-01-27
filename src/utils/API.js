import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password,
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },
  postNewTrip: function(new_trip){
    headers.authorization = localStorage.getItem("token");
    return axios.post(`${burl}/dashboardActions/postNewTrip`, new_trip, { headers: headers });
  },
  deleteTrip: function(trip_id){
    headers.authorization = localStorage.getItem("token");
    return axios.delete(`${burl}/dashboardActions/deleteTrip`, { data:{trip_id}, headers: headers })
  },
  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },
  getDashboard: function() {
    let config = {
      headers: {
        "authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    }
    return axios.get(`${burl}/dashboardActions/`,config);
  }
};
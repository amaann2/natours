import Geocode from "react-geocode";

Geocode.setApiKey();
Geocode.setLanguage("en");

Geocode.fromAddress("mumbai").then(
  (res) => {
    const { lat, long } = res.result[0].geometry.location;
    console.log(lat, long);
  },
  (error) => {
    console.log(error);
  }
);

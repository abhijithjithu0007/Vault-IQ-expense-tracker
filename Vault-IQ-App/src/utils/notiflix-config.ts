import { Notify } from "notiflix";

export const setupNotiflix = () => {
  Notify.init({
    position: "right-bottom",
    width: "320px",
    distance: "16px",
    borderRadius: "10px",
    timeout: 3500,
    clickToClose: true,
    pauseOnHover: true,
    fontFamily: "Poppins, sans-serif",
    fontSize: "15px",
    cssAnimation: true,
    cssAnimationDuration: 350,
    cssAnimationStyle: "fade",

    success: {
      background: "#4CAF50", // Elegant green
      textColor: "#ffffff",
      notiflixIconColor: "#ffffff",
    },

    failure: {
      background: "#FF3D00", // Vivid red
      textColor: "#ffffff",
      notiflixIconColor: "#ffffff",
    },

    warning: {
      background: "#FFC107", // Bright yellow-orange
      textColor: "#000000",
      notiflixIconColor: "#000000",
    },
  });
};

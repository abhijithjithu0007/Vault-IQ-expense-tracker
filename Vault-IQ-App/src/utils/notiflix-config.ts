import { Notify } from "notiflix";

export const setupNotiflix = () => {
  Notify.init({
    position: "right-bottom",
    width: "320px",
    distance: "15px",
    opacity: 1,
    borderRadius: "12px",
    timeout: 4000,
    messageMaxLength: 110,
    backOverlay: false,
    backOverlayColor: "rgba(0,0,0,0.5)",
    plainText: true,
    showOnlyTheLastOne: false,
    clickToClose: true,
    pauseOnHover: true,
    zindex: 4001,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "16px",
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: "fade",

    success: {
      background: "linear-gradient(145deg, #42A5F5, #2196F3)",
      textColor: "#FFFFFF",
      childClassName: "notiflix-success",
      notiflixIconColor: "rgba(255,255,255,0.9)",
      fontAwesomeClassName: "fas fa-check-circle",
      fontAwesomeIconColor: "rgba(255,255,255,0.9)",
      backOverlayColor: "rgba(50,198,130,0.2)",
    },

    failure: {
      background: "linear-gradient(145deg, #EF5350, #E53935)",
      textColor: "#FFFFFF",
      childClassName: "notiflix-failure",
      notiflixIconColor: "rgba(255,255,255,0.9)",
      fontAwesomeClassName: "fas fa-times-circle",
      fontAwesomeIconColor: "rgba(255,255,255,0.9)",
      backOverlayColor: "rgba(255,85,73,0.2)",
    },

    warning: {
      background: "linear-gradient(145deg, #FFA726, #FB8C00)",
      textColor: "#FFFFFF",
      childClassName: "notiflix-warning",
      notiflixIconColor: "rgba(255,255,255,0.9)",
      fontAwesomeClassName: "fas fa-exclamation-circle",
      fontAwesomeIconColor: "rgba(255,255,255,0.9)",
      backOverlayColor: "rgba(255,193,7,0.2)",
    },
  });
};

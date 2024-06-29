console.log(process.env.NODE_ENV, "....netlify site mode");

export const isProdMode = process.env.NODE_ENV === "production";

export const API_ENDPOINT = isProdMode
  ? "https://caltex-api.glitch.me/api" //"https://enormously-sure-werewolf.ngrok-free.app/api" //"https://caltex-api.onrender.com/api"
  : "http://localhost:8080/api";

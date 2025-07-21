export const isProdMode = process.env.NODE_ENV === "production";

export const API_ENDPOINT = isProdMode
  ? "https://caltex-api-yzhj.onrender.com/api" //"https://enormously-sure-werewolf.ngrok-free.app/api"
  : "https://caltex-api-yzhj.onrender.com/api"; //"http://localhost:8080/api";

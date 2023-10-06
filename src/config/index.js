console.log(process.env.NODE_ENV, "....netlify site mode");

export const API_ENDPOINT =
  process.env.NODE_ENV !== "production"
    ? "https://caltex-api.onrender.com/api" //"https://enormously-sure-werewolf.ngrok-free.app/api" //"https://caltex-api.onrender.com/api"
    : "http://localhost:8080/api";

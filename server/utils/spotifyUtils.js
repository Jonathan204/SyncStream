import axios from "axios";
import qs from "querystring";
export const refreshToken = async (rToken) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  return await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    data: qs.stringify({
      grant_type: "refresh_token",
      refresh_token: rToken,
    }),
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((resp) => {
      return resp.data ? resp.data : resp;
    })
    .catch((error) => {
      throw error.data ? error.data : error;
    });
};

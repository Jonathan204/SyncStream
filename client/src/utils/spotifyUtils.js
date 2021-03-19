import axios from "axios";
import qs from "querystring";
import {
  tokenEndpoint,
  clientId,
  redirectUri,
  secretId,
  authEndpoint,
  scopes,
} from "./config";

const apiCall = async (method, url, headers, data) => {
  return await axios({
    url,
    method,
    data: data ? qs.stringify(data) : null,
    headers,
  })
    .then((response) => {
      return response.data ? response.data : response;
    })
    .catch((error) => {
      throw error.data ? error.data : error;
    });
};

export const authorizationUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;

export const getUserId = async (token) => {
  const url = "https://api.spotify.com/v1/me/";
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    const data = await apiCall("get", url, headers);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTokens = async (code) => {
  const url = tokenEndpoint;
  const data = {
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  };
  const headers = {
    Authorization: "Basic " + btoa(clientId + ":" + secretId),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  try {
    const resp = await apiCall("post", url, headers, data);
    const authData = {
      spotifyAccess: resp.access_token,
      spotifyRefresh: resp.refresh_token,
    };
    return authData;
  } catch (error) {
    throw error;
  }
};

export const getCurrentlyPlaying = async (token) => {
  const url = "https://api.spotify.com/v1/me/player";
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    const data = await apiCall("get", url, headers);
    return data;
  } catch (error) {
    throw error;
  }
};

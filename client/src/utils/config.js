const baseEndpoint = "https://accounts.spotify.com"
export const authEndpoint = `${baseEndpoint}/authorize`;
export const tokenEndpoint = `${baseEndpoint}/api/token`;

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const secretId = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
export const redirectUri = "http://localhost:3000/home";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
];

export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "bebeb728633e467d92f913fc90610698";
export const redirectUri = "http://localhost:3000/home";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
];

export function getAccessToken(){
    var expires = 0 + localStorage.getItem('pa_expires', '0');
    if ((new Date()).getTime() > expires) {
        return '';
    }
    var token = localStorage.getItem('pa_token', '');
    return token;
}

export function setAccessToken(token, expires_in){
    localStorage.setItem('pa_token', token);
    localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
    // _token = token;
    // _expires = expires_in;
}
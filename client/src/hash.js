// Get the hash of the url
export const authorize = () => {
  var location = window.location;
  const search = location.search.substring(1).split("=");
  window.history.replaceState({}, document.title, "/home")
  return search && search[0] === "code" ? search[1] : "";
};

export const hash = () => {
  const h = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = "";
  return h;
};

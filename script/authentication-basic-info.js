var basicAuthInfo = (username, password) => {
  var tok = username + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

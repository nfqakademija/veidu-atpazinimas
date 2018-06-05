export function login(userData) {
  const BaseURL = 'http://veiduatpazinimas.projektai.nfqakademija.lt/login/check-google';

  return new Promise((resolve, reject) => {
    axios.post(BaseURL, userData)
        .then(res => resolve(res))
        .catch(error => reject(error));
  });
}

import config from './../config/config.js'

const signin = (user) => {
  console.log(user);
  return fetch(`${config.urlApi}/auth/signin/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'omit',
      body: JSON.stringify(user)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const signout = () => {
  return fetch(`${config.urlApi}/auth/signout/`, {
    method: 'GET',
  }).then(response => {
      return response.json()
  }).catch((err) => console.log(err))
}

export {
  signin,
  signout
}

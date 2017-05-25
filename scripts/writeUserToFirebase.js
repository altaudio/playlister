import firebase from './initialiseFirebase.js'
import bot from './initialiseBot.js'

export default (facebookUserId, response) => {
  const parsedResponse = JSON.parse(response.text)

  firebase.database().ref(`/users/${facebookUserId}`).update({
    accessToken: parsedResponse.access_token,
    refreshToken: parsedResponse.refresh_token,
    expiresIn: parsedResponse.expires_in,
    tokenType: parsedResponse.token_type,
    scope: parsedResponse.scope
  })
  .then(() => {
    bot.sendMessage(facebookUserId, { text: 'Thanks for signing in to Spotify!' })
  })
  .catch((error) => {
    console.log(error)
    bot.sendMessage(facebookUserId, { text: 'Looks like something went wrong and ou weren\'t added to our user base :(' })
  })
}

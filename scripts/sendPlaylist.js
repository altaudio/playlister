import _ from 'lodash'
import moment from 'moment'
import firebase from './initialiseFirebase.js'
import spotify from './initialiseSpotify'
import bot from './initialiseBot.js'

export default (facebookId, spotifyId, requestedStation) => {
  firebase.database().ref(`users/${facebookId}`).once('value')
  .then((value) => {
    const userAccessToken = value.val().accessToken
    spotify.setAccessToken(userAccessToken)

    return spotify.createPlaylist(spotifyId, moment().format('DDMMHHmm'), { public: false })
      .then((data) => {
        const playlistId = data.body.id

        return firebase.database().ref(`stations/${requestedStation}`).once('value')
          .then((tracks) => {
            const tracksFromDatabase = tracks.val()
            const trackstoPlaylist = _.map(tracksFromDatabase, (track) => {
              return `spotify:track:${track.spotifyId}`
            })
            return spotify.addTracksToPlaylist(spotifyId, playlistId, trackstoPlaylist)
              .then(() => {
                bot.sendMessage(facebookId, { text: 'Your playlist has been created!' })
              })
          })
      })
  })
  .catch((error) => {
    console.log(error)
    bot.sendMessage(facebookId, { text: 'Uh oh, looks like there was a problem creating your playlist :(' })
  })
}


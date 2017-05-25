import _ from 'lodash'
import sendPlaylist from './sendPlaylist.js'

export default (payload) => {
  const message = payload.message.text
  const splitMessage = _.split(message, '-')
  const facebookId = payload.sender.id
  const spotifyId = _.first(splitMessage)
  const requestedStation = _.last(splitMessage)

  sendPlaylist(facebookId, spotifyId, requestedStation)
}

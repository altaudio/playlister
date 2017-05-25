import Spotify from 'spotify-web-api-node'
import config from './config'

export default new Spotify({
  clientId: config.spotifyClientId,
  clientSecret: config.spotifyClientSecret,
  redirectUri: config.redirectUrl
})

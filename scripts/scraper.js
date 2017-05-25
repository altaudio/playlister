import scraperjs from 'scraperjs'
import moment from 'moment'
import writeTracksToFirebase from './writeTracksToFirebase'

export default (url, station, titleSelector, artistSelector) => {
  scraperjs.StaticScraper.create(url)
    .scrape(($) => {
      return {
        title: $(titleSelector).first().text(),
        artist: $(artistSelector).first().text(),
        timeStamp: moment().format('DDHmmss')
      }
    })
    .then((track) => {
      console.log(track)
      writeTracksToFirebase(station, track.title, track)
    })
}


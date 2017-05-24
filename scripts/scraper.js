import scraperjs from 'scraperjs'
import writeToFirebase from './writeToFirebase'

export default (url, station, titleSelector, artistSelector) => {
  scraperjs.StaticScraper.create(url)
    .scrape(($) => {
      return {
        title: $(titleSelector).first().text(),
        artist: $(artistSelector).first().text()
      }
    })
    .then((track) => {
      console.log(track)
      writeToFirebase(station, track.title, track)
    })
}


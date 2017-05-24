import scraperjs from 'scraperjs'
import writeToFirebase from '../writeToFirebase'

scraperjs.StaticScraper.create('https://absoluteradio.co.uk/80s/music/')
  .scrape(($) => {
    return {
      title: $('.song-title a').first().text(),
      artist: $('.song-artist').first().text()
    }
  })
  .then((track) => {
    console.log(track)
    writeToFirebase('absolute80s', track.title, track)
  })


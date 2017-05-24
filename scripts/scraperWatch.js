import later from 'later'
import scraper from './scraper.js'

const trackWatcher = (minuteInterval, scrape, stationUrl, stationName, trackSelector, artistSelector) => {
  const schedule = later.parse.recur().every(minutes).minute()
  later.setInterval(
    () => { scrape(stationUrl, stationName, trackSelector, artistSelector) },
    schedule
  )
}

trackWatcher(3, scraper, 'https://absoluteradio.co.uk/80s/music/', 'absolute80s', '.song-title a', '.song-artist')

import later from 'later'
import scraper from './scraper.js'
import refreshAccessTokens from './refreshAllUsersAccessTokens.js'

const scraperInterval = 3

const stationWatcher = (stationUrl, stationName, trackSelector, artistSelector) => {
  const schedule = later.parse.recur().every(scraperInterval).minute()
  later.setInterval(
    () => { scraper(stationUrl, stationName, trackSelector, artistSelector) },
    schedule
  )
}

stationWatcher('https://absoluteradio.co.uk/00s/music/', 'absolute00s', '.song-title a', '.song-artist')
stationWatcher('https://absoluteradio.co.uk/90s/music/', 'absolute90s', '.song-title a', '.song-artist')
stationWatcher('https://absoluteradio.co.uk/80s/music/', 'absolute80s', '.song-title a', '.song-artist')
stationWatcher('https://absoluteradio.co.uk/70s/music/', 'absolute70s', '.song-title a', '.song-artist')
stationWatcher('https://absoluteradio.co.uk/60s/music/', 'absolute60s', '.song-title a', '.song-artist')
stationWatcher('https://absoluteradio.co.uk/classic-rock/music/', 'classic-rock', '.song-title a', '.song-artist')
stationWatcher('https://absoluteradio.co.uk/absolute-radio/music/', 'absolute-radio', '.song-title a', '.song-artist')

const refreshAccessTokenInterval = 50

const refreshAccessTokenWatcher = () => {
  const schedule = later.parse.recur().every(refreshAccessTokenInterval).minute()
  later.setInterval(
    () => {
      refreshAccessTokens()
    },
    schedule
  )
}

refreshAccessTokenWatcher()

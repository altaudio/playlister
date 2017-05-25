import http from 'http'
import bot from './initialiseBot.js'
import onPostback from './onPostback'
import onRequest from './onRequest'
import onMessage from './onMessage.js'

const server = http.createServer(bot.middleware())

bot.on('error', (error) => {
  console.log(error.message)
})

bot.on('postback', onPostback)
bot.on('message', onMessage)
server.on('request', onRequest)

server.listen(3000)
console.log('Echo bot server running at port 3000.')

import http from 'http'
import bot from './initialiseBot.js'

bot.on('error', (error) => {
  console.log(error.message)
})

bot.on('message', (payload) => {
  const message = payload.message.text
  const senderId = payload.sender.id
  bot.sendMessage(senderId, { text: message })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')

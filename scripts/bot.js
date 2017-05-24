import http from 'http'
import bot from './initialiseBot.js'

bot.on('error', (error) => {
  console.log(error.message)
})

bot.on('postback', (payload) => {
  if (payload.postback.payload === 'GET_STARTED_PAYLOAD') {
    const senderId = payload.sender.id

    bot.getProfile(senderId, (error, profile) => {
      if (error) {
        console.log(error)
      }

      bot.sendMessage(
        senderId,
        {text : `Thanks ${profile.first_name},  you're now registered!`}
      )
      console.log(`${profile.first_name} ${profile.last_name} => users`)
   })
  }
})

bot.on('message', (payload) => {
  const message = payload.message.text
  const senderId = payload.sender.id
  bot.sendMessage(senderId, { text: message })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')

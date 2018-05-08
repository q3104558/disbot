const Discord = require('discord.js')
const snekfetch = require('snekfetch')

// const {
//   prefix,
//   token
// } = require('./config.json')
const prefix = process.env.PREFIX

const client = new Discord.Client()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const editTimer = async (secs, msg, textArg) => {
  let temp = 0
  if (secs > 16) {
    temp = secs - 10
    await sleep(10000)
    msg.edit(`t-**${temp}**`)
    return editTimer(temp, msg, textArg)
  }
  else if (secs > 5) {
    temp = secs - 3
    await sleep(3000)
    msg.edit(`t-**${temp}**`)
    return editTimer(temp, msg, textArg)
  }
  else if (secs > 0) {
    temp = secs - 1
    await sleep(1000)
    msg.edit(`t-**${temp}**`)
    return editTimer(temp, msg, textArg)
  }
  // msg.react('⏰')
  return msg.edit('t-:zero:')
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('%%commands', { type: 'LISTENING' })
})

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`))

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) && !message.content.includes('ACTIVATING PARROT MODE')) return

  if (message.content.includes('ACTIVATING PARROT MODE')) {
    message.channel.send('no!')
  }

  const editThatMessage = async (ms, content) => {
    await sleep(ms)
    return message.edit(content)
  }

  // const editTimer = async (secs, msg, textArg) => {
  //   let temp = 0
  //   if (secs > 16) {
  //     temp = secs - 10
  //     await sleep(10000)
  //     msg.edit(`t-**${temp}**`)
  //     return editTimer(temp, msg, textArg)
  //   }
  //   else if (secs > 5) {
  //     temp = secs - 3
  //     await sleep(3000)
  //     msg.edit(`t-**${temp}**`)
  //     return editTimer(temp, msg, textArg)
  //   }
  //   else if (secs > 0) {
  //     temp = secs - 1
  //     await sleep(1000)
  //     msg.edit(`t-**${temp}**`)
  //     return editTimer(temp, msg, textArg)
  //   }
  //   // msg.react('⏰')
  //   return msg.edit('t-:zero:')
  // }

  const sendThatMessage = async (ms, content) => {
    await sleep(ms)
    return message.channel.send(content)
  }

  const typeThatMessage = async (ms, content) => {
    message.channel.startTyping()
    await sleep(ms)
    // .then(message.channel.stopTyping())
    return message.channel.send(content)
  }

  const sendYes = (content) => {
    message.channel.send(`:thumbsup: ${content}`)
  }
  const sendNo = (content) => {
    message.channel.send(`:skull_crossbones: ${content}`)
  }

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()
  // textArg is the stringified version of args
  let textArg = args.join(' ')
  // numb is the first argument converted to an integer
  let numb = parseInt(args[0], 10)
  // aa is a regular expression for the screaming command
  let aa = new RegExp(/[a]{2,}/i)


  console.log(`${message.author.tag}  -  ${command} ${textArg}`)

  // literally nothing
  if (command === '') {
    message.reply('pls do a command pls')
  } // types[i]
  else if (command.startsWith('types')) {
    if (message.author.bot) {
      const i = parseInt(command.substr(5, 1), 10) + 1
      let nim = args.shift()
      const textArg2 = args.join(' ').replace('<', '').replace('>', '')
      console.log(`${i} time = ${nim}`)
      message.edit(`t-**${nim}**`)
      editTimer(nim, message, textArg2)
      // `msg` is a message object that will be passed through the filter function
      const filter = msg => (msg.content === textArg2)
      const collector = message.channel.createMessageCollector(filter, { time: (nim * 1000) })
      collector.on('collect', (msg) => {
        console.log(`${i} CORRECT:  ${msg.author.tag}  -  ${msg.content}`)
        msg.react('🆗')
      })
      collector.on('end', (collected) => {
        console.log(`${i} time's up!`)
        console.log(`${i} ${collected.size} correct answers`)
        if (collected.size === 0) {
          console.log(`${i} first: (literally nobody)`)
          sendNo(`no one correctly typed **#${i}**`)
        }
        else {
          const correctKey = collected.firstKey()
          const correctUser = message.channel.fetchMessage(correctKey)
            .then((ms) => {
              console.log(`${i} first: ${ms.author.tag}`)
              sendYes(`you did **#${i}**, ${ms.author}**!**`)
            })
        }
      })
    }
  } // TYPE-all
  else if (command === 'typeboth' || command === 'type-both' || command === 'typeall' || command === 'type-all' || command === 'typemore' || command === 'type-more') {
    let newline = new RegExp(/\n/)
    let lineCount = (textArg.match(/\n/g) || []).length
    let otherArgText = textArg.split(/\n/)
    // nams is an array of the numerical arguments
    let nams = []
    // namHigh keeps track of the highest value in nams
    let namHigh = 0
    for (let i = 1; i <= lineCount; i++) {
      // console.log(`otherArgText[${i}]: ${otherArgText[i]}`)
      let otherArgs = otherArgText[i].split(/ +/)
      nams[i - 1] = parseInt(otherArgs[0], 10)
      if (isNaN(nams[i - 1]) || nams[i - 1] >= 70) {
        // set namHigh to an impossibly high value
        namHigh = 9001
      }
      else if (nams[i - 1] > namHigh) {
        namHigh = nams[i - 1]
      }
    }
    if (namHigh > 9000) {
      // if namHigh has an invalid value
      message.reply('that\'s not a good number')
      sendThatMessage(500, 'do `%%help type` for syntax help')
    }
    else {
      let firstArg = otherArgText.shift()
      console.log('highest number:', namHigh)
      // console.log('numbers:', nams)
      // console.log('args:', otherArgText)
      let resultMsg = 'time\'s up!'
      for (let i = 0; i < otherArgText.length; i++) {
        // console.log(`here is where i do \`%%types${i} ${otherArgText[i]}\``)
        message.channel.send(`%%types${i} ${otherArgText[i]}`)
      }
    }
  } // TYPE
  else if (command === 'type' || command === 'time') {
    if (isNaN(numb) || numb >= 70) {
      // if seconds has an invalid value
      message.reply('that\'s not a good number')
      sendThatMessage(500, 'do `%%help type` for syntax help')
    } else if (!message.author.bot) {
      message.channel.send(`%%type ${textArg}`)
    } else {
      args.shift()
      const textArg2 = args.join(' ').replace('<', '').replace('>', '')
      console.log(`time = ${numb}`)
      message.edit(`t-**${numb}**`)
      editTimer(numb, message, textArg2)
      // `msg` is a message object that will be passed through the filter function
      const filter = msg => (msg.content === textArg2)
      const collector = message.channel.createMessageCollector(filter, { time: (numb * 1000) })
      collector.on('collect', (msg) => {
        console.log(`CORRECT:  ${msg.author.tag}  -  ${msg.content}`)
        msg.react('🆗')
      })
      collector.on('end', (collected) => {
        console.log('time\'s up!')
        message.channel.send('time\'s up!')
        console.log(`${collected.size} correct answers`)
        if (collected.size === 0) {
          console.log('first: (literally nobody)')
          sendNo(`no one correctly typed '${textArg2}'`)
        }
        else {
          const correctKey = collected.firstKey()
          const correctUser = message.channel.fetchMessage(correctKey)
            .then((ms) => {
              console.log(`first: ${ms.author.tag}`)
              sendYes(`you did it, ${ms.author}**!**`)
            })
        }
      })
    }
  } // dog
  else if (command === 'dog') {
    const { body } = await snekfetch.get('https://dog.ceo/api/breeds/image/random')
    // console.log('dog =', body['message'])
    const embed = new Discord.RichEmbed()
      .setColor('#C7D62C')
      .setImage(body['message'])
    message.channel.send(embed)
  } // cat
  else if (command === 'cat') {
    let embed = new Discord.RichEmbed()
    try {
      await snekfetch.get('https://aws.random.cat/meow')
        .then((data) => {
        // console.log(data)
          embed
            .setColor('#C7D62C')
            .setImage(data.body.file)
          return message.channel.send({ embed })
        })
    }
    catch (err) {
      // if the API returns an error
      console.log('cat error!')
      // console.log(err.stack)
      embed
        .setColor('#C7D62C')
        .setTitle(':cat2:')
      message.channel.send({ embed })
    }
  } // joke
  else if (command === 'joke' || command === 'pun') {
    let funny = 'ha ha'
    const bod = await snekfetch.get('https://icanhazdadjoke.com/')
      .set('Accept', 'application/json')
      .set('User-Agent', 'Zach\'s discord bot (zachstevens39@gmail.com)')
      .then((r) => {
        // console.log(r.body.joke)
        funny = r.body
      })
    console.log('joke =', funny.joke)
    const embed = new Discord.RichEmbed()
      .setColor('#C7D62C')
      .setTitle('joke')
      .setURL(`https://icanhazdadjoke.com/j/${funny.id}`)
      .addField('a joke', funny.joke)
    message.channel.send(embed)
  } // lucky
  else if (command === 'lucky') {
    message.channel.send({
      files: [{
        attachment: '../src/lucky.jpg',
        name: 'lucky.jpg'
      }]
    })
  } // 'a real command'
  else if (command === 'a' || command === 'real' || command === 'command') {
    message.reply('that\'s not a real command')
  } // thanks
  else if (command === 'thanks') {
    message.reply('omz! thanks for the support')
  } // help
  else if (command === 'help') {
    if (!args[0] || !(args[0].startsWith('type'))) {
      let blah = `
__**commands**__


__type__
speed typing timer \`\`\`%%type <seconds> [words to type]\`\`\`

__type-all__
speed typing timer for multiple phrases \`\`\`%%type-all
<seconds> [words to type]
<seconds> [other words to type]\`\`\`

__dog__
posts a random dog \`\`\`%%dog\`\`\`

__cat__
posts either a random cat or :cat2: \`\`\`%%cat\`\`\`

__joke__
posts a random joke \`\`\`%%joke\`\`\`

__thanks__
show your appreciation \`\`\`%%thanks @ZRPizza#5682\`\`\`

__help__
sends you this message \`\`\`%%help\`\`\`

__ping__
ping \`\`\`%%ping\`\`\`

__pong__
pong \`\`\`%%pong\`\`\`

__pizza__
:pizza: \`\`\`%%pizza\`\`\`

__ok__
idk \`\`\`%%ok\`\`\`

__poop__
pls don't do this command pls \`\`\`%%poop\`\`\`

__boob__
nsfw \`\`\`%%boob\`\`\`

__blargh__
barfing gif \`\`\`%%blargh\`\`\`

__scary__
scary gif \`\`\`%%scary\`\`\`

__gnome__
gnome emoji \`\`\`%%gnome\`\`\`

__AAAAAAAAAA__
:AAAAAAAAAA: AAAAAAAAAA \`\`\`%%AAAAAAAAAA\`\`\`
`
      message.author.send(blah)
        .then(message.channel.send('ok i just pm\'d you my command list'))
        .catch(console.error)
    }
    else if (args[0].startsWith('type')) {
      message.channel.send(`command syntax is either
        \`\`\`%%type <seconds> [words to type]\`\`\`
        or
        \`\`\`%%type-all
        <seconds> [words to type]
        <seconds> [other words to type]\`\`\``)
      sendThatMessage(3000, 'that\'s all i know')
      sendThatMessage(4000, 'sorry if i wasn\'t helpful enough')
    }
    else {
      message.channel.send('idk how to help you')
      message.reply('sorry')
    }
  } // ping
  else if (command === 'ping') {
    message.channel.send('pizza!')
  } // pong
  else if (command === 'pong') {
    message.channel.send(':ping_pong:')
  } // pizza
  else if (command === 'pizza' || command === ':pizza:') {
    message.channel.send(':pizza:')
  } // ok
  else if (command === 'ok') {
    message.channel.send(':shrug:')
  } // poop
  else if (command === 'poop') {
    if (message.channel.nsfw === true) {
      message.reply(':poop:')
    }
    else {
      message.reply('pls no')
    }
  } // blargh
  else if (command === 'blah' || command === 'blargh') {
    message.channel.send({
      files: [{
        attachment: '../src/rainbow-barf.gif',
        name: 'rainbow-barf.gif'
      }]
    })
  } // scary
  else if (command === 'scary') {
    message.channel.send({
      files: [{
        attachment: '../src/gnightmare.gif',
        name: 'gnightmare.gif'
      }]
    })
  } // gnome
  else if (command.startsWith('gnome')) {
    let emoj = message.guild.emojis.find('name', 'gnome')
    if (emoj) {
      message.channel.send(`${emoj}`)
    } else {
      message.channel.send({
        files: [{
          attachment: '../src/gnome.png',
          name: 'gnome.png'
        }]
      })
    }
  } // AAAAAAAAAA
  else if (command.match(aa)) {
    let emoj = message.guild.emojis.find('name', 'AAAAAAAAAA')
    if (emoj) {
      message.channel.send(`${emoj}`)
    } else {
      message.channel.send({
        files: [{
          attachment: '../src/AAAAAAAAAA.png',
          name: 'AAAAAAAAAA.png'
        }]
      })
    }
  } // boob
  else if (command === 'boob') {
    if (message.channel.nsfw === true) {
      message.channel.send(` \`\`\`
    _____
   < ok. >
    -----
           \\   ^__^
            \\  (oo)\\_______
               (__)\\       )\\/\\
                   ||----w |
                   ||     ||
\`\`\`
    `)
    } else {
      message.channel.send(` \`\`\`
    _____
   < no. >
    -----
           \\   ^__^
            \\  (oo)\\_______
               (__)\\       )\\/\\
                   ||----w |
                   ||     ||
\`\`\`
    `)
    }
  } // secret
  else if (command === 'secret' || command === 'c7d62c' || command === '<:c7d62c:442095242049617957>') {
    message.channel.send({
      files: [{
        attachment: '../src/c7d62c.png',
        name: 'c7d62c.png'
      }]
    })
  } // snot lore
  else if (command === 'snot') {
    if (!args[0]) {
      message.channel.send('SNOT is an rp about a meme')
    }
    else {
      const embed = new Discord.RichEmbed()
        .setColor('#C7D62C')
        .setTitle('c7d62c')
        .setURL('https://imgur.com/gr4fxNB')
      message.reply('do you wanna know the truth about SNOT?')
      sendThatMessage(3000, 'ok, i\'ll tell you')
      sendThatMessage(4000, 'it all started with y')
      await sleep(4050)
        .then(gah => message.channel.send(embed))
    }
    // message.channel.send()
  } // anything else
  else {
    message.reply('pls do a real command pls')
  }
})

client.login(process.env.TOKEN)

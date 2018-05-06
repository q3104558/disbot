const Discord = require('discord.js')
const {
  prefix,
  token
} = require('./config.json')
const snekfetch = require('snekfetch')
// const xml2js = require('xml2js')

// const fetch = require('node-fetch')
// const fs = require('fs')
// const http = require('http')


const client = new Discord.Client()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// const dogUrl = 'http://www.placepuppy.net/400/350'
// let doggie = ''

// let xmlhttp = new XMLHttpRequest()
// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         let dogger = JSON.parse(this.responseText)
//         doggie = dogger.message
//     }
// };
// xmlhttp.open('GET', dogUrl, true);
// xmlhttp.send();

// function getDog(xml) {
//   let xmlDoc = JSON.parse(xml)
//   let doggo = xmlDoc.message
//   return doggo
// }
// function loadDog() {
//   let xhttp = new XMLHttpRequest()
//   xhttp.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       getDog(this)
//     }
//   }
//   xhttp.open('GET', 'https://dog.ceo/api/breeds/image/random', true)
//   xhttp.send()
// }

// const genDog = () => http.get({
//   host: 'dog.ceo',
//   path: '/api/breeds/image/random'
// }, function (response) {
//   // Continuously update stream with data
//   let body = '';
//   response.on('data', function (d) {
//     body += d;
//   });
//   response.on('end', function () {
//     // Data reception is done, do whatever with it!
//     let parsed = JSON.parse(body);
//     doggie = parsed.message
//     callback({
//       doggie: parsed.message
//     });
//   });
// })
// const genDog = () => {
//   http.get(dogUrl, response => response.json())
//     .then(function (data) {
//       doggie = data.message
//       console.log(doggie)
//       return doggie
//     })
//   // fs.readFileSync(dogUrl, 'utf8')
//   // doggie = JSON.parse(dooger).message
//   // console.log(dooger, doggie);
//   // return doggie
// }

// const genDog = () => {
//   let dooger = fs.readFileSync(dogUrl, 'utf8')
//   doggie = JSON.parse(dooger).message
//   console.log(dooger, doggie);
//   return doggie
// }

// const generateDog = async () => {
//   await fetch(dogUrl)
//     .then(resp => resp.json())
//     .then(function (data) {
//       doggie = data.message
//       return doggie
//     })
// }



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('%%commands', { type: 'LISTENING' })
  // .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  // .catch(console.error)
})

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`))

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix)) return

  const editThatMessage = async (ms, content) => {
    // const msg = await channel.fetchMessage(id); // Async
    await sleep(ms)
    return message.edit(content)
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
      // msg.react('🔜')
      return editTimer(temp, msg, textArg)
    }
    else if (secs > 0) {
      temp = secs - 1
      await sleep(1000)
      msg.edit(`t-**${temp}**`)
      return editTimer(temp, msg, textArg)
    }
    return msg.edit('t-:zero:')
    // return msg.edit(`t-**0**\n${textArg}`)
    // console.log('editTimer!')
    // message.channel.send(':zero:')
    // msg.react('🔜')
    // return msg.react('⏰')
    // return msg.react('🆙')
    // return message.channel.send('time\'s up!')
    // await sleep(secs * 1000)
    // return message.edit(`${secs}`)
  }

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

  const sendYes = (msg) => {
    message.channel.send(`:thumbsup: ${msg}`)
    // .then(m => m.react('👍'))
    // await sleep(ms)
    // return message.channel.send(message.content)
  }
  const sendNo = (msg) => {
    message.channel.send(`:skull_crossbones: ${msg}`)
    // .then(m => m.react('☠'))
    // .then(m => m.react('💥'))
    // await sleep(ms)
    // return message.channel.send(message.content)
  }

  // let xmlhttp = new XMLHttpRequest()
  // xmlhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //         let dogger = JSON.parse(this.responseText)
  //         doggie = dogger.message
  //     }
  // };
  // xmlhttp.open('GET', dogUrl, true);
  // xmlhttp.send();

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()
  // let textArg = message.content.slice(prefix.length + 6)
  // if (args[0].length > 1) {
  // textArg = message.content.slice(prefix.length + 7)
  // }
  // let textArg = message.content.slice(prefix.length + 7)
  let textArg = args.join(' ')

  // let emoj
  let numb = parseInt(args[0], 10)
  // let body
  // let doggo
  let aa = new RegExp(/[a]{2,}/i)


  console.log(`${message.author.tag}  -  ${command} ${textArg}`)

  // literally nothing
  if (command === '') {
    message.reply('pls do a command pls')
  } // types[i]
  else if (command.startsWith('types')) {
    if (message.author.bot) {
      // let otherArgs = otherArgText[i].split(/ +/)
      const i = parseInt(command.substr(5, 1), 10) + 1
      let nim = args.shift()
      const textArg2 = args.join(' ').replace('<', '').replace('>', '')
      // const textArg2 = otherArgs.join(' ')
      console.log(`${i} time = ${nim}`)
      message.edit(`t-**${nim}**`)
      editTimer(nim, message, textArg2)
      // `msg` is a message object that will be passed through the filter function
      const filter = msg => (msg.content === textArg2)
      const collector = message.channel.createMessageCollector(filter, { time: (nim * 1000) })
      // let correctOne = ''
      collector.on('collect', (msg) => {
        console.log(`${i} CORRECT:  ${msg.author.tag}  -  ${msg.content}`)
        msg.react('🆗')
        // correctOne = msg.author
      })
      collector.on('end', (collected) => {
        // message.channel.send(':zero:')
        console.log(`${i} time's up!`)
        // message.channel.send(`#${i} time's up!`)
        console.log(`${i} ${collected.size} correct answers`)
        if (collected.size === 0) {
          // message.channel.send(`%%no one correctly typed '${textArg2}'`)
          console.log(`${i} first: (literally nobody)`)
          sendNo(`no one correctly typed **#${i}**`)
          // resultMsg += `\nno one correctly typed **#${i}**`
        }
        else {
          const correctKey = collected.firstKey()
          const correctUser = message.channel.fetchMessage(correctKey)
            .then((ms) => {
              console.log(`${i} first: ${ms.author.tag}`)
              // message.channel.send('time\'s up!')
              // message.channel.send(`%%you did it, **${ms.author}!**`)
              sendYes(`you did **#${i}**, ${ms.author}**!**`)
              // resultMsg += `\nyou did **#${i}**, ${ms.author}**!**`
            })
        }
        // const correctName = correctUser.author
        // console.log(`first: ${correctUser}`)
        // console.log(`collected: \n${collected}`)
        // console.log('time\'s up!')
        // message.channel.send(':zero:')
      })
    }
  } // TYPE-all
  else if (command === 'typeboth' || command === 'type-both' || command === 'typeall' || command === 'type-all' || command === 'typemore' || command === 'type-more') {
    let newline = new RegExp(/\n/)
    let lineCount = (textArg.match(/\n/g) || []).length
    // let otherArgText = textArg.replace(newline).split(/\n/)
    let otherArgText = textArg.split(/\n/)
    // otherArgText.shift()
    let nams = []
    let namHigh = 0
    for (let i = 1; i <= lineCount; i++) {
      console.log(`otherArgText[${i}]: ${otherArgText[i]}`)
      let otherArgs = otherArgText[i].split(/ +/)
      nams[i - 1] = parseInt(otherArgs[0], 10)
      if (isNaN(nams[i - 1]) || nams[i - 1] >= 70) {
        // message.reply('that\'s not a good number')
        // sendThatMessage(500, 'do `%%help type` for syntax help')
        namHigh = 9001
      }
      else if (nams[i - 1] > namHigh) {
        namHigh = nams[i - 1]
      }
    }
    if (namHigh > 9000) {
      message.reply('that\'s not a good number')
      sendThatMessage(500, 'do `%%help type` for syntax help')
    }
    else {
      let firstArg = otherArgText.shift()
      console.log('highest number:', namHigh)
      console.log('numbers:', nams)
      console.log('args:', otherArgText)
      let resultMsg = 'time\'s up!'
      for (let i = 0; i < otherArgText.length; i++) {
        console.log(`here is where i would do \`%%types${i} ${otherArgText[i]}\``)
        message.channel.send(`%%types${i} ${otherArgText[i]}`)
        // message.channel.send(`%%type ${otherArgText[i]}`)
        // let otherArgs = otherArgText[i].split(/ +/)
        // let nim = otherArgs.shift()
        // const textArg2 = otherArgs.join(' ')
        // console.log(`${i} time = ${nim}`)
        // message.edit(`t-**${nim}** (${i})`)
        // editTimer(nim, message, textArg2)
        // // `msg` is a message object that will be passed through the filter function
        // const filter = msg => (msg.content === textArg2)
        // const collector = message.channel.createMessageCollector(filter, { time: (nim * 1000) })
        // // let correctOne = ''
        // collector.on('collect', (msg) => {
        //   console.log(`${i} CORRECT:  ${msg.author.tag}  -  ${msg.content}`)
        //   msg.react('🆗')
        //   // correctOne = msg.author
        // })
        // collector.on('end', (collected) => {
        //   // message.channel.send(':zero:')
        //   console.log(`${i} time's up!`)
        //   // message.channel.send(`#${i} time's up!`)
        //   console.log(`${i} ${collected.size} correct answers`)
        //   if (collected.size === 0) {
        //     // message.channel.send(`%%no one correctly typed '${textArg2}'`)
        //     // sendNo(`no one correctly typed '${textArg2}'`)
        //     resultMsg += `\nno one correctly typed **#${i}**`
        //   }
        //   else {
        //     const correctKey = collected.firstKey()
        //     const correctUser = message.channel.fetchMessage(correctKey)
        //       .then((ms) => {
        //         console.log(`${i} first: ${ms.author.tag}`)
        //         // message.channel.send('time\'s up!')
        //         // message.channel.send(`%%you did it, **${ms.author}!**`)
        //         // sendYes(`you did it, ${ms.author}**!**`)
        //         resultMsg += `\nyou did **#${i}**, ${ms.author}**!**`
        //       })
        //   }
        //   // const correctName = correctUser.author
        //   // console.log(`first: ${correctUser}`)
        //   // console.log(`collected: \n${collected}`)
        //   // console.log('time\'s up!')
        //   // message.channel.send(':zero:')
        // })
      }
      // sendThatMessage(namHigh * 1000, ':zero:')
      //   .then((resu) => {
      //     if (resultMsg.includes('no one correctly typed')) {
      //       sendNo(resultMsg)
      //     }
      //     else {
      //       sendYes(resultMsg)
      //     }
      //   })
    }
    // for (let i = 0; i < otherArgText.length; i++) {
    //   message.channel.send(`%%type ${otherArgText[i]}`)
    // }
  }
  // console.log('numbers:', nams)
  // console.log('args:', otherArgText)
  // for (let i = 0; i < lineCount; i++) {
  // let otherArgs = otherArgText[i].split(/ +/)
  // let nam = parseInt(otherArgs[0], 10)
  // if (isNaN(nam) || nam >= 70) {
  // message.reply('that\'s not a good number')
  // sendThatMessage(500, 'do `%%help type` for syntax help')
  // } else if (!message.author.bot) {
  // message.channel.send(`%%type ${otherArgText[i]}`)
  // }
  // else {
  // let nam = otherArgs[i].shift()
  // // const otherTextArg2 = otherArgs.join(' ')
  // console.log(`time = ${nam}`)
  // message.edit(`t-**${nam}**`)
  //   editTimer(nam, message, otherTextArg2)
  //   // `msg` is a message object that will be passed through the filter function
  //   const filter = msg => (msg.content === otherTextArg2)
  //   const collector = message.channel.createMessageCollector(filter, { time: (nam * 1000) })
  //   // let correctOne = ''
  //   collector.on('collect', (msg) => {
  //     console.log(`${i} CORRECT:  ${msg.author.tag}  -  ${msg.content}`)
  //     msg.react('🆗')
  //     // correctOne = msg.author
  //   })
  //   collector.on('end', (collected) => {
  //     message.channel.send(':zero:')
  //     console.log('time\'s up!')
  //     message.channel.send('time\'s up!')
  //     console.log(`${collected.size} correct answers`)
  //     if (collected.size === 0) {
  //       // message.channel.send(`%%no one correctly typed '${textArg2}'`)
  //       sendNo(`no one correctly typed '${textArg2}'`)
  //     }
  //     else {
  //       const correctKey = collected.firstKey()
  //       const correctUser = message.channel.fetchMessage(correctKey)
  //         .then((ms) => {
  //           console.log(`first: ${ms.author.tag}`)
  //           // message.channel.send('time\'s up!')
  //           // message.channel.send(`%%you did it, **${ms.author}!**`)
  //           sendYes(`you did it, **${ms.author}!**`)
  //         })
  //     }
  //     // const correctName = correctUser.author
  //     // console.log(`first: ${correctUser}`)
  //     // console.log(`collected: \n${collected}`)
  //     // console.log('time\'s up!')
  //     // message.channel.send(':zero:')
  //   })
  //  }
  // }
  // }
  // else if (command === ':thumbsup:' || command === 'you') {
  //   if (message.author.bot) {
  //     message.edit(`:thumbsup: you ${textArg}`)
  //   }
  //   message.react('👍')
  // }
  // else if (command.startsWith('no')) {
  //   if (message.author.bot) {
  //     message.edit(`aw, no ${textArg}`)
  //   }
  //   message.react('💥')
  // } // error
  // else if (command === 'error') {
  //   message.channel.send('oh')
  //   sendThatMessage(750, 'um')
  //   sendThatMessage(1500, '...ok')
  //   sendThatMessage(2500, 'here i go')
  //   typeThatMessage(8000, '...ow')
  //     .then(message.channel.stopTyping())
  //   sendThatMessage(9000, 'that kinda hurt...')
  //   // console.log('ERROR:')
  //   // sendThatMessage(2050, emoj)
  //   //   .then(console.log('...ow!'))
  // } // TYPE
  else if (command === 'type' || command === 'time') {
    if (isNaN(numb) || numb >= 70) {
      message.reply('that\'s not a good number')
      sendThatMessage(500, 'do `%%help type` for syntax help')
    } else if (!message.author.bot) {
      message.channel.send(`%%type ${textArg}`)
    } else {
      args.shift()
      const textArg2 = args.join(' ').replace('<', '').replace('>', '')
      // textArg2 = textArg2.replace('>', '')
      console.log(`time = ${numb}`)
      message.edit(`t-**${numb}**`)
      editTimer(numb, message, textArg2)
      // `msg` is a message object that will be passed through the filter function
      const filter = msg => (msg.content === textArg2)
      const collector = message.channel.createMessageCollector(filter, { time: (numb * 1000) })
      // let correctOne = ''
      collector.on('collect', (msg) => {
        console.log(`CORRECT:  ${msg.author.tag}  -  ${msg.content}`)
        msg.react('🆗')
        // correctOne = msg.author
      })
      collector.on('end', (collected) => {
        // message.channel.send(':zero:')
        console.log('time\'s up!')
        message.channel.send('time\'s up!')
        console.log(`${collected.size} correct answers`)
        if (collected.size === 0) {
          console.log('first: (literally nobody)')
          // message.channel.send(`%%no one correctly typed '${textArg2}'`)
          sendNo(`no one correctly typed '${textArg2}'`)
        }
        else {
          const correctKey = collected.firstKey()
          const correctUser = message.channel.fetchMessage(correctKey)
            .then((ms) => {
              console.log(`first: ${ms.author.tag}`)
              // message.channel.send('time\'s up!')
              // message.channel.send(`%%you did it, ${ms.author}**!**`)
              sendYes(`you did it, ${ms.author}**!**`)
            })
        }
        // const correctName = correctUser.author
        // console.log(`first: ${correctUser}`)
        // console.log(`collected: \n${collected}`)
        // console.log('time\'s up!')
        // message.channel.send(':zero:')
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
    // message.channel.send({
    //   files: [body['message']]
    // })
    // message.channel.send(body['message'])
  } // cat
  else if (command === 'cat') {
    // message.channel.send(':cat:')
    let embed = new Discord.RichEmbed()
    try {
      await snekfetch.get('https://aws.random.cat/meow')
        .then((data) => {
        // console.log(data)
        // console.log(blah)
          embed
            .setColor('#C7D62C')
            .setImage(data.body.file)
          return message.channel.send({ embed })
        })
    }
    catch (err) {
      // console.log(err.stack)
      console.log('cat error')
      embed
        .setColor('#C7D62C')
        .setTitle(':cat:')
      message.channel.send({ embed })
    }

    // snekfetch.get('https://aws.random.cat/meow').then((res) => {
    //   const embed = new Discord.RichEmbed()
    //     .setImage(res.body.file)
    //   return message.channel.send({embed});
    // });
    // embed
    //   .setColor('#C7D62C')
    //   .setImage(data)
    // message.channel.send(':cat:')
    // message.channel.send({
    //   files: ['http://lorempixel.com/640/480/cats']
    // })
    // const embed = new Discord.RichEmbed()
    //   .setColor('#C7D62C')
    //   .setImage(body)
    // .setTitle('cat')
    // .setURL('http://lorempixel.com/640/480/cats')
    // .setImage('http://lorempixel.com/640/480/cats')
    // .setFooter('cat', 'http://lorempixel.com/640/480/cats')
    // message.channel.send(embed)
    // http://lorempixel.com/640/480/cats/
    // let kitty = ''
    // const { text } = await snekfetch.get('http://thecatapi.com/api/images/get?format=xml')
    //   .then((r) => {
    //     console.log(r)
    //     // console.log(r.body)
    //     // console.log(r.body.joke)
    //     // console.log(r)
    //     let parser = new xml2js.Parser();
    //     parser.parseString(r, function (err, result) {
    //       // console.log(result['url'])
    //       console.log(result)
    //       // kitty = result['url']
    //     })
    //     // kitty = r
    //     // let parser = new xml2js.Parser();
    //     // parser.parseString(r, function (err, result) {
    //     //   console.log(result)
    //     //   kitty = result
    //     // })
    //   })
    // console.log(text)
    // let parser = new xml2js.Parser();
    // let kit = ''
    // parser.parseString(kitty, function (err, result) {
    //   console.log(result['url'])
    //   kit = result['url']
    // })
    // parseString(bod, function (err, result) {
    //   console.log(result)
    //   kitty = result
    // })
    // console.log(bod)
    // console.log(bod.body)
    // console.log(body)
    // message.channel.send({
    //   files: [kitty]
    // })
    // message.channel.send(body['message'])
  } // joke
  else if (command === 'joke' || command === 'pun') {
    // let snek = new snekfetch()
    let funny = 'ha ha'
    const bod = await snekfetch.get('https://icanhazdadjoke.com/')
      .set('Accept', 'application/json')
      // .set('User-Agent', 'ZRPizza discord bot (q3104558@gmail.com)')
      .then((r) => {
        // console.log(r)
        // console.log(r.body)
        // console.log(r.body.joke)
        funny = r.body
      })
    // .set('Accept', 'text/plain').set('User-Agent', 'ZRPizza discord bot (zachstevens39@gmail.com)')
    // JSON.parse(text)
    console.log('joke =', funny.joke)
    const embed = new Discord.RichEmbed()
      .setColor('#C7D62C')
      .setTitle('joke')
      .setURL(`https://icanhazdadjoke.com/j/${funny.id}`)
      .addField('a joke', funny.joke)
    message.channel.send(embed)
    // console.log(JSON.parse(text))
    // message.channel.send('`', funny.joke, '`')
  } // lucky
  else if (command === 'lucky') {
    message.channel.send({
      files: [{
        attachment: 'src/lucky.jpg',
        name: 'lucky.jpg'
      }]
    })
  } // a real command
  else if (command === 'a' || command === 'real' || command === 'command') {
    message.reply('that\'s not a real command')
  } // thanks
  else if (command === 'thanks') {
    message.reply('omz! thanks for the support')
  } // help
  else if (command === 'help') {
    if (args[0] === 'type' || args[0] === 'time') {
      message.channel.send('command syntax is `%%type <seconds> [words to type]`')
      sendThatMessage(2000, 'that\'s all i know')
      sendThatMessage(3000, 'sorry if i wasn\'t helpful enough')
    }
    else if (!args[0]) {
      // const embed = new Discord.RichEmbed()
      //   .setColor('#C7D62C')
      //   .setTitle('__commands__')
      //   .addField('command', 'command info\n`%%command`')
      //   .addField('type', 'speed typing timer command\n`%%type <seconds> [words to type]`')
      //   .addField('dog', 'posts a random image of a dog\n`%%dog`')
      //   .addField('cat', 'posts a cat\n`%%cat`')
      //   .addField('joke', 'posts a random joke\n`%%joke`')
      //   .addField('thanks', 'show your appreciation\n`%%thanks @ZRPizza#5682`')
      //   .addField('help', 'sends you this message\n`%%help`')
      //   // .addField('ping', 'ping\n`%%ping`')
      //   // .addField('pizza', 'idk\n`%%pizza`')
      //   // .addField('poop', 'pls don\'t do this command pls\n`%%poop`')
      //   // .addField('boob', 'nsfw\n`%%boob`')
      //   .addField('blargh', 'barfing gif\n`%%blargh`')
      //   .addField('scary', 'scary gif\n`%%scary`')
      //   .addField('gnome', 'gnome emoji\n`%%gnome`')
      //   .addField('AAAAAAAAAA', 'AAAAAAAAAA\n`%%AAAAAAAAAA`')
      //   .setFooter('ping, pizza, poop, boob, & other miscellaneous commands not included', 'src/AAAAAAAAAA.png')
      let blah = `
        __**commands**__

        __type__
        speed typing timer command
        \`%%type <seconds> [words to type]\`

        __dog__
        posts a random dog
        \`%%dog\`

        __cat__
        posts either a random cat or :cat:
        \`%%cat\`

        __joke__
        posts a random joke
        \`%%joke\`

        __thanks__
        show your appreciation
        \`%%thanks @ZRPizza#5682\`

        __help__
        sends you this message
        \`%%help\`

        __ping__
        ping
        \`%%ping\`

        __pizza__
        idk
        \`%%pizza\`

        __poop__
        pls don't do this command pls
        \`%%poop\`

        __boob__
        nsfw
        \`%%boob\`

        __blargh__
        barfing gif
        \`%%blargh\`

        __scary__
        scary gif
        \`%%scary\`

        __gnome__
        gnome emoji
        \`%%gnome\`

        __AAAAAAAAAA__
        :AAAAAAAAAA: AAAAAAAAAA
        \`%%AAAAAAAAAA\`
        `
      message.author.send(blah)
        .then(message.channel.send('ok i just pm\'d you my command list'))
        .catch(console.error)
      // message.channel.send('ok i just pm\'d you my command list')
    }
    // else if (args[0] === 'me') {
    //   message.channel.send('idk')
    //   sendThatMessage(1000, 'sorry')
    //   message.channel.send('command syntax is `%%type <seconds> [words to type]`')
    //   sendThatMessage(3000, 'that\'s all i know')
    //   sendThatMessage(4000, 'sorry if i wasn\'t helpful enough')
    // }
    else {
      message.channel.send('idk how to help you')
      message.reply('sorry')
    }
    // message.channel.send('command syntax is `%%type <seconds> [words to type]`')
    // sendThatMessage(3000, 'that\'s all i know')
    // sendThatMessage(4000, 'sorry if i wasn\'t helpful enough')
  } // ping
  else if (command === 'ping') {
    message.channel.send('pizza!')
  } // pizza
  else if (command === 'pizza') {
    message.channel.send(':shrug:')
  } // poop
  else if (command === 'poop') {
    // console.log(`${message.author} ${command} ${textArg}`)
    if (message.channel.nsfw === true) {
      message.reply(':poop:')
    }
    else {
      message.reply('no pls')
    }
  } // blah blargh
  else if (command === 'blah' || command === 'blargh') {
    message.channel.send({
      files: [{
        attachment: 'src/rainbow-barf.gif',
        name: 'rainbow-barf.gif'
      }]
    })
  } // scary
  else if (command === 'scary') {
    message.channel.send({
      files: [{
        attachment: 'src/gnightmare.gif',
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
          attachment: 'src/gnome.png',
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
          attachment: 'src/AAAAAAAAAA.png',
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
  } // literally anything else
  else {
    message.reply('pls do a real command pls')
  }
})

client.login(token)



//   switch (command) {
//     // literally nothing
//     case '':
//       message.reply('pls do a command pls')
//       break
//     /* // type
//     case 'type':
//       if (isNaN(numb) || numb > 70) {
//         message.reply('that is not a good number')
//         break
//       } else if (numb <= 2) {
//         message.reply('that is really short')
//         break
//       }
//       // sendThatMessage(`%%time ${numb}`)
//       message.channel.send(`%%time ${numb}`)
//       break */
//     // type
//     case 'time':
//     case 'type':
//       if (isNaN(numb) || numb >= 70) {
//         message.reply('that is not a good number')
//         break
//       } else if (!message.author.bot) {
//         message.channel.send(`%%type ${textArg}`)
//         break
//       } else {
//         console.log(`${numb} = numb`)
//         message.edit(`t-**${numb}**`)
//         editTimer(numb, message, textArg)
//         break
//       }
//     // dog
//     case 'dog':
//       // https://dog.ceo/api/breeds/image/random
//       body = await snekfetch.get('https://dog.ceo/api/breeds/image/random').body
//       message.channel.send(body['message'])
//       break
//     // dog
//     case 'lucky':
//       // xmlhttp.onreadystatechange = function () {
//       //   if (this.readyState === 4 && this.status === 200) {
//       //     let dogger = JSON.parse(this.responseText)
//       //     doggie = dogger.message
//       //   }
//       // };
//       // xmlhttp.open('GET', dogUrl, true);
//       // xmlhttp.send();
//       // doggo = generateDog()
//       // genDog()
//       message.channel.send({
//         files: [{
//           attachment: 'src/lucky.jpg',
//           name: 'lucky.jpg'
//         }]
//       })
//       break
//     // a real command
//     case 'a':
//     case 'real':
//     case 'command':
//       message.reply('that is not a real command')
//       break
//     // thanks
//     case 'thanks':
//       message.channel.send('omz! thanks for the support!')
//       break
//     // ping
//     case 'ping':
//       message.channel.send('pizza!')
//       break
//     // help
//     case 'help':
//       message.channel.send('command syntax is `%%type <seconds> [words to type]`')
//       sendThatMessage(3000, 'that is all i have to say')
//       sendThatMessage(5000, 'sorry if i could not help you')
//       break
//     // pizza
//     case 'pizza':
//       message.channel.send(':shrug:')
//       break
//     // poop
//     case 'poop':
//       if (message.channel.nsfw === true) {
//         message.channel.send(':poop:')
//       } else {
//         message.channel.send('no pls')
//       }
//       break
//     // blah blargh
//     case 'blah':
//     case 'blargh':
//       message.channel.send({
//         files: [{
//           attachment: 'src/rainbow-barf.gif',
//           name: 'rainbow-barf.gif'
//         }]
//       })
//       break
//     // scary
//     case 'scary':
//       message.channel.send({
//         files: [{
//           attachment: 'src/gnightmare.gif',
//           name: 'gnightmare.gif'
//         }]
//       })
//       break
//     // gnome
//     case 'gnome':
//       emoj = message.guild.emojis.find('name', 'gnome')
//       if (emoj) {
//         message.channel.send(`${emoj}`)
//       } else {
//         message.channel.send({
//           files: [{
//             attachment: 'src/gnome.png',
//             name: 'gnome.png'
//           }]
//         })
//       }
//       break
//     // AAAAAAAAAA
//     case 'aa':
//     case 'aaa':
//     case 'aaaa':
//     case 'aaaaa':
//     case 'aaaaaa':
//     case 'aaaaaaa':
//     case 'aaaaaaaa':
//     case 'aaaaaaaaa':
//     case 'aaaaaaaaaa':
//       emoj = message.guild.emojis.find('name', 'AAAAAAAAAA')
//       if (emoj) {
//         message.channel.send(`${emoj}`)
//       } else {
//         message.channel.send({
//           files: [{
//             attachment: 'src/AAAAAAAAAA.png',
//             name: 'AAAAAAAAAA.png'
//           }]
//         })
//       }
//       break
//     // boob
//     case 'boob':
//       if (message.channel.nsfw === true) {
//         message.channel.send(` \`\`\`
//       _____
//      < ok. >
//       -----
//              \\   ^__^
//               \\  (oo)\\_______
//                  (__)\\       )\\/\\
//                      ||----w |
//                      ||     ||
// \`\`\`
//       `)
//       } else {
//         message.channel.send(` \`\`\`
//       _____
//      < no. >
//       -----
//              \\   ^__^
//               \\  (oo)\\_______
//                  (__)\\       )\\/\\
//                      ||----w |
//                      ||     ||
// \`\`\`
//       `)
//       }
//       break
//     // anything else
//     default:
//       message.reply('pls do a real command pls')
//   }
// })
//
// client.login(token);

//
//   // literally nothing
//   if (command.length === 0) {
//     message.channel.send('pls do a real command pls')
//   }
//   // real command
//   else if (command === 'a' || command === 'real' || command === 'command') {
//     message.channel.send('that is not a real command')
//   }
//   // ping
//   if (command === 'ping') {
//     message.channel.send('pizza!')
//   }
//   // help
//   else if (command === 'help') {
//     message.channel.send('yes pls')
//   }
//   // pizza
//   else if (command === 'pizza') {
//     message.channel.send(':shrug:')
//   }
//   // poop
//   else if (command === 'poop') {
//     if (message.channel.nsfw === true) {
//       message.channel.send(':poop:')
//     } else {
//       message.channel.send('no pls')
//     }
//   }
//   // blargh
//   else if (command === 'blah' || command === 'blargh') {
//     message.channel.send({
//       files: [{
//         attachment: 'src/rainbow-barf.gif',
//         name: 'rainbow-barf.gif'
//       }]
//     })
//   }
//   // scary
//   else if (command === 'scary' || command === 'scare') {
//     message.channel.send({
//       files: [{
//         attachment: 'src/gnightmare.gif',
//         name: 'gnightmare.gif'
//       }]
//     })
//   }
//   // gnome
//   else if (command === 'gnome') {
//     let emoj = message.guild.emojis.find('name', 'gnome')
//     if (emoj) {
//       message.channel.send(`${emoj}`)
//     } else {
//       message.channel.send({
//         files: [{
//           attachment: 'src/gnome.png',
//           name: 'gnome.png'
//         }]
//       })
//     }
//   }
//   // AAAAAAAAAA
//   else if (command.startsWith('aa')) {
//     let emoj = message.guild.emojis.find('name', 'AAAAAAAAAA')
//     if (emoj) {
//       message.channel.send(`${emoj}`)
//     } else {
//       message.channel.send({
//         files: [{
//           attachment: 'src/AAAAAAAAAA.png',
//           name: 'AAAAAAAAAA.png'
//         }]
//       })
//     }
//   }
//   // boob
//   else if (command === 'boob') {
//     if (message.channel.nsfw === true) {
//       message.channel.send(` \`\`\`
//       _____
//      < ok. >
//       -----
//              \\   ^__^
//               \\  (oo)\\_______
//                  (__)\\       )\\/\\
//                      ||----w |
//                      ||     ||
// \`\`\`
//       `)
//     } else {
//       message.channel.send(` \`\`\`
//       _____
//      < no. >
//       -----
//              \\   ^__^
//               \\  (oo)\\_______
//                  (__)\\       )\\/\\
//                      ||----w |
//                      ||     ||
// \`\`\`
//       `)
//     }
//   } else if (command === 'type') {
//     let numb = parseInt(args[0], 10)
//     if (isNaN(numb)) {
//       message.reply('that is not a number')
//     } else if (numb <= 3) {
//       message.reply('that is really short')
//     }
//     message.channel.send(`%%time ${numb}`)
//   } else if (command === 'time') {
//     let numb = parseInt(args[0], 10)
//     if (isNaN(numb)) {
//       message.reply('that is not a number')
//     } else if (!message.author.bot) {
//       message.channel.send(`%%time ${numb}`)
//     } else if (numb > 1) {
//       numb--
//       message.edit(`%%time ${numb}`)
//     } else {
//       message.channel.send(':zero:  time is up!')
//     }
//   }

// https://discordapp.com/oauth2/authorize?client_id=440610325083979786&scope=bot

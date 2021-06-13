const { Client, Message, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'docs',
    aliases: ["discordjs"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.reply("Please specify a query!.");
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`

        const docFetch = await fetch(url);
        const embed = await docFetch.json();

        if(!embed || embed.error)
            message.reply(`Error handling query: ${query}.`)

        if(!message.guild) {
            return message.channel.send({embed})
        }

        const msg = await message.channel.send({embed})
    }


}

/*
Response {
  size: 0,
  timeout: 0,
  [Symbol(Body internals)]: {
    body: Gunzip {
      _writeState: [Uint32Array],
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 5,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      bytesWritten: 0,
      _handle: [Zlib],
      _outBuffer: <Buffer 7b 22 63 6f 6c 6f 72 22 3a 32 32 36 36 38 36 37 2c 22 61 75 74 68 6f 72 22 3a 7b 22 6e 61 6d 65 22 3a 22 44 69 73 63 6f 72 64 2e 6a 73 20 44 6f 63 73 ... 16334 more bytes>,
      _outOffset: 0,
      _chunkSize: 16384,
      _defaultFlushFlag: 2,
      _finishFlushFlag: 2,
      _defaultFullFlushFlag: 3,
      _info: undefined,
      _maxOutputLength: 4294967295,
      _level: -1,
      _strategy: 0,
      [Symbol(kCapture)]: false,
      [Symbol(kTransformState)]: [Object],
      [Symbol(kError)]: null
    },
    disturbed: false,
    error: null
  },
  [Symbol(Response internals)]: {
    url: 'https://djsdocs.sorta.moe/v2/embed?src=stable&q=message',
    status: 200,
    statusText: 'OK',
    headers: Headers { [Symbol(map)]: [Object: null prototype] },
    counter: 0
  }
}
*/
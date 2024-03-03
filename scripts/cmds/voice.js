const axios = require('axios');
const supportedIds = ["rachel", "drew", "clyde", "paul", "domi", "dave", "fin", "sarah", "antoni", "thomas", "charlie", "george", "emily", "elli", "callum", "patrick", "harry", "liam", "dorothy", "josh", "arnold", "charlotte", "alice", "matilda", "matthew", "james", "joseph", "jeremy", "michael", "ethan", "chris", "gigi", "freya", "brian", "grace", "daniel", "lily", "serena", "adam", "nicole", "bill", "jessie", "sam", "glinda", "giovanni", "mimi"];

module.exports = {
  config: {
    name: "voice",
    aliases:["v","🙂"], 
    version: "1.0",
    author: "Rishad | aesther",
    countDown: 5,
    role: 0,
    category: "Fun",
    ShortDescription: "Generate voice using AI",
    LongDescription: "Generates voice using an AI.",
    guide: {
      en: "{pn} (voice id) | texts\nExample: {pn} rachel | hey there\n{pn} list | Get the list of supported voice IDs \n➤ 𝗅𝖺 𝗅𝗂𝗌𝗍𝖾 𝖽𝖾𝗌 𝗇𝗈𝗆𝗌  : \n\n- 𝗋𝖺𝖼𝗁𝖾𝗅\n- 𝖽𝗋𝖾𝗐\n- 𝖼𝗅𝗒𝖽𝖾\n- 𝗉𝖺𝗎𝗅\n- 𝖽𝗈𝗆𝗂\n- 𝖽𝖺𝗏𝖾\n- 𝖿𝗂𝗇\n- 𝗌𝖺𝗋𝖺𝗁\n- 𝖺𝗇𝗍𝗈𝗇𝗂\n- 𝗍𝗁𝗈𝗆𝖺𝗌\n- 𝖼𝗁𝖺𝗋𝗅𝗂𝖾\n- 𝗀𝖾𝗈𝗋𝗀𝖾\n- 𝖾𝗆𝗂𝗅𝗒\n- 𝖾𝗅𝗅𝗂\n- 𝖼𝖺𝗅𝗅𝗎𝗆\n- 𝗉𝖺𝗍𝗋𝗂𝖼𝗄\n- 𝗁𝖺𝗋𝗋𝗒\n- 𝗅𝗂𝖺𝗆\n- 𝖽𝗈𝗋𝗈𝗍𝗁𝗒\n- 𝗃𝗈𝗌𝗁\n- 𝖺𝗋𝗇𝗈𝗅𝖽- 𝖼𝗁𝖺𝗋𝗅𝗈𝗍𝗍𝖾\n- 𝖺𝗅𝗂𝖼𝖾\n- 𝗆𝖺𝗍𝗂𝗅𝖽𝖺- 𝗆𝖺𝗍𝗍𝗁𝖾𝗐\n- 𝗃𝖺𝗆𝖾𝗌\n- 𝗃𝗈𝗌𝖾𝗉𝗁\n- 𝗃𝖾𝗋𝖾𝗆𝗒- 𝗆𝗂𝖼𝗁𝖺𝖾𝗅\n- 𝖾𝗍𝗁𝖺𝗇\n- 𝖼𝗁𝗋𝗂𝗌\n- 𝗀𝗂𝗀𝗂\n- 𝖿𝗋𝖾𝗒𝖺\n- 𝖻𝗋𝗂𝖺𝗇\n- 𝗀𝗋𝖺𝖼𝖾\n- 𝖽𝖺𝗇𝗂𝖾𝗅\n- 𝗅𝗂𝗅𝗒\n- 𝗌𝖾𝗋𝖾𝗇𝖺\n- 𝖺𝖽𝖺𝗆\n- 𝗇𝗂𝖼𝗈𝗅𝖾\n- 𝖻𝗂𝗅𝗅\n- 𝗃𝖾𝗌𝗌𝗂𝖾\n- 𝗌𝖺𝗆\n- 𝗀𝗅𝗂𝗇𝖽𝖺\n- 𝗀𝗂𝗈𝗏𝖺𝗇𝗇𝗂\n- 𝗆𝗂𝗆𝗂 \n🌱𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉𝘷2🌱 "}
  },

  onStart: async function ({ api, args, message, event }) {
    const { getPrefix, getStreamFromURL } = global.utils;
    const p = getPrefix(event.threadID);

    const command = args.join(" ").split("|");
    if (command.length !== 2) {
      if (args[0].toLowerCase() === 'list') {
        return api.sendMessage(`Supported voice IDs are:\n ${supportedIds.join("\n")}`, event.threadID, event.messageID);
      }
      return message.reply(`❌Invalid command format. Use it like this:\n${p}voice rachel | Hey there`);
    }

    const voiceId = command[0].trim().toLowerCase();
    const text = command[1].trim();

    if (!supportedIds.includes(voiceId)) {
      return message.reply(`❌Invalid voice ID. Supported IDs are:\n ${supportedIds.join("\n")}`);
    }

    const apiKey = 'fuck';
    const apiUrl = `https://for-devs.onrender.com/api/voice?text=${encodeURIComponent(text)}&voiceid=${voiceId}&apikey=${apiKey}`;

    try {
      const voiceStream = await getStreamFromURL(apiUrl);

      if (voiceStream) {
        return api.sendMessage({ attachment: voiceStream }, event.threadID, event.messageID);
      } else {
        return api.sendMessage('Failed to generate voice.', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage('Failed to generate voice.', event.threadID, event.messageID);
    }
  }
};

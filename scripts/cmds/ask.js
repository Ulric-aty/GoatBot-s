const axios = require('axios');

const fonts = {

    mathsans: {

        a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i",

        j: "j", k: "k", l: "l", m: "m", n: "n", o: "o", p: "p", q: "q", r: "r",

        s: "s", t: "t", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z",

        A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "G", H: "H", I: "I",

        J: "J", K: "K", L: "L", M: "M", N: "N", O: "O", P: "P", Q: "Q", R: "R",

        S: "S", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z",
    }
};

const Prefixes = [
  'ae',
  'ai',
  'mitama',
  'ask',
  'anja', 
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "𝗚-Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("♡   ∩_∩\n    （„• ֊ •„)♡:\n𝗣𝗙》[!]\n 𝘼𝘦𝘴𝘵𝘩𝘦𝘳-[📩]?");
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = `♡   ∩_∩\n    （„• ֊ •„)♡\n┏━∪∪━━━━ღ❦ღ┓\n🌐[${response.data.answer}] ♡\n♡   𝘢𝘦𝘴𝘵𝘩𝘦𝘳-[📩]\n┗ღ❦ღ━━━━━━━┛\n[✦]|〚${senderName}〛`;

      //apply const font to each letter in the answer
      let formattedAnswer = "";
      for (let letter of answer) {
        formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
      }

      await message.reply(formattedAnswer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};

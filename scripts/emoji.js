// original bank
var bankBig = '😀 😁 😂 😃 😄 😅 😆 😇 😈 😉 😊 😋 😌 😍 😎 😏 😜 😝 ☝️ ☠️ ☁️ ⚱️ ⛄ ⛅ ✈️ ✊ ✋ ✌️ ✍️ ❤️ 🌍 🌎 🌏 💩 🌚 🌓 🌕 🌝 🌤️ 🌥️ 🌭 🌮 🌯 🌳 🍉 🍊 🍈 🍍 🍏 🍐 🍔 🍕 🍞 🍟 🍩 🍯 🍰 🍳 🍷 🍸 🍹 🍺 🍿 🎈 🎾 🏄 🏆 🏇 🐓 🐖 🐘 🐙 🐛 🐝 🐟 🐠 🐡 🐣 🐥 🐨 🐬 🐮 🐯 🐰 🐱 🐴 🐶 🐷 🐹 🐻 🐼 👆 👇 👈 👉 👊 👋 👌 👍 👎 👏 👰 👾 👻 💀 💙 💚 💛 💜 💟 💬 💾 💰 📓 🔮 🖤 🖕 🖖 🙅 🙆 🙌 🙈 🙉 🙊 🙏 🚜 🚲 🛌 🚽 🤘 🤙 🤚 🤛 🤜 🤝 🤞 🥐 🥑 🥒 🥕 🥖 🥝 🥞 🦁 🦄 🦆 🦈 🦉 🦊 🦋 🦌 🦍 🦏 🤖';

// small bank
var bankSmall = '😀 😁 😂 😃 🍍 🍏 🍐 🍔 🍕 🍞 🍟 🍺 🍿 😋 🖕 😍 😎 🍷 😜 😝 ☝️ ☠️ ☁️ ⚱️ ⛄ ⛅ ✈️ ✊ 💾 ✌️ ✍️ ❤️ 🌍 💩 🌚 🥑 🦁 🦄 🌮 🦊';

// smaller bank
var bankSmaller = '💩 🌚 🌚 💩 🌚 🦁 🥑 🌏 ✊ 😝 🍺 🍐';

var bank = bankSmall;
var emoji = bank.split(" ");

function randomEmoji(){
  return emoji[Math.floor(Math.random()*emoji.length)];
}

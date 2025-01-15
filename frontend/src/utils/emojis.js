export const funEmojis = [
    "😄", "😂", "🤣", "😜", "😝", "🤪", "😎", "🤩", "🥳", "😏",
    "😈", "👹", "👺", "💀", "☠", "🤡", "👻", "🎃", "🕸", "🦇",
    "💩", "🤡", "🦄", "🐉", "🐲", "🧚‍♀", "🧞‍♂", "🧙‍♂", "🧝‍♀", "🧜‍♂",
    "🌈", "🦋", "🌟", "✨", "🎆", "🎇", "🌠", "🌌", "🌍", "🌎",
    "🌏", "🍕", "🍔", "🌮", "🍣", "🍦", "🍩", "🍿", "🍪", "🍫",
    "🍭", "🍬", "🍉", "🍊", "🍓", "🍍", "🍇", "🍈", "🍋", "🥑",
    "🍒", "🍑", "🍏", "🍎", "🍊", "🍌", "🥥", "🍍", "🥝", "🍉",
    "🦄", "🤖", "👾", "🦑", "🦋", "🐙", "🐬", "🦓", "🦒", "🐘",
    "🐱", "🐶", "🐷", "🐒", "🐩", "🐾", "🐦", "🦚", "🦜", "🦢",
    "🦔", "🦦", "🐇", "🦡", "🦋", "🐞", "🦗", "🕷", "🦠", "🦪",
    "🦦", "🦄", "🦈", "🦓", "🦒", "🦞", "🐙", "🦑", "🐚", "🦣"
  ];  

export const getRandomEmoji =()=>{
    //basically generate a random value that can cover the whole list and return that position's emoji to the frontend
    return funEmojis[Math.floor(Math.random() * funEmojis.length)]
}


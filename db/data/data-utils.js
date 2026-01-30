const EMOJIS = [
  "😀",
  "🚀",
  "🎉",
  "🔥",
  "🐱",
  "🌮",
  "😂",
  "😍",
  "😎",
  "🤔",
  "😭",
  "🥳",
  "🐶",
  "🦄",
  "🐙",
  "🦕",
  "🌵",
  "🌈",
  "🍕",
  "🍔",
  "🍩",
  "🍺",
  "☕",
  "🥑",
  "⚽",
];

function generateEmojiData(numOfRows) {
  const data = [];

  for (let i = 0; i < numOfRows; i++) {
    const record = {
      emoji_id: i + 1,
      emoji: EMOJIS[i % EMOJIS.length],
    };
    data.push(record);
  }

  return data;
}

function generateEmojiArticleUser(numOfRows, maxEmojiId) {
  const data = [];

  for (let i = 0; i < numOfRows; i++) {
    const record = {
      emoji_article_user_id: i + 1,
      emoji_id: Math.floor(Math.random() * maxEmojiId) + 1,
      username: `user_${i + 1}`,
      article_id: i + 1,
    };
    data.push(record);
  }

  return data;
}

console.log(generateEmojiArticleUser(25, 25));

module.exports = { generateEmojiData, generateEmojiArticleUser };

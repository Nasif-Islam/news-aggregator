const fs = require("fs");
const path = require("path");

const COUNTS = {
  USERS: 10,
  ARTICLES: 20,
  TOPICS: 5,
  EMOJIS: 25,

  GENERATE_VOTES: 20,
  GENERATE_REACTIONS: 5,
  GENERATE_USER_TOPICS: 10,
};

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

function generateTestEmojiData(numOfRows) {
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

function generateTestEmojiArticleUserData(
  numOfRows,
  totalUsers,
  totalArticles,
  maxEmojiId,
) {
  const data = [];

  for (let i = 0; i < numOfRows; i++) {
    const randomUserId = Math.floor(Math.random() * totalUsers) + 1;
    const randomArticleId = Math.floor(Math.random() * totalArticles) + 1;
    const randomEmojiId = Math.floor(Math.random() * maxEmojiId) + 1;

    data.push({
      emoji_article_user_id: i + 1,
      emoji_id: randomEmojiId,
      username: `user_${randomUserId}`,
      article_id: randomArticleId,
    });
  }

  return data;
}

function generateTestUserTopicData(numOfRows, totalUsers, totalTopics) {
  const data = [];

  for (let i = 0; i < numOfRows; i++) {
    const userId = (i % totalUsers) + 1;
    const topicId = (i % totalTopics) + 1;

    data.push({
      user_topic_id: i + 1,
      username: `user_${userId}`,
      topic: `topic_${topicId}`,
    });
  }

  return data;
}

function generateTestUserArticleVotes(numOfRows, totalUsers, totalArticles) {
  const data = [];

  for (let i = 0; i < numOfRows; i++) {
    const min = -50;
    const max = 50;
    const randomVoteCount = Math.floor(Math.random() * (max - min + 1) + min);
    const randomArticleId = Math.floor(Math.random() * totalArticles) + 1;
    const randomUserId = Math.floor(Math.random() * totalUsers) + 1;

    data.push({
      user_article_votes_id: i + 1,
      username: `user_${randomUserId}`,
      article_id: randomArticleId,
      vote_count: randomVoteCount,
    });
  }

  return data;
}

function saveDataToFile(fileName, data) {
  const outputDir = path.join(__dirname, "test-data");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, fileName);

  const fileContent = `module.exports = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(filePath, fileContent);

  return 1;
}

if (require.main === module) {
  const emojis = generateTestEmojiData(COUNTS.EMOJIS);

  saveDataToFile("emojis.js", emojis);

  const reactions = generateTestEmojiArticleUserData(
    COUNTS.GENERATE_REACTIONS,
    COUNTS.USERS,
    COUNTS.ARTICLES,
    COUNTS.EMOJIS,
  );

  saveDataToFile("emoji_article_user.js", reactions);

  const userTopic = generateTestUserTopicData(
    COUNTS.GENERATE_USER_TOPICS,
    COUNTS.USERS,
    COUNTS.TOPICS,
  );

  saveDataToFile("user_topic.js", userTopic);

  const userArticleVotes = generateTestUserArticleVotes(
    COUNTS.GENERATE_VOTES,
    COUNTS.USERS,
    COUNTS.ARTICLES,
  );

  saveDataToFile("user_article_votes.js", userArticleVotes);
}

module.exports = {
  generateTestEmojiData,
  generateTestEmojiArticleUserData,
  generateTestUserTopicData,
  generateTestUserArticleVotes,
  saveDataToFile,
};

const db = require("../connection");

const seed = async ({ topicData, userData, articleData, commentData }) => {
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  const usersTablePromise = db.query(`
    CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      avatar_url VARCHAR(255) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Default_pfp.svg'
    );
    `);

  const topicsTablePromise = db.query(`
    CREATE TABLE topics (
      slug VARCHAR(255) PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg'
    );
    `);

  await Promise.all([usersTablePromise, topicsTablePromise]);

  await db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      topic VARCHAR(255) NOT NULL REFERENCES topics(slug),
      author VARCHAR(255) NOT NULL REFERENCES users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      votes INT DEFAULT 0,
      article_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
    );
    `);

  await db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR NOT NULL REFERENCES users(username),
      created_at TIMESTAMP DEFAULT NOW()
    );
      `);
};

module.exports = seed;

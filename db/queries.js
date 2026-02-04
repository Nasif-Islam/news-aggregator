const db = require("./connection");

async function logQueryResults(promise) {
  try {
    const data = await promise;
    console.log(data);
  } catch (err) {
    console.log(err);
  } finally {
    db.end();
  }
}

async function getUsers() {
  const res = await db.query(`
        SELECT username FROM users;
        `);

  return res.rows;
}

// logQueryResults(getUsers());

async function getArticlesForATopic(topic) {
  const res = await db.query(`SELECT title FROM articles WHERE topic = $1';`, [
    topic,
  ]);

  return res.rows;
}

// logQueryResults(getArticlesForATopic());

async function getComments(noOfVotes, operator) {
  const operators = ["=", ">", "<", ">=", "<=", "!=", "<>"];
  if (!operators.includes(operator)) return [];

  const res = await db.query(
    `SELECT * FROM comments WHERE votes ${operator} $1;`,
    [noOfVotes],
  );

  return res.rows;
}

// logQueryResults(getComments(0, "<")); // negative comments

async function getAllTopics() {
  const res = await db.query(`
    SELECT * FROM topics;
    `);

  return res.rows;
}

// logQueryResults(getAllTopics());

async function getArticlesByUser(username) {
  const res = await db.query(
    `
    SELECT * FROM articles WHERE author = $1;
    `,
    [username],
  );

  return res.rows;
}

// logQueryResults(getArticlesByUser("grumpy19"));

logQueryResults(getComments(10, ">")); // negative comments

const db = require("../db/connection");

exports.fetchArticles = async () => {
  const queryStr = `
    SELECT
      a.article_id, 
      a.title, 
      a.topic, 
      a.author, 
      a.created_at, 
      a.votes,
      a.article_img_url,
      COUNT(c.comment_id)::INT AS comment_count
    FROM
      articles AS a
    LEFT JOIN
      comments AS c ON a.article_id = c.article_id
    GROUP BY a.article_id
    ORDER BY a.created_at DESC
  `;

  const { rows } = await db.query(queryStr);
  return rows;
};

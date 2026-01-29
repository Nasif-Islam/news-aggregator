exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };

  return { ...otherProperties, created_at: new Date(created_at) };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments
    .map((comment) => {
      const { article_title, created_at, ...restOfComment } = comment;

      const article_id = idLookup[article_title];

      // handle comments that don't have associated articles
      if (article_id === undefined) {
        return null;
      }

      return {
        article_id,
        created_at: new Date(created_at),
        ...restOfComment,
      };
    })
    .filter((comment) => comment !== null);
};

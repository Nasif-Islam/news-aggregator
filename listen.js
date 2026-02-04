const app = require("./app");
const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Failed to start server:", err);
  } else {
    console.log(`Sever is listening on port ${PORT}`);
  }
});

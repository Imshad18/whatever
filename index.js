const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username } = req.body;

  // Password is ignored entirely
  if (username === "admin") {
    res.send("Welcome admin! FLAG{no_password_needed}");
  } else {
    res.send("Invalid user");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

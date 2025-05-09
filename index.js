const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Route for CTF 1
app.get("/", (req, res) => {
  res.send(`
    <h2>Login - CTF 1</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" /><br/>
      <button type="submit">Login</button>
    </form>
    <p><a href="/ctf2">Next Page (CTF 2)</a></p>
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

// Route for CTF 2 - Flawed login with case-insensitive username comparison
app.get("/ctf2", (req, res) => {
  res.send(`
    <h2>Login - CTF 2</h2>
    <p>Hint: The username might not be case-sensitive...</p>
    <form method="POST" action="/ctf2">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
    <p><a href="/">Back to CTF 1</a></p>
  `);
});

app.post("/ctf2", (req, res) => {
  const { username, password } = req.body;
  // Flaw: Case-insensitive username comparison
  if (username.toLowerCase() === "hacker" && password === "letmein") {
    res.send("Access granted! FLAG{case_insensitive_vuln}");
  } else {
    res.send("Invalid username or password");
  }
});

// Catch-all for 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

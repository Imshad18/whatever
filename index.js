const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Route for CTF 1
app.get("/ctf1", (req, res) => {
  res.send(`
    <h2>Login - CTF 1</h2>
    <p>Can you login</p>
    <form method="POST" action="/ctf1">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" /><br/>
      <button type="submit">Login</button>
    </form>
    <p><a href="/ctf2">Next Page (CTF 2)</a></p>
  `);
});

app.post("/ctf1", (req, res) => {
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
    <p>Login as Admin. Case matters.</p>
    <form method="POST" action="/ctf2">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/ctf2", (req, res) => {
  const { username, password } = req.body;

  if (username.toLowerCase() === "admin" && password === "Admin") {
    res.send("Welcome Admin! FLAG{case_sensitivity_is_real}");
  } else {
    res.send("Access Denied");
  }
});

// Catch-all for 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

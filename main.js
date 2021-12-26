const express = require("express");
const fs = require("fs");
const session = require("express-session")

const checkAuth = require("./middlewares/checkAuth")

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('landingPage');
})

app.route('/login').get(function (req, res) {
    res.render("login", { error: "" });
})
    .post(function (req, res) {
        const { username, password } = req.body;

        fs.readFile("./db.txt", "utf-8", (err, data) => {
            if (err) {
                res.render("login", { error: "something went terribly wrong" })
                return;
            }
            let users = [];
            if (data.length > 0 && data[0] === "[" && data[data.length - 1] === "]") {
                users = JSON.parse(data);
            }
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                if (user.username === username) {
                    req.session.user = user;
                    req.session.is_logged_in = true;
                    res.redirect("/home");
                    return;
                }
            }
            res.render("login", { error: "user not found :(" })
        })
    });

app.route('/signup').get((req, res) => {
    res.render("signup", { error: "" });
})
    .post((req, res) => {
        const { name, username, mobile, email, password } = req.body;
        const user = { name, username, mobile, email, password };

        fs.readFile("./db.txt", 'utf-8', (err, data) => {
            if (err) {
                res.render("signup", { error: "something went horribly wrong" });
                return;
            }
            let users = [];
            if (data.length > 0 && data[0] === '[' && data[data.length - 1]) {
                users = JSON.parse(data);
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === user.username) {
                    res.render("signup", { error: "user already exist" });
                    return;
                }
            }
            users.push(user);

            fs.writeFile("./db.txt", JSON.stringify(users), (err) => {
                if (err) {
                    res.render("signup", { error: "ERRROORRRR" });
                    return;
                }
                req.session.user = user;
                req.session.is_logged_in = true;
                res.redirect("/home")
            })
        })
    });

app.get("/home", checkAuth, function (req, res) {
    res.render("home", { user: req.session.user })
})

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



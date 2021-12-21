const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["ABC", "DEF", "CCC"];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {

    const today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { theDay: day, newListItem: items });
});

app.post("/", function(req, res) {
    const todoList1 = req.body.todoList;
    items.push(todoList1);
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
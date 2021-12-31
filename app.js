//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

/* const items = ["ABC", "DEF", "CCC"];
const workItems = [];
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

/* 1 field name: string */

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Item = mongoose.model("Item", itemSchema);

const run = new Item({
    name: "Run and have fun.",
    time: 30,
    speed: 15,
    caloriesBurn: 500
});

/* run.save(); */

const swim = new Item({
    name: "Swim and have fun.",
    time: 20,
    speed: 10,
    caloriesBurn: 800
});

const boxing = new Item({
    name: "Boxing and have fun.",
    time: 60,
    speed: 0,
    caloriesBurn: 1000
});

const defaultItems = [run, swim, boxing];


app.get("/", function(req, res) {

    Item.find({}, function(err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved all new items.");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", newListItem: foundItems });
        }
    });
});

app.get("/:customListName", function(req, res) {

});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    });

    item.save();

    res.redirect("/");

});

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, function(err) {
        if (!err) {
            console.log("Successfully delete item.");
        }
    });
    res.redirect("/");
});

app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
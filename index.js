import http from "http";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import {
  addNote,
  getNotes,
  removeItem,
  updateItem,
} from "./node.controller.js";
import express from "express";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url); 

const __dirname = path.dirname(__filename); 

const basePath = path.join(__dirname, "pages");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "pages"));

app.use(express.static(path.resolve(__dirname, "public")));



app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home",
    notes: await getNotes(),
    flag: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "app",
    notes: await getNotes(),
    flag: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeItem(req.params.id);
  res.render("index", {
    title: "delete",
    notes: await getNotes(),
    flag: false,
  });
});

app.put("/:id", async (req, res) => {
  const newNotes = await updateItem(req.params.id, req.body.title);

  res.render("index", {
    title: "updated app",
    notes: newNotes,
    flag: true,
  });
});

app.listen(port, () => {
  console.log(chalk.green("server has been started..."));
});

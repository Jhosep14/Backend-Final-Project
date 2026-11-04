import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";

const app = express();

const currentDir = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(currentDir, "views"))
app.use(express.static(path.join(currentDir, "../../public")))



app.get("/", (req, res) => {
    res.render("home", {
        title: 'Home Page',
        description: 'Welcome to our website!'
    });
})

export default app;
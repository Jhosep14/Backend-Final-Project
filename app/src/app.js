import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import bookRoutes from "./routes/bookRoutes.js";
import classRoutes from "./routes/classesRoutes.js";

const app = express();

const currentDir = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(currentDir, "views"));

// Routing files
app.use(express.static(path.join(currentDir, "../../public")));
app.use("/book", bookRoutes);
app.use("/classes", classRoutes);

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("home", {
        title: 'Home Page',
        description: 'Welcome to our website!'
    });
});

export default app;
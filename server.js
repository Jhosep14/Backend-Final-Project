import app from "./app/src/app.js";

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", (error) => {
  if (error) {
    console.error("Could not start the server:", error);
    process.exitCode = 1;
    return;
  }

  console.log(`Server running at http://localhost:${port}`);
});
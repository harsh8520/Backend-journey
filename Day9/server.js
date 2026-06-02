import app from "./src/app.js";
import"dotenv/config";
import connectToDB from "./src/db/db.js";

connectToDB()

const port = 3000

app.listen(port, () => {
    console.log("Server running at " + port);
})
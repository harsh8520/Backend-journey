import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/db/db.js";

await connectToDB();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
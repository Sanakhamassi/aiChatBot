import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connections and lisners 
const PORT = process.env.PORT || 5000
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log("server lisents on", PORT))

}).catch((err) => console.log(err)
)



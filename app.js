const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adsRouter = require("./routes/adsRouter");
const annRouter = require("./routes/annRouter");
const app = express();
dotenv.config({ path: "./config/config.env" });
console.log(process.env.PORT);
app.use(express.json());
app.use(cors());

/*                                      Mongoose Connection
 */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    console.log("Connected to DB successfully");
    app.listen(process.env.PORT, () =>
      console.log("server is working on port", process.env.PORT)
    );
  })
  .catch((err) => {
    console.log(err);
  });

/*                                       Advertisement for petAdoption
 */
app.use("/advertisements", adsRouter);

/*                                       Announcement for petAdoption
 */
app.use("/announcements", annRouter);

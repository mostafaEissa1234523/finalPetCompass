const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adsRouter = require("./routes/adsRouter");
const annRouter = require("./routes/annRouter");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
                                    Stripe
*/
//const stripe = require('stripe')('sk_test_51KCmcxGOYe92SthFck4vXXgGKlyahgdcSaqtmATfieW9BObmq0YqGkf3Zli44kQuNx9rnFIRd0yBZ12osxDST86000MZG5HCtu');
// app.post('/payment', function(req, res){
//     stripe.customers.create({
//         email: '',
//         source: '',
//         name: '',
//         address: {
//             line1: '',
//             postal_code: '',
//             city: '',
//             state: '',
//             country: '',
//         }
//     })
//     .then((customer) => {
//         return stripe.charges.create({
//             amount: '',
//             description: '',
//             currency: '',
//             customer: ''
//         });
//     })
//     .then((charge) => {
//         res.send("Success") // If no error occurs
//     })
//     .catch((err) => {
//         res.send(err)    // If some error occurs
//     });

// const paymentMethod = stripe.paymentMethods
//   .create({
//     type: "card",
//     card: {
//       number: "4242424242424242",
//       exp_month: 12,
//       exp_year: 2022,
//       cvc: "314"
//     }
//   })
//   .then((result) => {
//     console.log(result);
//     res.send(result);
//   });
// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

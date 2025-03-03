const express = require("express");
const router = express.Router();
const {
  dem,
  incrementClock,
  updateClock,
  logicalTime,
} = require("../communicate");

const validateData = (req) => {
  let total = 0;
  // Check userName, subTotal, and date data types.
  if (
    !req.body ||
    !req.body.userName ||
    typeof req.body.userName !== "string" ||
    !req.body.subTotal ||
    typeof req.body.subTotal !== "number" ||
    req.body.subTotal < 0 ||
    !req.body.date ||
    typeof req.body.date !== "string" ||
    !req.body.items
  ) {
    return false;
  }
  // Check items in the cart
  for (let i = 0; i < req.body.items.length; i++) {
    if (
      !req.body.items[i].name ||
      !req.body.items[i].price ||
      !req.body.items[i].qty ||
      !req.body.items[i].size ||
      typeof req.body.items[i].name !== "string" ||
      typeof req.body.items[i].size !== "string" ||
      typeof req.body.items[i].qty !== "number" ||
      typeof req.body.items[i].price !== "number" ||
      req.body.items[i].qty < 0 ||
      req.body.items[i].price < 0
    ) {
      return false;
    }
    let itemTotal = req.body.items[i].qty * req.body.items[i].price;
    total += itemTotal;
  }

  // If total of items in the cart not equal to subtotal, invalid request.
  if (total !== req.body.subTotal) return false;
  return true;
};

// check if items are available
router.post("/", async (req, res) => {
  console.log(
    "Client has requested orders \n /api/items from: ",
    req.headers.referer
  );

  // Data validation
  if (!validateData(req)) {
    res.status(418).send({ message: "Invalid data!" });
    return;
  }

  // arrray to store items that are out of stock
  const outOfStockItems = {};

  // loop through each item in the request body
  for (const item of req.body.items) {
    const name = item.name;
    const size = item.size;
    const qty = item.qty;
    // query the database to get the qty of the item
    let sql = `
      SELECT size, qty
      FROM item_sizes
      WHERE item_id = (
        SELECT id
        FROM items
        WHERE name = '${item.name}'
      ) AND size = '${item.size}';
    `;

    // wait for the query to finish
    const { db } = require("../connect");
    await new Promise((resolve, reject) => {
      db.all(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // no error
          // if the item is found in the database
          if (results.length > 0) {
            console.log("item found and no error!");
            console.log(results); // print out the results

            // Increment logical clock for every request
            let timestamp = incrementClock();
            console.log("Logical Time is: " + timestamp);

            // if the qty of the item is greater than or equal to the qty in the request body
            // timestamp is date of query, update is the query
            if (results[0].qty >= item.qty) {
              console.log("item is available");
              let update = `
                UPDATE item_sizes
                SET qty = (qty - ${qty})
                WHERE item_id = (
                  SELECT id
                  FROM items
                  WHERE name = '${name}'
                ) AND size = '${size}';
              `;

              // concatenate timestmap with the query.
              let msg = `${timestamp}|${update}`;

              // publish action to other servers
              dem.publish("global", msg);

              db.run(update, (err, result) => {
                if (err) throw err;
              });
              resolve();
            }
            // if the qty of the item is less than the qty in the request body
            else {
              console.log("item not available");
              outOfStockItems[item.name + item.size] = results[0].qty;
              resolve();
            }
          }
          // if the item is not found in the database
          else {
            console.log("item not found but no error");
            reject("Item is not available");
          }
        }
      });
    });
  }

  // if there are items that are out of stock
  if (Object.keys(outOfStockItems).length > 0) {
    console.log("out of stock items below");
    console.log(outOfStockItems);
    res.status(269).json(outOfStockItems);

    // if all items are available
  } else {
    console.log(req.body);
    res.status(200).json({ message: "All items are available" });
  }
});

module.exports = router;

const express = require("express");
const app = express();
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")

let dbPath = path.join(__dirname,"mydatabase.db")
let db = null;
const initilizeDatabase = async () => {
   try {
     db = await open({
      filename : dbPath,
      driver : sqlite3.Database
     })
     app.listen(3000, () => (
      console.log("server is running on port 3000")
     ))
   } catch (error) {
      console.log(`db error ${error.message}`)
      process.exit(1)
   }
}

initilizeDatabase()

app.get("/products/", async (request, response) => {
    const {search_q = "",offset=0,limit = 10} = request.query
    const sqlQuery = `
     select
     *
     from
     products
     where
     title like "%${search_q}%" OR
     description like "%${search_q}%" OR
     price <= CAST("${search_q}" AS INTEGER)
     limit ${limit}
     offset ${offset}
    `
    const data = await db.all(sqlQuery)
    response.send(data)
});

app.get("/products/:month/", async (request, response) => {
    const {month} = request.params
    const sqlQuery = `
    select
    *
    from 
    products
    where
   CAST(strftime("%m", date_of_sale) as INTEGER) = 4
    `
    const data = await db.all(sqlQuery)
    response.send(data)
    
})



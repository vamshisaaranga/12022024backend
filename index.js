const express = require("express");
const http = require("http")
const app = express();
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const cors = require("cors")
app.use(cors());
const server = http.createServer(app)

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
    const {search_q = ""} = request.query
    const sqlQuery = `
     select
     *
     from
     products
     where
     title like "%${search_q}%" OR
     description like "%${search_q}%" OR
     category like "%${search_q}%" OR
     price <= CAST("${search_q}" AS INTEGER)
    `
    const data = await db.all(sqlQuery)
    response.send(data)
});





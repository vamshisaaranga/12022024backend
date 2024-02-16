const sqlite3 = require("sqlite3").verbose()
let sql;

const db = new sqlite3.Database("./mydatabase.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err){
        return console.log(console.err.message)
    }
})

/*const getDataFromApi = async () => {
    const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    const options = {
        method : "GET"
    }
    const response = await fetch(url,options)
    const data = await response.json()
    const changedData = data.map((each) => ({
        id : each.id,
        title : each.title,
        price : each.price,
        description : each.description,
        category : each.category,
        image : each.image,
        sold : each.sold,
        dateOfSale : new Date (each.dateOfSale)

    }))
    sql = `INSERT INTO products(id, title, price , description, category, image, sold, date_of_sale) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

changedData.map((each) => (
    db.run(sql,[`${each.id}`, `"${each.title}"`, `${each.price}`, `"${each.description}"`, `"${each.category}"`, `"${each.image}"`, `${each.sold}` , `${each.dateOfSale}`], (err) => {
        if (err){
            return console.log(err.message)
        }
    })
))
}

getDataFromApi()*/



//sql = `CREATE TABLE products(id INTEGER PRIMARY KEY, title VARCHAR(250), price INTEGER,  description VARCHAR(250), category VARCHAR(250), image VARCHAR(250), sold BOOLEAN, date_of_sale DATETIME)`

//db.run(sql);

//db.run(`DROP TABLE products`)


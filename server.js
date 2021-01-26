const { Client } = require('pg')
const express = require("express")

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '****',
    port: 5433,
})

client.connect()

app.delete("/attendees", (req, resp) => {
    console.log("In /attendees DELETE");
    resp.write("Please add the id at the path, eg attendees/21, in order to delet the id=21");
    resp.end();
});

app.delete("/attendees/:id", (req, resp) => {
    console.log("In /attendees DELETE");

    const myQuery = {
        text: "DELETE FROM attendees WHERE id = $1",
        values: [req.params.id]
    }

    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
});

app.post("/attendees", (req, resp) => {
    console.log("In /attendeess POST"); 

    const myQuery = {
        text: "INSERT INTO attendees (firstname, lastname, email, phoneno) VALUES ($1, $2, $3, $4)",
        values: [req.body.firstname, req.body.lastname, req.body.email, req.body.phonenonode]
    }

    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
})

function insertFromAPIEndpoint(req, resp) {

    console.log("In /attendeess PUT using the POST (workaround)");


    // req.body.id
    const myQuery = {
        text: "UPDATE attendees SET firstname = $2, lastname = $4, email = $5, phoneno = $3 WHERE id = $1",
        values: [req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.phoneno]
    }

    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
}

app.post("/attendees/PUT/", insertFromAPIEndpoint)

app.put("/attendees", insertFromAPIEndpoint)

app.get("/attendees", (req, resp) => {
    let filterName = req.query.name ? req.query.name : "";
    console.log(filterName);
    const myQuery = {
        text: "SELECT * FROM attendees WHERE UPPER(firstname) LIKE UPPER($1)",
        values: ["%" + filterName + "%"]
    }


    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify(resuits.rows));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
});

app.get("/attendees/DELETE/:id", (req, resp) => {
    console.log("In /attendees/DELETE using GET");

    const myQuery = {
        text: "DELETE FROM attendees WHERE id = $1",
        values: [req.params.id]
    }

    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
});


app.get("/", (req, resp) => {
    resp.write("In GET /");
    resp.end();
})

const port = 3000;
app.listen(port, () => { console.log("Server started and listening to port " + port) });
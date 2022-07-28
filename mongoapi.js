import { MongoClient } from "mongodb"
import { uri, dbName } from "./dbsecrets.js"
const client = new MongoClient(uri)
const db = client.db("sample_mflix")
const movieCollection = db.collection("movies")

import express from 'express'
import cors from 'cors'
const app = express()
const port = 4001 
app.use(cors())       // allow anyone to access this api
app.use(express.json());  // allow a POST with JSON


// if you go to http://localhost:4001/
app.get("/", (req, res) => {
    res.status(200).send('Hello World')
})

// if you go to http://localhost:4001/movies
app.get("/movies", (req, res) => {

    const query = {}  /// finds a specified movie. in this case, finds *every* movis
    console.log(movieCollection.countDocuments(query))
    movieCollection.find(query).limit(10).toArray((err, movies) => {      // movieCollection.find(movie).limit(10 max).toArray((return error, or return movies))
        console.log('im here')
        res.status(200).json(movies)

    })

})

app.post('/movie', (req, res) => {            /// adding a movie
    const newMovie = req.body
    movieCollection.insertOne(newMovie,(err, results) =>{
        if (err) {
            res.status(500).json({error:true})
        } else {
            res.status(201).json(results)
        }
    })
})      



app.listen(port, () => {
    console.log('ready on http://localhost:'+port)
})

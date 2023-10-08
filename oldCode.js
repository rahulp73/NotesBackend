app.post('/notes',(req,res)=>{
    console.log(req.body)
    client.connect()
    db = client.db('keep').collection('notes')
    console.log('Connected To Keep')
    const notes = db.find({userId : (req.body.id)}).toArray().then(notes => {
        console.log(notes)
        res.contentType('application/json')
        res.send(JSON.stringify(notes))
    })
})
app.post('/deletedNotes',(req,res)=>{
    client.connect()
    db = client.db('keep').collection('deletedNotes')
    const delNotes = db.find({userId : (req.body.id)}).toArray().then(delNotes => {
        console.log(delNotes)
        res.contentType('application/json')
        res.send(JSON.stringify(delNotes))
    })
})
app.post('/newNote',(req,res)=>{
    console.log(req.body)
    client.connect()
    db = client.db('keep').collection('notes')
    db.insertOne(req.body).then(results => {
        console.log(results)
        db.find({userId : (req.body.userId)}).toArray().then(notes => {
            console.log(notes)
            res.contentType('application/json')
            res.send(JSON.stringify(notes))
        })
    })
})
app.delete('/deleteNote',(req,res)=>{
    var Note;
    console.log(req.body)
    client.connect()
    db=client.db('keep').collection('notes')
    db1=client.db('keep').collection('deletedNotes')
    db.find({_id : new ObjectId(req.body.id)}).toArray().then(results => {
        try{
            db1.insertOne(results[0]).then(results => {
                console.log(results)
            })
        }
        catch(err){
            console.log(err)
        }
        db.deleteOne(results[0]).then(results=>console.log(results))
    })
    res.status(200).send("Successful")
})
app.delete('/trashNote',(req,res)=>{
    client.connect()
    db=client.db('keep').collection('deletedNotes')
    db.find({userId : new ObjectId(req.body.id)}).toArray().then(results => {
        db.deleteOne(results[0]).then(results=>console.log(results))
    })
    res.status(200).send("Successful")
})
app.post('/restoreNote',(req,res)=>{
    client.connect()
    db=client.db('keep').collection('notes')
    db1=client.db('keep').collection('deletedNotes')
    db1.find({_id : new ObjectId(req.body.id)}).toArray().then(results => {
        try{
            db.insertOne(results[0]).then(results => {
                console.log(results)
            })
        }
        catch(err){
            console.log(err)
        }
        db1.deleteOne(results[0]).then(results=>console.log(results))
    })
    res.status(200).send("Successful")
})
app.put('/updateNote',(req,res)=>{
    console.log(req.body)
    client.connect()
    db=client.db('keep').collection('notes')
    db.updateOne({_id: new ObjectId(req.body.id)},{$set : {note : req.body.note}}).then((results) => {
        console.log(results)
        db.find().toArray().then(notes => {
            console.log(notes)
            res.contentType('application/json')
            res.status(200).send(JSON.stringify(notes))
        })
    })
})
app.post('/signin',(req,res)=>{
    console.log(req.body)
    client.connect()
    db=client.db('keep').collection('users')
    db.find({userName : req.body.userName}).toArray().then(results => {
        console.log(results)
        if(results.length > 0 && bcrypt.compare(req.body.password, results[0].password)){
            res.send(JSON.stringify({"status" : 200, "body":results[0]._id,"name" : results[0].name}))
        } else {
            res.send(JSON.stringify({"status" : 404}))
        }
    })
})
app.post('/signup', (req,res)=>{
    client.connect()
    console.log(req.body)
    db = client.db('keep').collection('users')
    db.find({userName : req.body.userName}).toArray().then(async (results) => {
        if(results.length === 0){
            const hashedPassword =  await bcrypt.hash(req.body.password, 10)
            db.insertOne({userName : req.body.userName, name: req.body.name,password : hashedPassword}).then(
                results => res.send(JSON.stringify({"status" : 200, body : results}))
            )
        } else {
            res.send(JSON.stringify({"status" : 404}))
        }
    })
})
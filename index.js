const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (request, response)=> {
    const id = Number(request.params.id)
    const person = persons.find( person => person.id === id)
    if(person)
    {
    response.json(person)
    }
    else{
        response.status(404).end()
    }
} )
app.get('/info', (req, res) => {

    const time = new Date();
    const henkiloita = 'puhelinluettelossa ' + persons.length + ' henkilön tiedot'
    res.send(henkiloita + '<br>' + time)
  })
app.delete('/api/persons/:id', (req,res) =>{
  const id = Number(req.params.id)
  const person = persons.find( person => person.id === id)
  if(person){
    persons = persons.filter( p => p.id !== id)

  }

    res.status(202).end()
  
})

app.post('/api/persons', (req,res)=>{
  console.log('Request body ', req.body)
  const newPerson = req.body
  
  console.log('New person name: ', newPerson.name)

  // Not so elegant code below
  if(newPerson.name === undefined|| newPerson.name === '' )
  {
      res.status(400).json({error: 'name missing'})
  }
  else if(newPerson.number === undefined || newPerson.number === '' )
  {
    res.status(400).json({error: 'number missing'})
  }
  else if(persons.find( person => person.name === newPerson.name))
  {
    res.status(400).json({error: 'name must be unique'})
  }
  else
  {
    newPerson.id = Math.floor(Math.random() * (999999 - 1)) + 1
    console.log(newPerson)
    persons = persons.concat(newPerson)
    console.log('persons after ', persons)
    res.json(newPerson)
  }
  
} )

  const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
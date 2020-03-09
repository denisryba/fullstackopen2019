const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
morgan.token('body', function (req, res) {
  if (req.method === 'POST') 
    return JSON.stringify(req.body) 
});

let contacts = [
  {
    name: "arto hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "ada lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "dan abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "mary poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/info', (req, res) => {
  res.send(`Phonebook has now info for ${contacts.length} people
  <br><br>
  ${new Date()}`);
  
});

app.get('/api/persons', (req, res) => {
  res.json(contacts);
});

app.get('/api/persons/:id', (req, res) => {
  const contact = contacts.find(con => con.id === +req.params.id);
  if (contact)
    res.json(contact);
  else
    res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  contacts = contacts.filter(contact => contact.id !== id);
  res.status(204).end();
});

const generateId = () => Math.floor(Math.random() * 100000);

const isNameUnique = (person) => !contacts.find(pers => pers.name === person.name);

app.post('/api/persons', (req, res) => {
  const person = req.body;
  const uniqueName = isNameUnique(person);
  if (person.number && person.name)
  {
    if (uniqueName) {
      person.id = generateId();
      contacts = contacts.concat(person);
    }
    else return res.status(400).json({
      error: 'name must be unique'
    })
  }
  else {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  res.json(person);
});


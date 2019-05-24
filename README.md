# Ticket-Graph
Decentralized tickets sale system
Please, check running version at https://ticket-graph.herokuapp.com/ (it could take up to 30 seconds sometimes cause project deployed on free heroku dyno)

<img width="1440" alt="Screenshot 2019-05-24 at 02 05 08" src="https://user-images.githubusercontent.com/26343374/58305696-ab913c80-7e01-11e9-848a-47c3f769e853.png">

## Idea & inspiration
The core idea of this project is to show decentralized service where Ticket Graph users could buy tickets and event organizers could sell them. When user buys ticket his/her Ethereum address appears in the list of participants and if user has installed Ethereum wallet in mobile devices noting more to enter needed.

<img width="1438" alt="Screenshot 2019-05-24 at 02 07 09" src="https://user-images.githubusercontent.com/26343374/58305695-ab913c80-7e01-11e9-9ead-c5f66e2984c2.png">

## User story

1. Julia as a professional event organiser posted an event to system Graph Tickets about her Jazz concert, setting up location, date, price and quantity of tickets. 
2. John entered the site, chooses his location and found interesting events around him with additional information. 
3. John decided to buy a ticket. He simply press "Buy a ticket", pay in Ethereum and his address appears in participants list 
4. At the entrance Julia colleagues used IoT devices connected to The Graph API. This devices simply gets list of participant using one GraphQL request. 
5. John scanned QR-code by app, create a digital signature in his app and approve that his ethereum address is in the list and go to the concert.

The Graph API provides great opportunity to integrate decentralized systems with IoT devices and as result create new business models.

## Smartcontract

Smartcontract for this project is very simplified. It has 2 methods only:


## Data schema
To syncronize whole data between smartcontract data & end users via The Graph two @entities were created. TicketEvent is collcted all information about events and avaible tickets, Ticket schema is used to store information about users who bought tickets.

The Graph technology is used for searching through Events to provided selections based on user location, date and avaible tickets. Third-part services could use GraphQL requests to manage this data simply. I use Graph to filter Tickets by event id to show list of tickets buyers.

#### TicketEvent

```
type TicketEvent @entity {
  id: ID!
  title: String!
  location: String!
  date: Int!
  imageUrl: String!
  price: Int!
  qty: Int!
  owner: Bytes!
  
}
```
#### Ticket
```
type Ticket @entity {
  id: ID!
  event_id: Int!
  buyer: Bytes!
}
```

## How Graph is utilized in this project
The Graph helps to provide API for smartcontract for third-patry services and IoT devices to check list of buyers and events. 

## What was done during hackathon
This project was created during hackathon from scratch including:

1. Idea generation
2. Writing and teswting smart contract
3. Front end application development
4. Deploying to Graph & Ropsten network & Heroku

Working version is on https://ticket-graph.herokuapp.com/ (it could take up to 30 seconds sometimes cause project deployed on free heroku dyno)

### Future development

1. Finish searcning bar for events
2. Provide function to withdraw money for organisers
3. Add automated testing for smartcontract

Thanks for Graph & CoinList for this opportunity!

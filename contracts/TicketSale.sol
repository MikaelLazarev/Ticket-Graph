pragma solidity ^0.5.0;

contract TicketSale {
  event NewEventRegistered(uint id, string title, string location, uint256 date,
                           string imageUrl, uint32 price, uint32 qty, address owner);

  event UpdateEvent(uint id, string title, string location, 
                    uint256 date, string imageUrl, uint32 price, uint32 qty, address owner);

  event TicketRegistered(uint id, uint event_id, address buyer);

  struct TicketEvent {
    string title;
    string location;
    uint256 date;
    string imageUrl;
    uint32 price;
    uint32 qty;
    address owner;
  }

  TicketEvent[] public tickets;
  uint ticketsSold = 0;

  function postEvent(
    string memory _title, 
    string memory _location, 
    uint256 _date,
    string memory _imageUrl, 
    uint32 _price, 
    uint32 _qty ) public {

    uint id = tickets.push(TicketEvent(_title, _location, _date, _imageUrl, _price, _qty, msg.sender)) - 1;
    emit NewEventRegistered(id, _title, _location, _date, _imageUrl, _price, _qty, msg.sender);
  }

  function buyTicket(uint event_id) public payable {
    TicketEvent memory ticket = tickets[event_id];

    // Check sell conditions
    require(ticket.qty > 0, "Sorry! All tickets are sold out.");
    require(ticket.date >= now, "You cant buy tickets after event");
    require(ticket.price == msg.value, "You send value different than ticket price");

    // Descrease tickets quantity left
    uint ticket_id = ticketsSold++;
    tickets[event_id].qty--;

    // Updating events
    emit TicketRegistered(ticket_id, event_id, msg.sender);
    emit UpdateEvent(event_id, ticket.title, ticket.location, ticket.date, ticket.imageUrl, ticket.price, ticket.qty-1, ticket.owner);
  }
}

import { NewEventRegistered, UpdateEvent, TicketRegistered } from '../generated/TicketSale/TicketSale'
import { TicketEvent, Ticket } from '../generated/schema'

export function handleNewEventRegistered(event: NewEventRegistered): void {
  let ticketEvent = new TicketEvent(event.params.id.toHex())
  ticketEvent.owner = event.params.owner
  ticketEvent.title = event.params.title
  ticketEvent.location = event.params.location
  ticketEvent.date = event.params.date.toI32()
  ticketEvent.imageUrl = event.params.imageUrl
  ticketEvent.price = event.params.price.toI32()
  ticketEvent.qty = event.params.qty.toI32()
  ticketEvent.save()
}

export function handleUpdateEvent(event: UpdateEvent): void {
  let id = event.params.id.toHex()
  let ticketEvent = TicketEvent.load(id)
  if (ticketEvent == null) {
    ticketEvent = new TicketEvent(id)
  }

  ticketEvent.owner = event.params.owner
  ticketEvent.title = event.params.title
  ticketEvent.location = event.params.location
  ticketEvent.date = event.params.date.toI32()
  ticketEvent.imageUrl = event.params.imageUrl
  ticketEvent.price = event.params.price.toI32()
  ticketEvent.qty = event.params.qty.toI32()
  ticketEvent.save()
}

export function handleTicketRegistered(event: TicketRegistered): void {
  let ticket = new Ticket(event.params.id.toHex())
  ticket.event_id = event.params.event_id.toI32()
  ticket.buyer = event.params.buyer
  ticket.save()
}




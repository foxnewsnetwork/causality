import { getWithDefault, over } from "./map";
import { reduce } from "./iter";

/**
 * We use this construct to pass messages around
 * The two key concepts here are addresses (A) and
 * messages (M)
 */

export type MailServer<A, M> = Map<A, Set<M>>;

/**
 * Creates a new mail server instance
 */
export function create<A, M>(): MailServer<A, M> {
  return new Map()
}

/**
 * Gets mail in the current address
 * @param server 
 * @param address 
 */
export function getMail<A, M>(server: MailServer<A, M>, address: A): Set<M> {
  return getWithDefault(server, address, () => new Set())
}

/**
 * Puts mail into another address
 * @param server 
 * @param address 
 * @param mail 
 */
export function sendMail<A, M>(server: MailServer<A, M>, address: A, mail: M): MailServer<A, M> {
  return over(server, address, (mailbox = new Set()) => mailbox.add(mail))
}

/**
 * Send a bunch of emails to one address
 * @param server 
 * @param address 
 * @param bulkMail 
 */
export function sendBulkMail<A, M>(server: MailServer<A, M>, address: A, bulkMail: Iterable<M>): MailServer<A, M> {
  return reduce(
    bulkMail,
    (server, mail) => sendMail(server, address, mail),
    server
  )
}

/**
 * Spams a bunch of addresses with the same mail
 * @param server 
 * @param addresses 
 * @param mail 
 */
export function spamMail<A, M>(
  server: MailServer<A, M>,
  addresses: Iterable<A>,
  mail: M
): MailServer<A, M> {
  return reduce(
    addresses,
    (server, address) => sendMail(server, address, mail),
    server
  )
}

/**
 * Send a bunch of emails to a bunch of people
 * 
 * @param server 
 * @param addresses 
 * @param mails 
 */
export function spamBulkMail<A, M>(
  server: MailServer<A, M>,
  addresses: Iterable<A>,
  mails: Iterable<M>
): MailServer<A, M> {
  return reduce(
    mails,
    (server, mail) => spamMail(server, addresses, mail),
    server
  )
}
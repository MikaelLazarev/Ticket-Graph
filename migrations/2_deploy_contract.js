const TicketSale = artifacts.require('./TicketSale.sol')

module.exports = async function(deployer) {
  await deployer.deploy(TicketSale);
}

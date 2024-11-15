const Acme = require('./suppliers/Acme');
const Paperflies = require('./suppliers/Paperflies');
const Patagonia = require('./suppliers/Patagonia');
const HotelsService = require('./services/HotelsService');
const parseArgs = require('./utils/argparser');

async function fetchHotels(hotelIds = [], destinationIds = []) {
  const suppliers = [new Acme(), new Paperflies(), new Patagonia()];

  const allSupplierData = [];
  for (const supplier of suppliers) {
    const supplierData = await supplier.fetch();
    allSupplierData.push(...supplierData);
  }

  const hotelsService = new HotelsService();
  hotelsService.mergeAndSave(allSupplierData);

  const filteredHotels = hotelsService.find(hotelIds, destinationIds);
  return JSON.stringify(filteredHotels, undefined, 2);
}

async function main() {
  const { hotelIds, destinationIds } = parseArgs();

  const result = await fetchHotels(hotelIds, destinationIds);
  console.log(result);
}

main();

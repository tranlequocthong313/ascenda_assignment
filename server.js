const http = require('http');
const url = require('url');
const Acme = require('./suppliers/Acme');
const Paperflies = require('./suppliers/Paperflies');
const Patagonia = require('./suppliers/Patagonia');
const HotelsService = require('./services/HotelsService');

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

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const hotelIds = parsedUrl.query.hotelIds
    ? parsedUrl.query.hotelIds.split(',')
    : [];
  const destinationIds = parsedUrl.query.destinationIds
    ? parsedUrl.query.destinationIds.split(',')
    : [];

  try {
    console.log(hotelIds, destinationIds);
    const result = await fetchHotels(hotelIds, destinationIds);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: 'Failed to fetch hotels',
        details: error.message,
      })
    );
  }
});

const PORT = process.env.PORT || 6969;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

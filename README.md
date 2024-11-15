# Usage

1. **Run via terminal**:
   To run in the terminal and fetch hotel data, use the following command:

   ```bash
   ./runner.sh iJhz,f8c9 5432,1122
   ```

2. **Run via HTTP**:
   If you prefer to view the data in a more readable format via HTTP, you can start the server and access the endpoint like this:

   ```bash
   npm run server
   ```

   Then, visit the URL:

   ```bash
   http://localhost:6969/hotels?hotelIds=iJhz,f8c9&destinationIds=5432,1122
   ```

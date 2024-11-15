#!/bin/bash

hotel_ids=${1:-none}
destination_ids=${2:-none}

node index.js --hotelIds="$hotel_ids" --destinationIds="$destination_ids"

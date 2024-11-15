function parseArgs() {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  args.forEach((arg) => {
    const [key, value] = arg.split('=');

    if (key.startsWith('--') && value) {
      const formattedKey = key.slice(2);
      parsedArgs[formattedKey] =
        value !== 'none' ? value.split(',').map((item) => item.trim()) : [];
    }
  });

  return parsedArgs;
}

module.exports = parseArgs;

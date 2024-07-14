const fs = require('fs')
const path = require('path');
const brain = require('brainjs')

runNetwork = (sum, opened_card) => {
  const net = new brain.NeuralNetwork();
  const networkJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config', 'network.json'), { encoding: 'utf-8' }));
  net.fromJSON(networkJson);
  const output = net.run({ sum, opened_card });

  if (isNaN(output.take) || isNaN(output.stay)) {
    throw new Error('Wrong parameters');
  }

  return output;
};

module.exports = runNetwork;

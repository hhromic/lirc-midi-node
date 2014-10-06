/**
 * A very simple LIRC to MIDI bridge program for Node.JS
 *
 * Hugo Hromic - http://github.com/hhromic
 * Apache License
 */

// Required modules
var net = require('net');
var midi = require('midi');

// LIRC remote/button to MIDI messages mappings
var mappings = require('./mappings');

// Parse program arguments
var args = process.argv.splice(2);
if (args.length < 2) {
    console.log('Usage: <lircdSocketPath> <midiOutputPort>');
    process.exit(0);
}
var lircdSocketPath = args[0];
var midiOutputPort = parseInt(args[1]);

// Initialise MIDI output
var midiOutput = new midi.output();
try {
  midiOutput.openPort(midiOutputPort);
  console.log('Opened MIDI output: %s', midiOutput.getPortName(midiOutputPort));
}
catch (err) {
  console.log('Error opening MIDI output: %s', err);
  process.exit(1);
}

// Initialise LIRC connection
var lircClient = net.connect({path: lircdSocketPath}, function () {
  console.log('Connected to LIRC: %s', lircdSocketPath);
});
lircClient.on('error', function (err) {
  console.log('Error connecting to LIRC: %j', err);
  midiOutput.closePort();
  process.exit(1);
});
lircClient.on('data', function (data) {
  var fields = data.toString().trim().split(' ', -1);
  var button = fields[2];
  var remote = fields[3];

  // Check remote and button and send MIDI message
  if (remote in mappings && button in mappings[remote]) {
    var midiMessage = mappings[remote][button];
    midiOutput.sendMessage(midiMessage);
    console.log('Remote: %s, Button: %s, MIDI message: %j', remote, button, midiMessage);
  } else {
    console.log('Unknown LIRC remote/button: %s/%s', remote, button);
  }
});
lircClient.on('end', function () {
  midiOutput.closePort();
  console.log('Disconnected from LIRC.');
});

/**
 * A very simple LIRC to MIDI bridge program for Node.JS
 *
 * Hugo Hromic - http://github.com/hhromic
 * Apache License
 */

// Required modules
var net = require('net');
var midi = require('midi');

// LIRC keys to MIDI notes mapping
var KEY_MAP = {
  'KEY_LEFT': 0x3C,
  'KEY_OK': 0x3D,
  'KEY_RIGHT': 0x3E,
  'KEY_BACK': 0x3F,
  'KEY_STOP': 0x40,
  'KEY_OPTION': 0x41,
  'KEY_REWIND': 0x42,
  'KEY_PLAY': 0x43,
  'KEY_FASTFORWARD': 0x44,
  'KEY_PREVIOUS': 0x45,
  'KEY_NEXT': 0x46,
  'KEY_SEARCH': 0x47,
  'KEY_EJECT': 0x48,
}

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
  var key = fields[2];

  // Check key and send MIDI note
  if (key in KEY_MAP) {
    var midiMsg = [0x90, KEY_MAP[key], 0x7F];
    midiOutput.sendMessage(midiMsg);
    console.log('Key: %s, MIDI message: %j', key, midiMsg);
  } else {
    console.log('Unknown LIRC key: %s', key);
  }
});
lircClient.on('end', function () {
  midiOutput.closePort();
  console.log('Disconnected from LIRC.');
});

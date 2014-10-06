lirc-midi-node
==============

A very simple LIRC to MIDI bridge program for Node.JS

Module Requirements
-------------------

This program requires the following modules to be installed:

```shell
npm install midi
```

Usage
-----

This simple program maps LIRC remote/buttons into MIDI messages that are later sent to any compatible MIDI output port. The program accepts two arguments:

```shell
$ node lircmidi.js <lircdSocketPath> <midiOutputPort>
```

* ```lircdSocketPath``` is the path to the UNIX socket that LIRCd is writing to.
* ```midiOutputPort``` is the MIDI output port index to use for MIDI messages output.

**Example:**

```shell
$ node lircmidi.js /var/run/lirc/lircd 0
Opened MIDI output: Midi Through 14:0
Connected to LIRC: /var/run/lirc/lircd
```

Mappings
--------

The actual LIRC remote/buttons to MIDI messages mappings are configured in the ```mappings.js``` module file. The content for this file is very simple:

```javascript
module.exports = {
  'REMOTE1_NAME': {
    'KEY1_NAME': [0x90, 0x3C, 0x7F], // bytes packet for any MIDI message
    'KEY2_NAME': [0xC1, 0x05],       // the packet can be of any length
  },
  'REMOTE2_NAME': { // you can define multiple remotes
    'KEY1_NAME': [0x91, 0x3F, 0x40],
  },
};
```

All the remote and button names used in this file must be configured in the ```lircd.conf``` file of LIRC.

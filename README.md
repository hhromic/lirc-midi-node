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

This simple program maps LIRC remote keys into MIDI messages that are later sent to any ALSA-compatible MIDI output port. The program accepts two arguments:

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

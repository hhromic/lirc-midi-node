lirc-midi-node
==============

A very simple LIRC to MIDI bridge program for Node.JS.

Installation
------------

To install, use ```npm```:

```shell
$ npm install -g lirc-midi-node
```

Usage
-----

This simple program maps LIRC remote/buttons into MIDI messages that are later sent to any compatible MIDI output port. The program accepts two arguments:

```shell
$ lircmidi -l <lircdSocketPath> -o <midiOutputPort> -m <mappingsConfig>
```

* ```lircdSocketPath``` is the path to the UNIX socket that LIRCd is writing to.
* ```midiOutputPort``` is the MIDI output port index to use for MIDI messages output.
* ```mappingsConfig``` is the IR remotes to MIDI messages mappings configuration file in JSON format.

**Example:**

```shell
$ lircmidi -l /var/run/lirc/lircd -o 0 -m examples/mappings.json
[2015-04-08 02:31:14.099] [INFO] main - opened MIDI output: Midi Through 14:0
[2015-04-08 02:31:14.297] [INFO] main - connected to LIRCd: /var/run/lirc/lircd
```

IR remotes to MIDI messages Mappings Configuration
--------------------------------------------------

The LIRC remotes/buttons to MIDI messages mappings must be configured in a JSON file with the following format (see the included ```examples/mappings.json``` example file):

```json
{
  "REMOTE1_NAME": {
    "KEY1_NAME": [144, 60, 127],
    "KEY2_NAME": [193, 5]
  },
  "REMOTE2_NAME": {
    "KEY1_NAME": [145, 63, 64]
  }
}
```

All the remote and button names used in this file must be configured in the ```lircd.conf``` file of LIRC. MIDI messages are represented using variable-length arrays of bytes to send.

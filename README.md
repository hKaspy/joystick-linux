# Joystick linux

Thin wrapper around Linux's Joystick API. Zero dependencies!

## Installation

```sh
npm install @hkaspy/joystick-linux
```

## Usage

Tested on Node.js v14 LTS.

```js
import Joystick from "@hkaspy/joystick-linux";

const stick = new Joystick("/dev/input/js0");
stick.on("update", (ev) => console.log(ev));
```

Debian (and other Debian-based OSes like Raspberry Pi OS and Ubuntu) has quite good out-of-the-box support for joysticks and gamepads, exposing a unified Joystick API.

So if you manage to connect your gamepad, you can most probably use this module - see [Debian Gamepad Wiki](https://wiki.debian.org/Gamepad)

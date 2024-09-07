# Joystick linux

Thin wrapper around Linux's Joystick API.

## Installation

```sh
npm install @hkaspy/joystick-linux
```

## Usage

Tested on Node.js v14 LTS and v16 LTS.

```js
import Joystick from "@hkaspy/joystick-linux";

const stick = new Joystick("/dev/input/js0");
stick.on("update", (ev) => console.log(ev));
```

Debian (and other Debian-based OSes like Raspberry Pi OS and Ubuntu) has quite good out-of-the-box support for joysticks and gamepads, exposing a unified Joystick API.

So if you manage to connect your gamepad, you can most probably use this module - see [Debian Gamepad Wiki](https://wiki.debian.org/Gamepad)

## API

### new Joystick()

```js
new Joystick(
    // path to your Joystick device
    "/dev/input/js0",
    {
        // first batch of events is the initial state of buttons/axies
        // it gets dropped if you don't set includeInit: true
        includeInit: true,
        // link a mapper function to map these general events to your specific device
        mappingFn: (e) => e,
    }
);
```

## Events

### `update`

Emitted on each button press or axis value change.

```js
stick.on("update", (data) => console.log(data));
```

```js
{
    // if this event is from the initial batch
    isInitial: false,
    // button/axis number
    number: 1,
    // number of milliseconds since an arbitrary point in time (same point in time for all events in one session)
    time: 87465,
    // "BUTTON" or "AXIS"
    type: "BUTTON",
    // 0 or 1 (pressed) for type: BUTTON
    // -32767 to +32767 for type: AXIS
    value: 0,
}
```

### `disconnect`

Emitted when connection to the joystick is lost.

```js
stick.on("disconnect", () => console.log('disconnected'));
```

### `error`

Emitted when there is an error with the joystick device (e.g. the specified path doesn't exist).

```js
stick.on("error", (err) => console.log('Error!', err));
```


## Mappers

Include your custom mapping function to add more information to the event.

See the included [xbox one controller mapper](./mappers/xbox-one.js) or [logitech f310 controller mapper](./mappers/logitech-f310.js)
```js
import Joystick from "@hkaspy/joystick-linux";
import { xboxOneMapper } from "@hkaspy/joystick-linux/mappers";

const stick = new Joystick("/dev/input/js0", { mappingFn: xboxOneMapper });
stick.on("update", (ev) => console.log(ev));
```

```js
{
    isInitial: false,
    number: 4,
    time: 87465,
    type: "BUTTON",
    value: 1,
    // friendly button name
    name: "LEFT_BUMPER",
}
```

## Credits

Inspired by the [joystick](https://www.npmjs.com/package/joystick) module, but implemented as a file stream reader, which is more performant for me. On the other hand, this module doesn't do deadzone and sensitivity.

import EventEmitter from "events";
import { createReadStream } from "fs";
import { JoystickStream } from "./joystick-stream.js";

// Linux Kernel Joystick API Docs:
// https://www.kernel.org/doc/Documentation/input/joystick-api.txt

const JS_EVENT_TYPE = {
    // button pressed/released
    JS_EVENT_BUTTON: 0x01,
    // joystick moved
    JS_EVENT_AXIS: 0x02,
    // initial state of device (bitwise mixed with BUTTON/AXIS)
    JS_EVENT_INIT: 0x80,
};

export function getEvType(typeNo) {
    if ((typeNo & JS_EVENT_TYPE.JS_EVENT_AXIS) === JS_EVENT_TYPE.JS_EVENT_AXIS) {
        // joystick moved
        return "AXIS";
    }

    if ((typeNo & JS_EVENT_TYPE.JS_EVENT_BUTTON) === JS_EVENT_TYPE.JS_EVENT_BUTTON) {
        // button pressed/released
        return "BUTTON";
    }

    return "unknown";
}

export function parseEvent(buff) {
    const time = buff.readUInt32LE(0);
    const value = buff.readInt16LE(4);
    const typeNo = buff.readUInt8(6);
    const number = buff.readUInt8(7);

    const type = getEvType(typeNo);

    const isInitial = ((typeNo & JS_EVENT_TYPE.JS_EVENT_INIT) === JS_EVENT_TYPE.JS_EVENT_INIT);

    return {
        isInitial,
        number,
        time,
        type,
        typeNo,
        value,
    };
}

export class Joystick extends EventEmitter {

    mappingFn;
    includeInit;

    /**
     * 
     * @param {string} devicePath e.g. "/dev/input/js0"
     * @param options
     * @param {function} options.mappingFn function to re-map event data (e.g. add button names of your specific device)
     * @param {boolean} options.includeInit include events that report initial joystick state
     */
    constructor(devicePath, options = {}) {
        super();
        this.mappingFn = options.mappingFn;
        this.includeInit = options.includeInit;

        const fileStream = createReadStream(devicePath);
        fileStream.pipe(new JoystickStream()).on('data', (b) => this.onData(b));
    }

    onData(buff) {
        
        const ev = parseEvent(buff);

        if (ev.type === "unknown") {
            console.log("ev type unknown", typeNo);
            return;
        }

        if (ev.isInitial === true && this.includeInit !== true) {
            return;
        }

        if (typeof this.mappingFn === "function") {
            this.emit("update", this.mappingFn(ev));
        } else {
            this.emit("update", ev);
        }
    }
}

import EventEmitter from "events";
import { createReadStream } from "fs";
import { JoystickStream } from "./joystick-stream.js";
import { parseEvent } from "./parseEvent.js";

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

        const fileStream = createReadStream(devicePath)
            .on('error', (e) => {
                if (e.code === 'ENODEV') {
                    this.emit("disconnect");
                } else {
                    this.emit('error', e);
                }
            });

        fileStream
            .pipe(new JoystickStream())
            .on('data', (b) => this.onData(b));
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

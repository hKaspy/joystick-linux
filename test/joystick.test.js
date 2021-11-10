import { expect } from "chai";
import "mocha";

import Joystick from "@hkaspy/joystick-linux";

describe("joystick.js", () => {
    it("should be able to initialize", () => {

        const stick = new Joystick(new URL('./files/empty.bin', import.meta.url));
        expect(stick).to.be.instanceOf(Joystick);
    });
});

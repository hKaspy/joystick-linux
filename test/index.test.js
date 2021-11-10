import { expect } from "chai";
import "mocha";

import Joystick from "@hkaspy/joystick-linux";
import * as exportObj from "@hkaspy/joystick-linux";

describe("test module exports - index", () => {

    it(`default export`, () => {
        expect(Joystick).to.be.a("function");
    });
    
    it(`object export`, () => {
        expect(exportObj).to.haveOwnProperty("Joystick");
        expect(exportObj.Joystick).to.be.a("function");
    });
});

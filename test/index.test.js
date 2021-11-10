import { expect } from "chai";
import "mocha";

import Joystick from "@hkaspy/joystick-linux";
import * as exportObj from "@hkaspy/joystick-linux";
import * as exportMapperObj from "@hkaspy/joystick-linux/mappers";

describe("test module exports - index", () => {

    it(`import Joystick`, () => {
        expect(Joystick).to.be.a("function");
    });
    
    it(`import { Joystick }`, () => {
        expect(exportObj).to.haveOwnProperty("Joystick");
        expect(exportObj.Joystick).to.be.a("function");
    });
});

describe("test module exports - mappers", () => {
    
    it(`import { xboxOneMapper } from "/mappers"`, () => {
        expect(exportMapperObj).to.haveOwnProperty("xboxOneMapper");
        expect(exportMapperObj.xboxOneMapper).to.be.a("function");
    });
});

import { expect } from "chai";
import "mocha";

import * as exportObj from "@hkaspy/joystick-linux/mappers";

describe("test module exports - mappers", () => {
    
    it("xboxOneMapper", () => {
        expect(exportObj).to.haveOwnProperty("xboxOneMapper");
        expect(exportObj.xboxOneMapper).to.be.a("function");
    });
});
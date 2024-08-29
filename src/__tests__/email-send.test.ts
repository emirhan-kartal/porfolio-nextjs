import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";

describe("Email send", () => {
    it("should send an email", async () => {
        const { handler } = require("../pages/api/contact/index");
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });
        
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        
    });
});

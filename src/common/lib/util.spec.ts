import { normalizeNumber } from "./util";

describe("normalizeNumber", () => {
    it("should return the number itself if within range", () => {
        expect(normalizeNumber(5, 1, 10)).toBe(5);
    });

    it("should return the minimum if less than range", () => {
        expect(normalizeNumber(0, 1, 10)).toBe(1);
    });

    it("should return the maximum if greater than range", () => {
        expect(normalizeNumber(15, 1, 10)).toBe(10);
    });
});

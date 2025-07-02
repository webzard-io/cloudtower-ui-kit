import dayjs from "dayjs";

import { getFirstDateOfMonth } from "../utils";

describe("getFirstDateOfMonth", () => {
  describe("when week starts on Monday", () => {
    it("should return 5 for months starting on Saturday", () => {
      const date = dayjs("2025-3", "YYYY-M");
      expect(getFirstDateOfMonth(date, true)).toBe(5);
    });

    it("should return 6 for months starting on Sunday", () => {
      const date = dayjs("2025-6", "YYYY-M");
      expect(getFirstDateOfMonth(date, true)).toBe(6);
    });

    it("should return 1 for months starting on Tuesday", () => {
      const date = dayjs("2025-7", "YYYY-M");
      expect(getFirstDateOfMonth(date, true)).toBe(1);
    });

    it("should return 0 for months starting on Monday", () => {
      const date = dayjs("2025-9", "YYYY-M");
      expect(getFirstDateOfMonth(date, true)).toBe(0);
    });
  });

  describe("when week starts on Sunday", () => {
    it("should return 6 for months starting on Saturday", () => {
      const date = dayjs("2025-3", "YYYY-M");
      expect(getFirstDateOfMonth(date, false)).toBe(6);
    });

    it("should return 0 for months starting on Sunday", () => {
      const date = dayjs("2025-6", "YYYY-M");
      expect(getFirstDateOfMonth(date, false)).toBe(0);
    });

    it("should return 2 for months starting on Tuesday", () => {
      const date = dayjs("2025-7", "YYYY-M");
      expect(getFirstDateOfMonth(date, false)).toBe(2);
    });

    it("should return 1 for months starting on Monday", () => {
      const date = dayjs("2025-9", "YYYY-M");
      expect(getFirstDateOfMonth(date, false)).toBe(1);
    });
  });
});

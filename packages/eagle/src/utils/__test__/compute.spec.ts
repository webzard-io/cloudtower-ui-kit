import { makeUUID } from "../compute";

describe("generate uuid", () => {
  it("should generate uuid that has corresponding digits", () => {
    expect(makeUUID(5).length).toEqual(5);
  });
});

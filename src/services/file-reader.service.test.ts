import { FileReaderService } from "./file-reader.service";

describe("File Reader Service Tests", () => {
  describe("File Reader Service Tests", () => {
    const fs = require("fs");
    jest.mock("fs");

    test("should parse some json retrieved form a file", () => {
      const fileContents = [
        { id: 1, investorId: 1, investmentAccount: "TB1", balance: "300" },
        { id: 2, investorId: 1, investmentAccount: "GBB", balance: "50.9999" },
      ];

      fs.readFileSync.mockReturnValue(JSON.stringify(fileContents));
      const fileReaderService = new FileReaderService(fs);

      expect(fileReaderService.readFile("test")).toEqual(fileContents);
    });

    test("should return empty array on file read error", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error();
      });
      const fileReaderService = new FileReaderService(fs);

      expect(fileReaderService.readFile("test")).toEqual([]);
    });
  });
});

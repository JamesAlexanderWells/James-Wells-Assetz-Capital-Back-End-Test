import { TotalPortfolio } from "src/models/total-portfolio";
import { OutputService } from "./output.service";

describe("Output Service Tests", () => {
  describe("printTotalPortfolioOutput", () => {
    test("Should log a formatted message for each Total Portfolio", () => {
      const logSpy = jest.spyOn(console, "log");
      const outputService = new OutputService();

      const totalPortfolios: TotalPortfolio[] = [
        { investorId: 1, totalPortfolioValue: 123 },
        { investorId: 2, totalPortfolioValue: 456 },
      ];

      outputService.printTotalPortfolioOutput(totalPortfolios);

      expect(logSpy.mock.calls).toEqual([
        ["Investor Id: 1 | Total Portfolio: 123"], // First call
        ["Investor Id: 2 | Total Portfolio: 456"], // Second call
      ]);
    });
  });
});

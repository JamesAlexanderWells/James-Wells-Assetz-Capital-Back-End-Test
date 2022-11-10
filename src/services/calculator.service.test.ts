import { Holding } from "src/models/holding";
import { Rate } from "src/models/rate";
import { CalculatorService } from "./calculator.service";

describe("Rate Calculator Service Tests", () => {
  describe("calculatePortfolioTotalsAllInvestors", () => {
    test("should calculate total portfolios based on rates and holdings", () => {
      const holdings: Holding[] = [
        { id: 1, investorId: 1, investmentAccount: "TB1", balance: "100" },
        { id: 2, investorId: 1, investmentAccount: "GBB", balance: "200" },
        { id: 1, investorId: 2, investmentAccount: "TB1", balance: "0" },
        { id: 2, investorId: 2, investmentAccount: "GBB", balance: "0" },
      ];

      const rates: Rate[] = [
        {
          id: 1,
          investmentAccount: "TB1",
          annualRate: 4.25,
        },
        {
          id: 2,
          investmentAccount: "GBB",
          annualRate: 4.05,
        },
      ];

      const fileReaderService = new CalculatorService();

      expect(
        fileReaderService.calculatePortfolioTotalsAllInvestors(holdings, rates)
      ).toEqual([
        { investorId: 1, totalPortfolioValue: 303.9861111111111 },
        { investorId: 2, totalPortfolioValue: 0 },
      ]);
    });
  });
});

import { Holding } from "src/models/holding";
import { Rate } from "src/models/rate";
import { TotalPortfolio } from "src/models/total-portfolio";
import { PortfolioMainService } from "./portfolio-main.service";
import { FileReaderService } from "./file-reader.service";
import { OutputService } from "./output.service";
import { CalculatorService } from "./calculator.service";
import { when } from "jest-when";
import { HOLDINGS_FILE_PATH, RATES_FILE_PATH } from "../constants/filepaths";

describe("PortfolioMainService", () => {
  const fileReaderService = new FileReaderService();
  const calculatorService = new CalculatorService();
  const outputService = new OutputService();

  const totalPortfolios: TotalPortfolio[] = [
    { investorId: 1, totalPortfolioValue: 303.9861111111111 },
    { investorId: 2, totalPortfolioValue: 0 },
  ];

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

  describe("findTotalPortfoliosAllInvestors", () => {
    test("should read in a file and calculate portfolios", () => {
      const logSpy = jest.spyOn(console, "log");
      const readFileMock = jest.spyOn(fileReaderService, "readFile");

      when(readFileMock)
        .calledWith(HOLDINGS_FILE_PATH)
        .mockReturnValue(holdings);
      when(readFileMock).calledWith(RATES_FILE_PATH).mockReturnValue(rates);

      jest
        .spyOn(calculatorService, "calculatePortfolioTotalsAllInvestors")
        .mockImplementation(() => {
          return totalPortfolios;
        });

      const app = new PortfolioMainService(
        fileReaderService,
        calculatorService,
        outputService
      );

      app.findTotalPortfoliosAllInvestors();

      expect(logSpy.mock.calls).toEqual([
        ["Investor Id: 1 | Total Portfolio: 303.9861111111111"], // First call
        ["Investor Id: 2 | Total Portfolio: 0"], // Second call
      ]);
    });
  });
});

import { TotalPortfolio } from "src/models/total-portfolio";

export class OutputService {
  constructor() {}

  public printTotalPortfolioOutput(portfolios: TotalPortfolio[]): void {
    portfolios.forEach((portfolio: TotalPortfolio) => {
      const totalPortfolioValueFormatted =
        "Investor Id: " +
        portfolio.investorId +
        " | Total Portfolio: " +
        portfolio.totalPortfolioValue;
      console.log(totalPortfolioValueFormatted);
    });
  }
}

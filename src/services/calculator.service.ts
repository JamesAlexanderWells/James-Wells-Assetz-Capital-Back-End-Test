import { Holding } from "src/models/holding";
import { Rate } from "src/models/rate";
import { TotalPortfolio } from "src/models/total-portfolio";

export class CalculatorService {
  constructor(private promotionMultiplier: number = 1) {}

  public calculatePortfolioTotalsAllInvestors(
    holdings: Holding[],
    rates: Rate[]
  ): TotalPortfolio[] {
    const listOfAllInvestorsTotalPortfolios: TotalPortfolio[] = [];
    const investors = this.getInvestorIds(holdings);
    investors.forEach((investorId) => {
      const highestValueHoldingId = this.getHighestValueHoldingIds(
        holdings,
        investorId
      );

      const totalPortfolioValue = this.calculateSingleInvestorPortfolio(
        holdings,
        rates,
        investorId,
        highestValueHoldingId
      );

      listOfAllInvestorsTotalPortfolios.push({
        investorId,
        totalPortfolioValue: totalPortfolioValue,
      });
    });
    return listOfAllInvestorsTotalPortfolios;
  }

  private getInvestorIds(holdings: Holding[]): number[] {
    return [...new Set(holdings.map((holding) => holding.investorId))];
  }

  private getHighestValueHoldingIds(
    holdings: Holding[],
    investorId: number
  ): number {
    return holdings
      .filter((holding) => holding.investorId === investorId)
      .reduce((a, b) => (a.balance > b.balance ? a : b)).id;
  }

  private calculateSingleInvestorPortfolio(
    holdings: Holding[],
    rates: Rate[],
    investorId: number,
    highestValueHoldingId: number
  ): number {
    const initialValue = 0;

    return holdings
      .filter((holding) => holding.investorId === investorId)
      .map((holding) => {
        const rateOfInterest = this.getRateOfInvestment(
          holding,
          rates,
          highestValueHoldingId
        );

        return this.calculateInvestorHoldingAmountAfterDailyInterest(
          +holding.balance,
          rateOfInterest
        );
      })
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
      );
  }

  private getRateOfInvestment(
    holding: Holding,
    rates: Rate[],
    highestHoldingId: number
  ): number {
    let correspondingAnnualRate = rates.find(
      (rate) => rate.investmentAccount === holding.investmentAccount
    ).annualRate;
    if (holding.id === highestHoldingId) {
      correspondingAnnualRate += this.promotionMultiplier;
    }
    return correspondingAnnualRate;
  }

  private calculateInvestorHoldingAmountAfterDailyInterest(
    balance: number,
    annualRate: number,
    timePeriodPerYear: number = 360 //Daily Interest
  ): number {
    const dailyRate: number = annualRate / timePeriodPerYear;
    const dailyIncrease: number = balance * dailyRate;
    return balance + dailyIncrease;
  }
}

import { Holding } from "src/models/holding";
import { Rate } from "src/models/rate";
import { FileReaderService } from "./file-reader.service";
import { OutputService } from "./output.service";
import { CalculatorService } from "./calculator.service";
import { HOLDINGS_FILE_PATH, RATES_FILE_PATH } from "../constants/filepaths";

export class PortfolioMainService {
  constructor(
    private fileReaderService: FileReaderService,
    private CalculatorService: CalculatorService,
    private outputService: OutputService
  ) {}
  public findTotalPortfoliosAllInvestors(): void {
    const holdings: Holding[] = this.fileReaderService.readFile(
      HOLDINGS_FILE_PATH
    ) as Holding[];
    const rates: Rate[] = this.fileReaderService.readFile(
      RATES_FILE_PATH
    ) as Rate[];

    const portfolioValuesForAllInvestors =
      this.CalculatorService.calculatePortfolioTotalsAllInvestors(
        holdings,
        rates
      );
    this.outputService.printTotalPortfolioOutput(
      portfolioValuesForAllInvestors
    );
  }
}

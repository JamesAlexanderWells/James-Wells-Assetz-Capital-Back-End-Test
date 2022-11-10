import { PROMOTION_MULTIPLIER } from "./constants/calculation-variables.const";
import { PortfolioMainService } from "./services/portfolio-main.service";
import { FileReaderService } from "./services/file-reader.service";
import { OutputService } from "./services/output.service";
import { CalculatorService } from "./services/calculator.service";

const fileReaderService = new FileReaderService();
const calculatorService = new CalculatorService(PROMOTION_MULTIPLIER);
const outputService = new OutputService();

const portfolioMainService = new PortfolioMainService(
  fileReaderService,
  calculatorService,
  outputService
);
portfolioMainService.findTotalPortfoliosAllInvestors();

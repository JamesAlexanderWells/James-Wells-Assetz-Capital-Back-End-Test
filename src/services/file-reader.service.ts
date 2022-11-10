import { Holding } from "src/models/holding";
import { Rate } from "src/models/rate";

export class FileReaderService {
  constructor(private fs = require("fs")) {}

  // If this was a DB I was querying this would be an async function that would return a promise
  public readFile(filePath: string): Holding[] | Rate[] {
    let parsedData: Holding[] | Rate[] = [];
    let retrievedData = null;
    try {
      retrievedData = this.fs.readFileSync(filePath, "utf8");
      parsedData = JSON.parse(retrievedData);
    } catch (err: unknown) {
      retrievedData = [];
    }

    return parsedData;
  }
}

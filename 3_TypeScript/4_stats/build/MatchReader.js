"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchReader = void 0;
const util_1 = require("./util");
const CsvFileReader_1 = require("./CsvFileReader");
class MatchReader {
    constructor(reader) {
        this.reader = reader;
        this.matches = [];
    }
    static fromCsv(filename) {
        return new MatchReader(new CsvFileReader_1.CsvFileReader(filename));
    }
    load() {
        this.reader.read();
        this.matches = this.reader.data.map((row) => {
            return [
                (0, util_1.dateStringtoDate)(row[0]),
                row[1],
                row[2],
                parseInt(row[3]),
                parseInt(row[4]),
                row[5],
                row[6]
            ];
        });
    }
}
exports.MatchReader = MatchReader;

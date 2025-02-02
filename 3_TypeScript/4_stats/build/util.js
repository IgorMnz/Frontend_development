"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringtoDate = void 0;
const dateStringtoDate = (dateString) => {
    // 29/10/2018
    const dateParts = dateString.split('/').map((item) => {
        return parseInt(item);
    }); // [28, 10, 2018]
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
exports.dateStringtoDate = dateStringtoDate;

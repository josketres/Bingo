function Prize(amount, winningClass) {
    this.amount = amount;
    this.winningClass = winningClass;
}

Prize.prototype.getAmount = function () {
    return this.amount;
};

Prize.prototype.getWinningClass = function () {
    return this.winningClass;
};

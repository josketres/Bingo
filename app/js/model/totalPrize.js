function TotalPrize(amount, winningClasses) {
    this.amount = amount;
    this.winningClasses = winningClasses;
}

TotalPrize.prototype.getAmount = function () {
    return this.amount;
};

TotalPrize.prototype.getWinningClasses = function () {
    return this.winningClasses;
};

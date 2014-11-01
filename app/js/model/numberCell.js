function NumberCell(number) {
    this.number = number;
    this.show = false;
}

NumberCell.prototype.getNumber = function () {
    return this.number;
};

NumberCell.prototype.getShow = function () {
    return this.show;
};

NumberCell.prototype.showNumber = function () {
    this.show = true;
};

NumberCell.prototype.hideNumber = function () {
    this.show = false;
};


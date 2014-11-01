function BoardCell(number) {
    this.number = number;
    this.state = "none";
}

BoardCell.prototype.isEmpty = function () {
    return this.number == -1;
};

BoardCell.prototype.isChecked = function () {
    return this.state == "checked";
};

BoardCell.prototype.isLight = function () {
    return this.state == "light";
};

BoardCell.prototype.getNumber = function () {
    return this.number;
};

BoardCell.prototype.getState = function () {
    return this.state;
};

BoardCell.prototype.setState = function (state) {
    this.state = state;
};
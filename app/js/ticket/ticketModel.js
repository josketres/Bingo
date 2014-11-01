function TicketModel(scenario) {

    this.boards = new Array();

    for (var i = 0; i < scenario.boards.length; i++) {
        this.boards.push(new Board(scenario.boards[i]));
    }

}

TicketModel.prototype.getBoards = function() {
    return this.boards;
};

TicketModel.prototype.getBoard = function(index) {
    return this.boards[index];
};

TicketModel.prototype.checkNumberInBoards = function (number) {
    for(var i = 0; i < this.boards.length; i++){
        this.boards[i].checkNumber(number);
    }
};

TicketModel.prototype.resetBoards = function () {
    for(var i = 0; i < this.boards.length; i++){
        this.boards[i].reset();
    }
};

TicketModel.prototype.calculateWinnings = function (prizes) {
    var amount = 0,
        winningClasses = new Array();
    for(var i = 0; i < this.boards.length; i++){
        var biggestPrize = this.boards[i].calculateBiggestPrize(prizes);
        amount = amount + biggestPrize.getAmount();
        if(biggestPrize.getWinningClass() != 0) {
            winningClasses.push(biggestPrize.getWinningClass());
        }
    }
    return new TotalPrize(amount, winningClasses);
};

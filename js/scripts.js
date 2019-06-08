var currentAccount = "";

$(document).ready(function () {
    
    $("#form-account").submit(function (event) {
        event.preventDefault();

        var userName = $("#input-name").val();
        var balance = parseFloat($("#input-balance").val());
        if (isNaN(balance)) {
            balance = 0;
        }
        var newAccount = new BankAccount(userName, balance);
        currentAccount = newAccount;
        newAccount.output();
    });

    $("#form-balance").submit(function (event) {
        event.preventDefault();
        if (currentAccount != "") {
            var deposit = parseFloat($("#input-deposit").val());
            var withdraw = parseFloat($("#input-withdraw").val());
            if (isNaN(deposit)) {
                deposit = 0;
            }
            if (isNaN(withdraw)) {
                withdraw = 0;
            }
            var temp = deposit - withdraw;

            currentAccount.changeBalance(temp);
            currentAccount.output();
        }
    });

    //  Created a constructor for the object task
    function BankAccount(inputUserName, inputBalance) {
        this.name = inputUserName;
        this.balance = inputBalance;
    }

    BankAccount.prototype.output = function () {
        $(".output-balance").text(formatEUR(this.balance));
    };

    BankAccount.prototype.changeBalance = function (amount) {
        this.balance += amount;
    }

    function clear(temp) {
        $(temp).val("");
    }

    function formatEUR(tempString) {
        return tempString.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR'
        });
    }
});

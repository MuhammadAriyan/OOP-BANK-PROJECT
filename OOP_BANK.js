#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class user {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    bankBalance;
    constructor(firstName, lastName, gender, age, mobileNumber, bankBalance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.bankBalance = bankBalance;
    }
    isEqual(other) {
        let equal = this.firstName === other.firstName && this.lastName === other.lastName && this.gender === other.gender && this.mobileNumber === '10610610669';
        return equal;
    }
}
let admin = new user('MUHAMMAD', 'ARYAN', 'MALE', 19, '10610610669', 0); //AM RICH ZEHAAAHAHAHAHAAA! && AM 16 istg
let users = []; //ALL USERS GO HERE
let optionsForBank = ["WITHDRAW", "TRANSACTION HISTORY", "CHECK BANK-BALANCE", "DEPOSITE CASH", "QUIT", "SWITCH ACCOUNT"]; //options
let a = true;
BANK: while (a) {
    let askForFirstName = await inquirer.prompt({
        type: "input",
        name: "userFirstName",
        message: chalk.yellow("TYPE YOUR FIRST NAME "),
        validate(ans) {
            if (!ans) {
                return chalk.red('PLEASE FILL TO CONTINUE');
            }
            return true;
        }
    });
    let askForLastName = await inquirer.prompt({
        type: "input",
        name: "userLastName",
        message: chalk.yellow("TYPE YOUR LAST NAME"),
        validate(ans) {
            if (!ans) {
                return chalk.red('PLEASE FILL TO CONTINUE');
            }
            return true;
        }
    });
    let askForGender = await inquirer.prompt({
        type: "list",
        name: "userGender",
        message: chalk.yellow("YOUR GENDER"),
        choices: ["MALE", "FEMALE"]
    });
    let askForAge = await inquirer.prompt({
        type: "input",
        name: "userAge",
        message: chalk.yellow("TYPE YOUR AGE :"),
        validate: (ans) => {
            const isValid = !isNaN(ans) && parseInt(ans) >= 18;
            return isValid ? true : "YOU MUST BE 18+ TO OWN A BANK ACCOUNT";
        }
    });
    let askForNumber = await inquirer.prompt({
        type: "input",
        name: "userNumber",
        message: chalk.yellow("TYPE YOUR NUMBER :"),
        validate(ans) {
            if (ans.length === 11) {
                return true;
            }
            return 'PHONE NUMBER MUST BE OF 11 NUMBERS!';
        }
    });
    let userBankBalance = 0;
    console.log(chalk.green(`YOUR BANK BALANCE = ${userBankBalance}`));
    let newUser = new user(askForFirstName.userFirstName, askForLastName.userLastName, askForGender.userGender, askForAge.userAge, askForNumber.userNumber, userBankBalance);
    console.log(newUser);
    let transactions = ['HISTORY'];
    users.push(newUser);
    if (newUser.isEqual(admin)) {
        optionsForBank.push("CHECK USERS");
        userBankBalance = 1000000000000000; //am rich zehahahhahaaaaaaa!
        console.log(chalk.cyanBright(`# WELCOME ARYAN #`));
    }
    else {
        optionsForBank = ["WITHDRAW", "TRANSACTION HISTORY", "CHECK BANK-BALANCE", "DEPOSITE CASH", "QUIT", "SWITCH ACCOUNT"];
    }
    if (newUser) { }
    while (a) {
        let select = await inquirer.prompt({
            type: "list",
            name: "options",
            message: chalk.green("WHAT WOULD YOUY LIKE TO DO : "),
            choices: optionsForBank
        });
        if (select.options === "WITHDRAW") {
            let amountOfCash = await inquirer.prompt({
                type: "number",
                name: "cash",
                message: chalk.green("HOW MUCH AMOUNT YOU WANNA WITHDRAW :")
            });
            if (amountOfCash.cash > userBankBalance) {
                let wFailedHistory = `YOU TRIED TO WITHDRAW RS.${amountOfCash.cash} BUT YOU DON'T HAVE ENOUGH AMOUNT!`;
                transactions.push(wFailedHistory);
                console.log(wFailedHistory);
                continue;
            }
            else {
                userBankBalance -= amountOfCash.cash;
                let wPassedHistory = `RS.${amountOfCash.cash} HAS WITHDRAWED BY ${askForFirstName.userFirstName}`;
                transactions.push(wPassedHistory);
                console.log(wPassedHistory);
            }
            continue;
        }
        else if (select.options === "TRANSACTION HISTORY") {
            console.log(transactions);
        }
        else if (select.options === "CHECK BANK-BALANCE") {
            console.log(chalk.yellow(`YOU CURRENTLY HAVE ${userBankBalance}`));
        }
        else if (select.options === "SWITCH ACCOUNT") {
            break;
        }
        else if (select.options === "QUIT") {
            break BANK;
        }
        else if (select.options === "DEPOSITE CASH") {
            let add = await inquirer.prompt({
                type: "number",
                name: "added",
                message: chalk.green("AMOUNT YOU WANT TO ADD :")
            });
            let addHistory = `YOU ADDED ${add.added} TO YOUR ACOOUNT & RS.10 WAS CUTTED AS BANK FEES`;
            transactions.push(addHistory);
            console.log(addHistory);
            userBankBalance = userBankBalance + add.added - 10;
            console.log(chalk.magenta(`TOTAL OF ${add.added - 10} WAS ADDED`));
        }
        else if (select.options === "CHECK USERS") {
            console.log(`\n`, users);
        }
    }
    if (!newUser.isEqual(admin)) {
        console.log(chalk.gray(`TO ACCESS ADMIN ACCOUNT : MUHAMMAD , ARYAN,MALE, NUMBER = 10610610669`));
    }
}

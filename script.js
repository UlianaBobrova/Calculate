let money, income, addExpenses, deposit, mission, period;

money = 80000;
income = 'Фриланс';
addExpenses = 'Интернет, Такси, Коммуналка, Обслуживание';
deposit = true;
mission = 50000;
period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay;
budgetDay = money/30;
console.log(budgetDay);

let num = 266219;
let len = num.toString()[1];
console.log(len.split(''));
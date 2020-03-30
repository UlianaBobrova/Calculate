let money, income, addExpenses, deposit, mission, period;

money = +prompt('Ваш месячный доход?');
income = 'Фриланс';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 17000;
period = 6;

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = money - (amount1 + amount2) ; //бюджет на месяц 
let goalMonth = Math.ceil(mission / budgetMonth); //кол-во месяцев до цели mission

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay;
budgetDay = Math.floor(budgetMonth/30);
console.log(budgetDay);

console.log(money);
console.log(addExpenses);
console.log(deposit);

console.log(expenses1);
console.log(expenses2);
console.log(amount1);
console.log(amount2);

console.log('Бюджет на месяц= ', budgetMonth);

console.log('Цель будет достигнута за: ', goalMonth, 'месяцев');

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) { 
    console.log('Что то пошло не так'); }


let lang = prompt('Введите язык ru или en, чтобы увидеть дни недели: ');
let EnRes = ('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
let RuRes = ('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');

if (lang = 'ru') {
    console.log(RuRes.split(' ,'));
} else if(lang = 'en') {
   console.log(EnRes.split(' ,'));
}



let namePerson = prompt('Введите интересующего преподавателя: ', 'Артем');
let position = (namePerson === 'Артем') ? 'директор' : (namePerson === 'Максим') ? 'преподаватель' : 'студент';
console.log(position);


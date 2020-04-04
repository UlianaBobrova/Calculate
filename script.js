"use strict"

// let isNumber = function(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };

let money, 
    start = function() {
        do { 
        money = prompt('Ваш месячный доход?', 50000);
        
        }
        while (isNaN(money) || money === '' || money === null)
    };

  start();


let appData = {
    budget: {money},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,   //???
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,
    asking: function() {            //расспрашиваем пользователя в этом методе
       let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, налоги, одежда');
           appData.addExpenses = addExpenses.toLowerCase().split(', '); 
           appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }
}; 

appData.asking();

let expenses = {};


appData.getExpensesMonth = function() { 
    let sum = 0;
    let partSum = 0;

    for (let i = 0; i < 2; i++)    // ввод двух сотавляющих итоговой суммы (два прохода)
    {
        let str = prompt('Введите обязательную статью расходов?', 'бензин'); 

    do {
        partSum = +prompt('Во сколько это обойдется?'); 
    }
     while (isNaN(partSum) || partSum === '' || partSum === null); 

     //sum = sum + partSum;
     expenses[str] = partSum;
    }
for (let partSum in expenses) {
    sum += partSum;

console.log('Сумма обязательных расходов за месяц: ', sum);}

console.log(expenses);
     
};   // end of function расходы за месяц

let expensesAmount = appData.getExpensesMonth();


console.log('Сумма обязательных расходов за месяц: ', + expensesAmount + ' рублей');


appData.getAccumulatedMonth =  function() {     //возвращает накопления за месяц (=budgetMonth)
    return money - expensesAmount;
    };

let accumulatedMonth = appData.getAccumulatedMonth(); //присваиваем переменной результат вызова функции 
        console.log('Вы можете отложить в накопление: ', + accumulatedMonth + ' рублей');

let budgetDay;    //бюджет на день
    budgetDay = Math.floor(accumulatedMonth/30);
    console.log('Бюджет на день: ', + budgetDay + ' рублей');


appData.getTargetMonth = function() {    //считаем период достижения цели
    
    let goalMonth = Math.ceil(appData.mission / accumulatedMonth);
    return goalMonth;
};   // конец - считаем период достижения цели
    

if (appData.getTargetMonth() > 0) {
        console.log('Цель будет достигнута за: ', appData.getTargetMonth(), 'месяца');
    }
  else {
      console.log('Цель будет не достигнута');
  }
    
appData.getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (budgetDay <= 0) { 
        return ('Что то пошло не так'); }
};
    console.log(appData.getStatusIncome());






// let expenses1 = prompt('Введите обязательную статью расходов?', 'бензин');
// //let amount1 = +prompt('Во сколько это обойдется?');
// let expenses2 = prompt('Введите обязательную статью расходов?', 'аренда машины');
// let amount2 = +prompt('Во сколько это обойдется?');

//let amount2, amount1;

// let showTypeOf = function(data) {
//     console.log(data, typeof(data));
// }
// showTypeOf(money);
// showTypeOf(income);
// let send = prompt('Введите ваше сообщение: ');

// let stringCheck = function(callback) {
// if (typeof send === 'string');
// callback();
// console.log('Допустимо вводить только буквы');
// }


//console.log(addExpenses.length);
//console.log("Период расчета = " + period + " месяцев");
//console.log("Цель: заработать " + mission + " рублей");
//console.log(addExpenses.toLowerCase().split(', '));
//console.log('Доход в месяц: ', + money + ' рублей');
//console.log(deposit);
//console.log('Обязательная статья расходов: ', expenses1);
//console.log('Обязательная статья расходов: ', expenses2);
//console.log('Обязательные расходы: ', + amount1 + ' рублей');
//console.log('Обязательные расходы: ', + amount2 + ' рублей');

// //усложненное задание
// //условия через if
// let lang = prompt('Введите язык ru или en, чтобы увидеть дни недели: ', 'en');
// let EnRes = 'monday, tuesday, wednesday, thursday, friday, saturday, sunday';
// let RuRes = 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье';
// if (lang = 'ru') {
//     console.log(RuRes.split(' ,'));
// } else if(lang = 'en') {
//    console.log(EnRes.split(' ,'));
// }

// //условия через switch
// let lang1 = prompt('Введите язык ru или en, чтобы увидеть дни недели: ', 'en');
// let EnRes1 = 'monday, tuesday, wednesday, thursday, friday, saturday, sunday';
// let RuRes1 = 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье';
// switch(lang1) {
//     case 'en':
//         console.log(EnRes1);
//         break;
//     case 'ru':
//         console.log(RuRes1);
//         break;
//     default:
//         console.log('Вы ввели неправильное значение');
//         break;
// }

// //условия через многомерный массив
// let lang2 = prompt('Введите язык ru или en, чтобы увидеть дни недели: ', 'en');
// let arr = new Map([
//     ['en', 
//     ['monday, tuesday, wednesday, thursday, friday, saturday, sunday']],
//     ['ru',
//     ['понедельник, вторник, среда, четверг, пятница, суббота, воскресенье']],
// ]);

// arr.get('en')
// let chooseLang = lang2 === 'en' ? arr[0][0] : arr[1][0];
// console.log('Результат: ', chooseLang);

// //тернарный оператор
// let namePerson = prompt('Введите интересующего преподавателя: ', 'Артем');
// let position = (namePerson === 'Артем') ? 'директор' : (namePerson === 'Максим') ? 'преподаватель' : 'студент';
// console.log(position);


"use strict"

let money, 
    start = function() {
        do { 
        money = prompt('Ваш месячный доход?', 50000);
        
        }
        while (isNaN(money) || money.trim() === '' || money === null || money.trim() === '0')
    };

  start();


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,   
    income: {},         //дополнительные доходы
    addIncome: [],      //перечислять дополнительные доходы
    expenses: {},       //дополнительные расходы
    addExpenses: [],    //массив с возможными расходами
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,      
    mission: 50000,
    period: 6,
    asking: function() {
                    //расспрашиваем пользователя в этом методе
            if(confirm('Есть ли у вас дополнительный заработок?')) {

            let itemIncome = prompt('Какой у вас есть дополнительный источник заработка?');
                while (!isNaN(itemIncome) || itemIncome.trim() === '' || itemIncome === null) {
                  itemIncome = prompt('Какой у вас есть дополнительный источник заработка?');
                     }

            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете');

                while (isNaN(cashIncome) || cashIncome.trim() === '' || cashIncome.trim() === '0') {
                  cashIncome = prompt('Сколько в месяц вы на этом зарабатываете');
                     }
             
            appData.income[itemIncome] = cashIncome;
        }

       let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, налоги, одежда');

           appData.addExpenses = addExpenses.toLowerCase().split(', ');

           for(let key of appData.addExpenses) {
              console.log(key[0].toUpperCase() + key.slice(1));
         }

           let partSum = 0;
           
           for (let i = 0; i < 2; i++)    // ввод двух сотавляющих итоговой суммы (два прохода)
           {
               let str = prompt('Введите обязательную статью расходов?'); 
               while (!isNaN(str) || str.trim() === '' || str === null) {
                str = prompt('Введите обязательную статью расходов?');
               }
       
           do {
               partSum = prompt('Во сколько это обойдется?', 2500); 
           }
            while (isNaN(partSum) || partSum.trim() === '' || partSum === null || partSum.trim() === '0'); 
         
          appData.expenses[str] = +partSum; 

        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
     },

    getInfoDeposit: function() {        //если есть депозит в банке,то задаем эти вопросы

        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
        
                while (isNaN(parseFloat(appData.percentDeposit)) || appData.percentDeposit.trim() === '0') {
                    appData.percentDeposit = prompt('Какой годовой процент?');
                }
        
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        
                while (isNaN(parseFloat(appData.moneyDeposit)) || appData.moneyDeposit.trim() === '0') {
                    appData.moneyDeposit = prompt('Какая сумма заложена?');
                }
            }
        }

};

appData.asking();

appData.getInfoDeposit();

appData.budget = money;

appData.getExpensesMonth = function() {

for (let key in appData.expenses) {        //считаем сумму всех обязательных расходов
    appData.expensesMonth += appData.expenses[key];
   }
},

appData.getExpensesMonth();

console.log('Сумма обязательных расходов за месяц: ', + appData.expensesMonth + ' рублей');


appData.getBudget = function() {  //возвращает накопления за месяц(бюджет - обязат.расходы

appData.budgetMonth = appData.budget - appData.expensesMonth; 
appData.budgetDay = Math.floor(appData.budgetMonth/30); 

},

appData.getBudget();


appData.getTargetMonth = function() {    //считаем период достижения цели
    
    let goalMonth = Math.ceil(appData.mission / appData.budgetMonth);
    return goalMonth;
};   

if (appData.getTargetMonth() > 0) {
        console.log('Цель будет достигнута за: ', appData.getTargetMonth(), 'месяца');
    }
  else {
      console.log('Цель будет не достигнута');
  }
    
appData.getStatusIncome = function() {
    if (appData.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) { 
        return ('Что то пошло не так'); }
};
    console.log(appData.getStatusIncome());

    

appData.calcSavedMoney = function() {         //сколько заработает в указанный период
    return appData.budgetMonth * appData.period;
};



// for(let item in appData) {
//     console.log('Наша программа включает в себя данные: ' + item + ': '  + appData[item]);
// }





































//for (let key in appData) {

//console.log('Наша программа включает в себя данные: ' + budgetDay + appData[key]);}


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


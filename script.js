"use strict"
//кнопка Рассчитать
let start = document.querySelector('#start'),
//Кнопки Плюс
    btnPlusIncome = document.getElementsByTagName('button')[0];

 let  btnPlusExpenses = document.getElementsByTagName('button')[1],
//Чекбокс
    depositCheck = document.querySelector('#deposit-check'),
//Поле для ввода возможных доходов
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   // additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
//Инпуты в правой части форма
    budgetDayValue = document.querySelectorAll('.result > div > input')[1],
    expensesMonthValue = document.querySelectorAll('.result > div > input')[2],
    additionalIncomeValue = document.querySelectorAll('.result > div > input')[3],
    additionalExpensesValue = document.querySelectorAll('.result > div > input')[4],
    incomePeriodValue = document.querySelectorAll('.result > div > input')[5],
    targetMonthValue = document.querySelectorAll('.result > div > input')[6],
//Бегунок выбор периода рассчета
    periodSelect = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    incomeItems = document.querySelectorAll('.income-items'),
    salaryAmount = document.querySelector('.salary-amount');
    let budgetMonthValue = document.querySelectorAll('.result > div > input')[0];
    let periodAmount = document.querySelectorAll('.period div')[1];

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,   
    income: {}, 
    incomeMonth: 0,        //дополнительные доходы
    addIncome: [],      //перечислять дополнительные доходы
    expenses: {},       //дополнительные расходы
    addExpenses: [],    //массив с возможными расходами
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0, 
      
    start: function() {
        // do {  money = prompt('Ваш месячный доход?', 50000);}
        // while (isNaN(money) || money === null || money.trim() === ''|| money === '0');

        if(salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = +salaryAmount.value;
    
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getTargetMonth();
     
        appData.showResult();
    },

    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        //incomePeriodValue.value.addEventListener('input', appData.calcSavedMoney());
       
    },

 //Увеличиваем кол-во полей Обязательные расходы
    addExpensesBlock: function() {       
        //console.log(expensesItem.parentNode);   //обращаемся к родителю expensesItem
        let cloneExpensesItem = expensesItems[0].cloneNode(true);  //клонируем expensesItem
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');

         if(expensesItems.length === 3) {
         btnPlusExpenses.style.display = 'none';
 }
    },

    addIncomeBlock: function() {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        console.log(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
            btnPlusIncome.style.display = 'none';
    }
},

//Получение всех расходов и запись в объект
    getExpenses: function()  {

    expensesItems.forEach(function(item) { 
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    
    if(itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
        
    }
    });
}, 

    getIncome: function() {

    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;  
        }
    }
    );
    for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
    }
},

    getAddExpenses: function() {

      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
          item = item.trim();
        if (item !== '') {
            appData.addExpenses.push(item);
        }
    })
},

    getAddIncome: function() {

        additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (item.value !== " ") {
            appData.addIncome.push(itemValue);
        }
    })
},

    // asking: function() {
    //                 //расспрашиваем пользователя в этом методе
    //         if(confirm('Есть ли у вас дополнительный заработок?')) {

    //         let itemIncome = prompt('Какой у вас есть дополнительный источник заработка?');
    //             while (!isNaN(itemIncome) || itemIncome === null || itemIncome.trim() === '') {
    //               itemIncome = prompt('Какой у вас есть дополнительный источник заработка?');
    //                  }

    //         let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете');

    //             while (isNaN(cashIncome) || cashIncome === null || cashIncome.trim() === '' || cashIncome === '0') {
    //               cashIncome = prompt('Сколько в месяц вы на этом зарабатываете');
    //                  }
             
    //         appData.income[itemIncome] = cashIncome;
    //     }

    //    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, налоги, одежда');
    //         while (!isNaN(addExpenses) || addExpenses === null || addExpenses.trim() === '') {
    //             addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, налоги, одежда');
    //         }
    //        appData.addExpenses = addExpenses.toLowerCase().split(', ');

    //        for(let key of appData.addExpenses) {
    //           console.log(key[0].toUpperCase() + key.slice(1));
    //      }   
    //  },


//appData.deposit = confirm('Есть ли у вас депозит в банке?');

    getExpensesMonth: function () {

        for (let key in appData.expenses) {        //считаем сумму всех обязательных расходов
        appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function() {  //возвращает накопления за месяц(бюджет - обязат.расходы)

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; 
        appData.budgetDay = Math.floor(appData.budgetMonth/30); 

        },

    getTargetMonth: function() {    //считаем период достижения цели
        return targetAmount.value / appData.budgetMonth;
         }, 
         
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
                 return ('У вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600) {
                 return ('У вас средний уровень дохода');
            } else if (appData.budgetDay < 600) {
                 return ('К сожалению, у вас уровень дохода ниже среднего');
            } else if (appData.budgetDay <= 0) { 
                 return ('Что то пошло не так'); }
         },

    getInfoDeposit: function() {        //если есть депозит в банке,то задаем эти вопросы

        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
        
                while (isNaN(parseFloat(appData.percentDeposit)) || appData.percentDeposit === '0') {
                    appData.percentDeposit = prompt('Какой годовой процент?');
                }
        
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        
                while (isNaN(parseFloat(appData.moneyDeposit)) || appData.moneyDeposit === '0') {
                    appData.moneyDeposit = prompt('Какая сумма заложена?');
                }
            }
        },

    calcSavedMoney: function() {         //сколько заработает в указанный период
        return appData.budgetMonth * periodSelect.value;
       },
    };


let periodAmountChange = function(event) {

    periodAmount.textContent = event.target.value;
    console.log(periodAmount);
}
periodSelect.addEventListener('input', periodAmountChange);


start.addEventListener('click', appData.start);
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click', appData.addIncomeBlock);


//console.log('Сумма обязательных расходов за месяц: ', + appData.expensesMonth + ' рублей');
if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за: ', appData.getTargetMonth(), 'месяца');
 }
else {
   console.log('Цель будет не достигнута');
}

//console.log(appData.getStatusIncome());


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


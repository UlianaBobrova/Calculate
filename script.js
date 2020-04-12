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
    console.log(this);
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getTargetMonth();
     
        appData.showResult();
        appData.blocked();
    },

    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        }); 
    },
  
 //Блокировка полей после нажатия кнопки Рассчитать и очистка полей кнопка Сброс    
    blocked: function() {
        document.querySelectorAll('.data input[type=text]').forEach(function(item) {
            item.disabled = true;
        });
    
        start.style.display = 'none';
        cancel.style.display = 'block';

        cancel.addEventListener('click', function() {
            document.querySelectorAll('.calc input[type=text]').forEach(function(item) {
                item.disabled = false;
                item.value = ''; 
         });

            cancel.style.display = 'none';
            start.style.display = 'block';
        });

        },
    
//Увеличиваем кол-во полей Обязательные расходы (+)
    addExpensesBlock: function() {       
        //console.log(expensesItem.parentNode);   //обращаемся к родителю expensesItem
        let cloneExpensesItem = expensesItems[0].cloneNode(true);  //клонируем expensesItem
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');

         if(expensesItems.length === 3) {
         btnPlusExpenses.style.display = 'none';
 }
    },

//Увеличиваем кол-во полей Дополнительный доход (+)
    addIncomeBlock: function() {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        //console.log(cloneIncomeItem);
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
        this.expenses[itemExpenses] = cashExpenses;
        
    }
    }, this);
 }, 

    getIncome: function() {

    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;  
        }
    }, this);

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
},

    getAddExpenses: function() {

      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
          item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);               //??????
        }
    }, this);
},

//Ввод возможных доходов
    getAddIncome: function() {

        additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (item.value !== " ") {
            this.addIncome.push(itemValue);
        }
    },this);
},

  //считаем сумму всех обязательных расходов
 getExpensesMonth: function () {

        for (let key in this.expenses) {       
        this.expensesMonth += +this.expenses[key];
        }
    },


//возвращает накопления за месяц(бюджет - обязат.расходы)
    getBudget: function() {  

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; 
        this.budgetDay = Math.floor(this.budgetMonth/30); 
        },

//считаем период достижения цели
    getTargetMonth: function() {    
        return targetAmount.value / this.budgetMonth;
         }, 
         
    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
                 return ('У вас высокий уровень дохода');
            } else if (this.budgetDay >= 600) {
                 return ('У вас средний уровень дохода');
            } else if (this.budgetDay < 600) {
                 return ('К сожалению, у вас уровень дохода ниже среднего');
            } else if (this.budgetDay <= 0) { 
                 return ('Что то пошло не так'); }
         },

//если есть депозит в банке,то задаем эти вопросы
    getInfoDeposit: function() {        

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

//сколько заработает в указанный период
    calcSavedMoney: function() {         
        return this.budgetMonth * periodSelect.value;
       },
    };

//Значение бегунка range
let periodAmountChange = function(event) {
    periodAmount.textContent = event.target.value;    //element.target.value
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

 // blocked: function() {
    // document.querySelectorAll('.data input[type=text]').forEach(function(item) {
    //     item.disabled = true;
    // });

    // start.style.display = 'none';
    // cancel.style.display = 'block';

    // },





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
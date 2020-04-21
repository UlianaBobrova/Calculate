"use strict";
//кнопка Рассчитать
const start = document.querySelector('#start'),
//Кнопки Плюс
      btnPlusIncome = document.getElementsByTagName('button')[0],
      btnPlusExpenses = document.getElementsByTagName('button')[1],
//Чекбокс
      depositCheck = document.querySelector('#deposit-check'),
//Поле для ввода возможных доходов
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
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
      incomeTitle = document.querySelectorAll('.income-title')[1],
      salaryAmount = document.querySelector('.salary-amount'),
      budgetMonthValue = document.querySelectorAll('.result > div > input')[0],
      periodAmount = document.querySelectorAll('.period div')[1];
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

class AppData  {
    constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;   
    this.income = {}; 
    this.incomeMonth = 0;        //дополнительные доходы
    this.addIncome = [];      //перечислять дополнительные доходы
    this.expenses = {};       //дополнительные расходы
    this.addExpenses = [];    //массив с возможными расходами
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
}

changePercent() {
    const valueSelect = this.value;
  
    if (valueSelect === 'other') {
        depositPercent.value = '';
        depositPercent.style.display = 'inline-block';
       
    } else {
        depositPercent.value = valueSelect;
        depositPercent.style.display = 'none';
    }
}

depositHandler() {
    if (depositCheck.checked) {
        console.log('check');
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
    } else {
        console.log('uncheck');
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
    }
}

checkPercent() {

     const inputValue = depositPercent.value;

     if (isNaN(parseFloat(inputValue)) || inputValue === '' || inputValue < 1 || inputValue > 100) {
         alert('Введите значение от 1 до 100:');
         depositPercent.value = '';
         return;
    }
}

checkNumber() {

        const inputNumber = depositAmount.value;

        if (isNaN(parseFloat(inputNumber)) || inputNumber === '') {
            alert('Введите только цифры');
            depositAmount.value = '';
            return;
        }
}

eventListeners() {

    //Значение бегунка range
    const periodAmountChange = (event) => {
        periodAmount.textContent = event.target.value; 
    }
    periodSelect.addEventListener('input', periodAmountChange);
    
    start.addEventListener('click', this.start.bind(this)); 

   btnPlusExpenses.addEventListener('click', this.addExpensesBlock);
   btnPlusIncome.addEventListener('click', this.addIncomeBlock);

   depositCheck.addEventListener('change', this.depositHandler.bind(this));
   depositAmount.addEventListener('input', this.checkNumber.bind(this));
   depositPercent.addEventListener('input', this.checkPercent.bind(this));
    
}

start() {

    if(salaryAmount.value === '') {
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        return;
    }
    this.budget = +salaryAmount.value;

    // this.getAddExpInc(additionalExpensesItem, this.addExpenses);
    // this.getAddExpInc(additionalIncomeItem, this.addIncome);
    this.getExpInc();
    this.getAddIncome();
    this.getAddExpenses();
    // this.getExpenses();
    // this.getIncome();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();
    this.showResult();
    this.blocked();
}

showResult() {
    budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney;
        }); 
}

    //Блокировка полей после нажатия кнопки Рассчитать и очистка полей кнопка Сброс    
blocked() {

    const dataInput =  document.querySelectorAll('.data input');

    dataInput.forEach((item) => {
        item.disabled = true;
        });

    start.style.display = 'none';
    cancel.style.display = 'block';

    cancel.addEventListener('click', () => { 

    document.querySelectorAll('.calc input').forEach((item) => {
            item.disabled = false;
            item.value = ''; 
    });
        cancel.style.display = 'none';
        depositCheck.checked = false;
        depositBank.value = '';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        start.style.display = 'block';
    });
}

//Увеличиваем кол-во полей Обязательные расходы (+)
addExpensesBlock() { 

    //console.log(expensesItem.parentNode);   //обращаемся к родителю expensesItem
    let cloneExpensesItem = expensesItems[0].cloneNode(true);  //клонируем expensesItem
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');

     if(expensesItems.length === 3) {
     btnPlusExpenses.style.display = 'none';
    }
}

// Увеличиваем кол-во полей Дополнительный доход (+)
addIncomeBlock() {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
   
    if(incomeItems.length === 3) {
        btnPlusIncome.style.display = 'none';
    }
}

// addExIncBlock(itemSelector, btnPlus) { 

//     let itemsPlus = document.querySelectorAll(itemSelector);

//     let cloneItemsPlus = itemsPlus[0].cloneNode(true);
//     itemsPlus[0].parentNode.insertBefore(cloneItemsPlus, btnPlus);
 
//     // if (itemsPlus.length === 3) {
//     // btnPlus.style.display = 'none';
//     //   }
//  }

//Суммирование дополнительных доходов и расходов
getExpInc() {

    const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(` .${startStr}-title `).value;
        const itemAmount =  item.querySelector(` .${startStr}-amount`).value;

        if(itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = itemAmount; 
        }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
} 
    
// записываем и выводим возможные расходы
getAddExpenses() {

    const addExpenses1 = additionalExpensesItem.value.split(',');

    addExpenses1.forEach((item) => {
        let itemValue = item.trim();
        if (itemValue !== '') {
        this.addExpenses.push(itemValue);             
        }
    });
}


//Ввод возможных доходов
getAddIncome() {

    additionalIncomeItem.forEach((item) => {

    const itemValue = item.value.trim();
        if (itemValue !== '') {
        this.addIncome.push(itemValue);
        };
    });
}

// getAddExpInc(data, arrPush) { 

//     let addIncExp = data;
//     console.log(addIncExp);
//     if (typeof(data) === 'string') {
//         addIncExp = data.value.split(','); }
  
//         addIncExp.forEach((item) => {
//         //let arrPush = item.className.split('-')[0];
//         let itemValue = item.value || item;
//         itemValue = itemValue.trim(); 
//         if (itemValue !== '')
//         this[arrPush].push(itemValue);
//             });
// }

//считаем сумму всех обязательных расходов
getExpensesMonth() {

    for (let key in this.expenses) {       
    this.expensesMonth += +this.expenses[key];
    }
}

//возвращает накопления за месяц(бюджет - обязат.расходы)
getBudget() {  

    const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit; 
    this.budgetDay = Math.floor(this.budgetMonth/30); 
}

//считаем период достижения цели  
getTargetMonth() {  

    return targetAmount.value / this.budgetMonth;
}
     
getStatusIncome() {

    if (this.budgetDay >= 1200) {
             return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
             return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600) {
             return ('К сожалению, у вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) { 
             return ('Что то пошло не так'); }
}

//если есть депозит в банке,то задаем эти вопросы 
getInfoDeposit() { 

    if (this.deposit) {
        
        this.percentDeposit = depositPercent.value;
    
            // while (isNaN(parseFloat(this.percentDeposit)) || this.percentDeposit === '' || this.percentDeposit <= 1 || this.percentDeposit >100) {
            //     alert('Введите верную цифру');
            //     //start.disabled = true;
            //     return;
                
            //     // this.percentDeposit = prompt('Какой годовой процент?');
            // }
        this.moneyDeposit = depositAmount.value; 
    
            // while (isNaN(parseFloat(this.moneyDeposit)) || this.moneyDeposit === '') {
            //     // this.moneyDeposit = prompt('Какая сумма заложена?');
            //     alert('Введите только цифры');
            //     //start.disabled = true;
            //     return;
            
    }
}

//сколько заработает в указанный период  
calcSavedMoney() {  

    return this.budgetMonth * periodSelect.value;
}
}

const appData = new AppData();  

appData.eventListeners();










































//console.log('Сумма обязательных расходов за месяц: ', + appData.expensesMonth + ' рублей');
// if (this.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за: ', this.getTargetMonth(), 'месяца');
//  }
// else {
//    console.log('Цель будет не достигнута');
// }


// for(let item in appData) {
//     console.log('Наша программа включает в себя данные: ' + item + ': '  + appData[item]);
// }






// //Получение всех расходов и запись в объект
// getExpenses()  {

//     expensesItems.forEach((item) => { 
//     let itemExpenses = item.querySelector('.expenses-title').value;
//     let cashExpenses = item.querySelector('.expenses-amount').value;

//     if(itemExpenses !== '' && cashExpenses !== '') {
//         this.expenses[itemExpenses] = cashExpenses;
    
//          }
//       });
//     }

// //Суммирование дополнительных доходов
// getIncome() {

// incomeItems.forEach((item) => {
//     let itemIncome = item.querySelector('.income-title').value;
//     let cashIncome = item.querySelector('.income-amount').value;

//     if(itemIncome !== '' && cashIncome !== '') {
//         this.income[itemIncome] = cashIncome;  
//           }
//       });

// for (let key in this.income) {
//     this.incomeMonth += +this.income[key];
//       }
//     }






























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
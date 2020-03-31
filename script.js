let money, income, addExpenses, deposit, mission, period;

money = +prompt('Ваш месячный доход?');
income = 'Фриланс';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, налоги, одежда');
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 17000;
period = 6;

let expenses1 = prompt('Введите обязательную статью расходов?', 'бензин');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?', 'аренда машины');
let amount2 = +prompt('Во сколько это обойдется?');

let showTypeOf = function(data) {
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth(a1, a2) {    //расходы за месяц
    const sum = a1 + a2;
    return sum;
    } 
    console.log('Сумма обязательных расходов за месяц: ', + getExpensesMonth(amount1, amount2) + ' рублей');

    console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));

function getAccumulatedMonth(a1, a2, money) {     //возвращает накопления за месяц (=budgetMonth)
        const res = money - (a1 + a2);
        return res;
    }
    let accumulatedMonth = getAccumulatedMonth(amount1, amount2, money); //присваиваем переменной результат вызова функции 
        //console.log('Вы можете отложить в накопление: ', + accumulatedMonth + ' рублей');

let budgetDay;    //бюджет на день
    budgetDay = Math.floor(accumulatedMonth/30);
    console.log('Бюджет на день: ', + budgetDay + ' рублей');

function getTargetMonth(mis, month) {    //считаем период достижения цели
    let goalMonth = Math.ceil(mis / month);
    return goalMonth;
    }
    console.log('Цель будет достигнута за: ', getTargetMonth(mission, accumulatedMonth), 'месяца');

let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (budgetDay <= 0) { 
        return ('Что то пошло не так'); }
}
    console.log(getStatusIncome());



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
// let arr = [
//     ['monday, tuesday, wednesday, thursday, friday, saturday, sunday'],
//     ['понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'],
// ];

// let chooseLang = lang2 === 'en' ? arr[0][0] : arr[1][0];
// console.log('Результат: ', chooseLang);

// //тернарный оператор
// let namePerson = prompt('Введите интересующего преподавателя: ', 'Артем');
// let position = (namePerson === 'Артем') ? 'директор' : (namePerson === 'Максим') ? 'преподаватель' : 'студент';
// console.log(position);


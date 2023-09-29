'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Compute usernames
const createUsernames = function (accs){
  accs.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
};
createUsernames(accounts);
console.log(accounts);

//Display movements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin',html);
  });
};

//Calculate and Display balance
const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc,mov)=> acc+mov,0);
  labelBalance.innerHTML = `${balance}$`;
};

//Display Summary (Deposit, Withdraw, Interest)
const calcDisplaySummary = function (acc){
  const incomes = acc.movements.filter(mov => mov>0)
  .reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent = `${incomes}€`
  const out = acc.movements.filter(mov => mov <0)
  .reduce((acc,mov) => acc+mov,0);
  labelSumOut.textContent = `${Math.abs(out)}€`
  const interest = acc.movements.filter(mov => mov>0)
  .map(deposit => deposit * acc.interestRate/100)
  .filter(int => int >= 1)
  .reduce((acc,interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
  console.log(interest)
};

let currentAccount;
//Event handler with log in button 
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  //find the current account
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display movements
    displayMovements(currentAccount.movements);
    //Display balance
    calcDisplayBalance(currentAccount.movements);
     //Display summary
    calcDisplaySummary(currentAccount);
    }
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.userName === inputTransferTo.value);
  console.log(receiverAccount, amount);
  currentAccount.movements.push(-amount);
  //Current account display movement, balance, summary
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount.movements);
  calcDisplaySummary(currentAccount); 
  //Display receiver account
 
});

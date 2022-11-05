let btnAdd = document.querySelector(".btn-add");

let ulIn = document.querySelector(".in_money-elements");
let ulOut = document.querySelector(".out_money-elements");

let inputName = document.querySelector(".inp-name");
let moneyIn = document.querySelector(".inp-money");
let totalIn = document.querySelector(".total-in");

let outName = document.querySelector(".out-name");
let moneyOut = document.querySelector(".out-money");
let totalOut = document.querySelector(".total-out");

let totalUse = document.querySelector(".total-use");
let balance = document.querySelector(".balance");

function addLiAndBtn(name, money, classUl) {
  let li = document.createElement("li");
  let edit = document.createElement("button");
  edit.classList.add("btn-edit");
  edit.classList.add("btn-all");

  edit.name = "edit";
  let del = document.createElement("button");
  del.classList.add("btn-del");
  del.classList.add("btn-all");

  del.name = "delete";

  let span = document.createElement("span");
  span.classList.add("span-add");
  let ul = document.querySelector(classUl);

  span.textContent = `${name} - ${money} zł`;
  [span, edit, del].map((item) => {
    li.appendChild(item);
  });

  return ul.appendChild(li);
}

function plusSumma(item, classByTotal) {
  let total = document.querySelector(classByTotal);
  let numberTotal = Number(parseFloat(total.textContent).toFixed(2));

  total.textContent = numberTotal + Number(parseFloat(item).toFixed(2));
  balanceAll();
}

function minusSumma(item, classByTotal) {
  let total = document.querySelector(classByTotal);
  if (total.textContent === "0") {
    total.textContent = 0;
  } else {
    total.textContent = parseFloat(total.textContent).toFixed(2) - item;
  }

  balanceAll();
}

function balanceAll() {
  let summa = Number(totalIn.textContent) - Number(totalOut.textContent);
  summa = summa.toFixed(2);
  if (summa < 0) {
    balance.textContent =
      "Wasz bilans przebił podlogę " +
      (totalUse.textContent = `${summa} zł proszę poprawić`);
  } else {
    balance.textContent =
      "Mozesz jeszcze wydać " + (totalUse.textContent = `${summa} zł`);
  }
}

function checkValue(classUL, totalClass, money, namePayment) {
  let moneyFn = parseFloat(money.value).toFixed(2);
  // moneyFn = moneyFn.toFixed(2);
  if (moneyFn < 0) {
    moneyFn = -1 * parseFloat(moneyFn).toFixed(2);
  }
  if (typeof parseFloat(moneyFn) !== "number" || moneyFn.length == 0) {
    alert("add payment");
  } else if (namePayment.length < 3 || typeof namePayment !== "string") {
    alert("add a payment name");
  } else {
    addLiAndBtn(namePayment, parseFloat(moneyFn).toFixed(2), classUL);
    plusSumma(parseFloat(moneyFn).toFixed(2), totalClass);
  }
}

btnAdd = (element) => {
  if (element.name === "out") {
    let classUL = ".out_money-elements";
    let totalClass = ".total-out";
    checkValue(classUL, totalClass, moneyOut, outName.value.trim());
    outName.value = "";
    moneyOut.value = "";
  } else if (element.name === "in") {
    let classUL = ".in_money-elements";
    let totalClass = ".total-in";
    checkValue(classUL, totalClass, moneyIn, inputName.value.trim());
    inputName.value = "";
    moneyIn.value = "";
  }
};

function btnEdit(totalClass, spanLi, li, button) {
  const inputText = document.createElement("input");
  const inputMoney = document.createElement("input");
  inputMoney.classList.add("edit-money");
  inputMoney.pattern = "^d*(.d{0,2})?$";
  inputText.classList.add("edit-name");
  let index = spanLi.textContent.split(" ");

  inputText.type = "text";
  inputMoney.type = "number";

  inputText.value = index[0];
  inputMoney.value = index[2];
  minusSumma(parseFloat(inputMoney.value).toFixed(2), totalClass);
  li.insertBefore(inputText, spanLi);
  inputText.after(inputMoney);
  li.removeChild(spanLi);
  button.name = "save";
  button.classList.add("btn-save");
  button.classList.remove("btn-edit");
}

function btnSave(totalClass, spanLi, li, button) {
  // const inText1 = li.firstElementChild;
  const inText = document.querySelector(".edit-name");
  const inMoney = document.querySelector(".edit-money");
  const span = document.createElement("span");
  span.classList.add("span-container");
  if (inMoney.value.length === 0) {
    inMoney.value = 0;
  }

  span.textContent =
    inText.value + " - " + parseFloat(inMoney.value).toFixed(2) + " zł";
  plusSumma(parseFloat(inMoney.value).toFixed(2), totalClass);
  li.insertBefore(span, spanLi);
  li.removeChild(inText);
  li.removeChild(inMoney);
  button.name = "edit";
  button.classList.remove("btn-save");
  button.classList.add("btn-edit");
}

function btnDelete(totalClass, spanLi) {
  let arrayChar = spanLi.textContent.split(" ");

  let money;
  for (let i = 0; i < arrayChar.length; i++) {
    if (arrayChar[i] === "-") {
      money = arrayChar[i + 1];
    }
  }

  minusSumma(parseFloat(money), totalClass);
}
function selectEditOrDeleteOrSave(e, totalClass) {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const span = li.firstElementChild;
    if (button.name === "delete") {
      btnDelete(totalClass, span);
      ul.removeChild(li);
    } else if (button.name === "edit") {
      btnEdit(totalClass, span, li, button);
    } else if (button.name === "save") {
      btnSave(totalClass, span, li, button);
    }
  }
}

ulIn.addEventListener("click", (e) => {
  let totalClass = ".total-in";
  selectEditOrDeleteOrSave(e, totalClass);
});

ulOut.addEventListener("click", (e) => {
  let totalClass = ".total-out";
  selectEditOrDeleteOrSave(e, totalClass);
});

  
    



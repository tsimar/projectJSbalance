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
  total.textContent = item + parseFloat(total.textContent);
  balanceAll();
}

function minusSumma(item, classByTotal) {
  let total = document.querySelector(classByTotal);
  if (total.textContent === "0") {
    total.textContent = 0;
  } else {
    total.textContent = parseFloat(total.textContent) - item;
  }

  balanceAll();
}

function balanceAll() {
  let summa =
    parseFloat(totalIn.textContent) - parseFloat(totalOut.textContent);
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
  if (typeof parseFloat(money.value) !== "number" || money.value.length == 0) {
    alert("add payment");
  } else if (
    namePayment.value.length < 3 ||
    typeof namePayment.value !== "string"
  ) {
    alert("add a payment name");
  } else {
    addLiAndBtn(namePayment.value, parseFloat(money.value), classUL);
    plusSumma(parseFloat(money.value), totalClass);
  }
}

btnAdd = (element) => {
  if (element.name === "out") {
    let classUL = ".out_money-elements";
    let totalClass = ".total-out";
    checkValue(classUL, totalClass, moneyOut, outName);
    outName.value = "";
    moneyOut.value = "";
  } else if (element.name === "in") {
    let classUL = ".in_money-elements";
    let totalClass = ".total-in";
    checkValue(classUL, totalClass, moneyIn, inputName);
    inputName.value = "";
    moneyIn.value = "";
  }
};

function btnEdit(totalClass, spanLi, li, button) {
  const inputText = document.createElement("input");
  const inputMoney = document.createElement("input");
  inputMoney.classList.add("edit-money");
  inputText.classList.add("edit-name");
  let index = spanLi.textContent.split(" ");

  inputText.type = "text";
  inputMoney.type = "number";

  inputText.value = index[0];
  inputMoney.value = index[2];
  minusSumma(parseFloat(inputMoney.value), totalClass);
  li.insertBefore(inputText, spanLi);
  inputText.after(inputMoney);
  li.removeChild(spanLi);
  button.name = "save";
  button.classList.add("btn-save");
  button.classList.remove("btn-edit");
}
function btnSave(totalClass, spanLi, li, button) {
  const inText = li.firstElementChild;
  const inMoney = document.querySelector(".edit-money");
  const span = document.createElement("span");
  span.classList.add("span-container");
  if (inMoney.value.length === 0) {
    inMoney.value = 0;
  }
  span.textContent = `${inText.value} - ${inMoney.value}  zł`;
  plusSumma(parseFloat(inMoney.value), totalClass);
  li.insertBefore(span, inText);
  li.removeChild(inText);
  li.removeChild(inMoney);
  button.name = "edit";
  button.classList.remove("btn-save");
  button.classList.add("btn-edit");
}

function btnDelete(totalClass, spanLi) {
  let index = spanLi.textContent.split(" ");
  let Money = index[2];
  minusSumma(parseFloat(Money), totalClass);
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
  totalClass = ".total-out";
  selectEditOrDeleteOrSave(e, totalClass);
});

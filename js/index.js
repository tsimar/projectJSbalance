// document.addEventListener(DOMException, function () {
let btnInAdd = document.querySelector(".btn-in-add");
let btnOutAdd = document.querySelector(".btn-out-add");
let ulIn = document.querySelector(".in_money-elements");
let ulOut = document.querySelector(".out_money-elements");

let inputName = document.querySelector(".inp-name");
let moneyIn = document.querySelector(".inp-money");
let totalIn = document.querySelector(".total-in");

let outName = document.querySelector(".out-name");
let moneyOut = document.querySelector(".out-money");
let totalOut = document.querySelector(".total-out");

let totalUs = document.querySelector(".total-us");
let balance = document.querySelector(".balance");

function addLiAndBtn(name, money, classUl) {
  let li = document.createElement("li");
  let edit = document.createElement("button");
  edit.classList.add("btn-edit");

  edit.name = "edit";
  let del = document.createElement("button");
  del.classList.add("btn-del");

  del.name = "delete";

  let span = document.createElement("span");
  span.classList.add("span-add");
  let div = document.querySelector(classUl);

  span.textContent = name + " - " + money + " zł";
  [span, edit, del].map((item) => {
    li.appendChild(item);
  });

  return div.appendChild(li);
}
function plusSumma(item, classByTotal) {
  let total = document.querySelector(classByTotal);
  total.textContent = item + parseFloat(total.textContent);
  balanceAll();
}
function minusSumma(item, classByTotal) {
  let total = document.querySelector(classByTotal);
  total.textContent = parseFloat(total.textContent) - item;
  balanceAll();
}
function balanceAll() {
  let summa =
    parseFloat(totalIn.textContent) - parseFloat(totalOut.textContent);
  if (summa < 0) {
    balance.textContent =
      "Was balans przebił podlogę " +
      (totalUs.textContent = summa + " zł proszę poprawić");
  } else {
    balance.textContent =
      "Mozesz jeszcze wydać " + (totalUs.textContent = summa + " zł");
  }
}

btnInAdd.addEventListener("click", () => {
  let classUL = ".in_money-elements";
  let totalClass = ".total-in";
  if (
    typeof parseFloat(moneyIn.value) !== "number" ||
    moneyIn.value.length == 0
  ) {
    alert("add payment");
  } else if (
    inputName.value.length < 3 ||
    typeof inputName.value !== "string"
  ) {
    alert("add a payment name");
  } else {
    addLiAndBtn(inputName.value, parseFloat(moneyIn.value), classUL);
    plusSumma(parseFloat(moneyIn.value), totalClass);

    inputName.value = "";
    moneyIn.value = "";
  }
});

btnOutAdd.addEventListener("click", () => {
  let classUL = ".out_money-elements";
  let totalClass = ".total-out";
  if (
    typeof parseFloat(moneyOut.value) !== "number" ||
    moneyOut.value.length == 0
  ) {
    alert("add payment");
  } else if (outName.value.length < 3 || typeof outName.value !== "string") {
    alert("add a payment name");
  } else {
    addLiAndBtn(outName.value, parseFloat(moneyOut.value), classUL);
    plusSumma(parseFloat(moneyOut.value), totalClass);

    outName.value = "";
    moneyOut.value = "";
  }
});
function btnEdit(totalClass, spanLi, li, button) {
  const inputText = document.createElement("input");
  const inputMoney = document.createElement("input");
  inputMoney.classList.add("input-money");
  inputText.classList.add("input-name");
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
  const inMoney = document.querySelector(".input-money");
  const span = document.createElement("span");
  span.classList.add("span-container");
  span.textContent = inText.value + " - " + inMoney.value + " zł";
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
ulIn.addEventListener("click", (e) => {
  let totalClass = ".total-in";
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
});
ulOut.addEventListener("click", (e) => {
  let totalClass = ".total-out";
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
});

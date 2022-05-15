let btnInAdd = document.querySelector(".btn-in");
let btnOutAdd = document.querySelector(".btn-out");
let ulIn = document.querySelector(".in_money-elements");

let inputName = document.querySelector(".name-in");
let moneyIn = document.querySelector(".money-in");
let totalIn = document.querySelector(".total-in");

let outName = document.querySelector(".name-out");
let moneyOut = document.querySelector(".money-out");
let totalOut = document.querySelector(".total-out");

let totalUs = document.querySelector(".total-us");
let balance = document.querySelector(".balance");

function addLiAndBtn(name, money, classByTotal, classUl) {
  let total = document.querySelector(classByTotal);
  let li = document.createElement("li");
  let edit = document.createElement("button");
  edit.classList.add("btn-edit");

  edit.innerHTML = "edit";
  let del = document.createElement("button");
  del.classList.add("btn-del");

  del.innerHTML = "delete";

  let span = document.createElement("span");
  let div = document.querySelector(classUl);

  span.innerHTML = name + " - " + money + " zł";
  [span, edit, del].map((item) => {
    li.appendChild(item);
  });

  total.innerHTML = money + parseFloat(total.textContent);
  return div.appendChild(li);
}

function balanceAll() {
  let summa =
    parseFloat(totalIn.textContent) - parseFloat(totalOut.textContent);
  if (summa < 0) {
    balance.innerHTML =
      "Was balans przebił podlogę " +
      (totalUs.innerHTML = summa + " zł proszę poprawić");
  } else {
    balance.innerHTML =
      "Mozesz jeszcze wydać " + (totalUs.innerHTML = summa + " zł");
  }
}

btnInAdd.addEventListener("click", () => {
  let classUL = ".in_money-elements";
  let totalClass = ".total-in";
  addLiAndBtn(inputName.value, parseFloat(moneyIn.value), totalClass, classUL);
  balanceAll();
});

btnOutAdd.addEventListener("click", () => {
  let classUL = ".out_money-elements";
  let totalClass = ".total-out";
  addLiAndBtn(outName.value, parseFloat(moneyOut.value), totalClass, classUL);
  balanceAll();
});

ulIn.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === "delete") {
      ul.removeChild(li);
    }
  }
});

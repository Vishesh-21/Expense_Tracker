// DOM elements
const amount = document.querySelector("#itemPrice");
const itemName = document.querySelector("#itemName");
const clearAll = document.querySelector("#clearItem");
const addItem = document.querySelector("#addItem");
const total = document.querySelector("#total");
const del = document.querySelector(".del");

// Variables
let sum = 0;
let itemArray = [];

// Load items from local storage when the window loads
window.addEventListener("load", () => {
  const items = localStorage.getItem("items");
  if (items) {
    itemArray = JSON.parse(items);
    list();
  }
});

// Add an item to localStorage
addItem.addEventListener("click", () => {
  const price = amount.value;
  const name = itemName.value;
  if (price && name) {
    itemArray.push([name, price]);
    localStorage.setItem("items", JSON.stringify(itemArray));
    amount.value = "";
    itemName.value = "";
    list();
  }
});

// Display the items and their prices
function list() {
  let str = "";
  sum = 0;
  itemArray.forEach((ele) => {
    const num = parseFloat(ele[1]);
    sum += num;
    str += ` <div id="showItem">
            <p> ${ele[0]} : &#8377 ${num.toFixed(2)}</p>
            <div class="del" >&#9932</div>
           </div>`;
  });
  document.querySelector("#listItem").innerHTML = str;
  total.innerHTML = `&#8377 ${sum.toFixed(2)}`;
}

// Clear all items from local storage
clearAll.addEventListener("click", () => {
  localStorage.removeItem("items");
  itemArray.splice(0, itemArray.length);
  list();
});

// function to delete an specific element form the localstorage
// Attach event listener to dynamically generated "del" elements

document.getElementById("listItem").addEventListener("click", (event) => {
  if (event.target.classList.contains("del")) {
    // Find the index of the clicked item
    const index = Array.from(
      event.target.parentNode.parentNode.children
    ).indexOf(event.target.parentNode);
    itemArray.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(itemArray));
    list();
  }
});

// In the above block of code we use the concept of event delegation

let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  submit = document.getElementById("submit"),
  searchInp = document.getElementById("search"),
  tbody = document.getElementById("tbody"),
  byTitleBtn = document.getElementById("by-title"),
  byategoryBtn = document.getElementById("by-category"),
  deleteAllDiv = document.getElementById("delete-all");

let mood = "create",
  tmp,
  searchMood = "Title";

//[1] Get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.textContent = result;
    total.style.backgroundColor = "#007830";
  } else {
    total.textContent = "";
    total.style.backgroundColor = "#950000";
  }
}

//________________________________

//[2] create products
let productArray;
if (localStorage.product != null) {
  productArray = JSON.parse(localStorage.product);
} else {
  productArray = [];
}

submit.onclick = function () {
  let newProductOpject = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //---------[2] create-------//
  if( title.value != "" && price.value != "" && 
  category.value != "" && count.value < 100) {
    if (mood === "create") {
    //---------[6] count-------//
    if (newProductOpject.count > 1) {
      for (let i = 0; i < newProductOpject.count; i++) {
        productArray.push(newProductOpject);
      }
    } else {
      productArray.push(newProductOpject);
    }
    } else {
        //---------[7] Update-------//
        productArray[tmp] = newProductOpject;
        submit.innerHTML = "Create";
        count.style.display = "block";
        mood = "create";
    }
    clearInputs();

  }
  

  localStorage.setItem("product", JSON.stringify(productArray));
  showData();
  getTotal();
};

//________________________________

//[3] clear inputs

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//________________________________

//[4] Read

function showData() {
  let table = "";
  for (let i = 0; i < productArray.length; i++) {
    table += `
         <tr>
         <td>${i + 1}</td>
         <td>${productArray[i].title}</td>
         <td>${productArray[i].price}</td>
         <td>${productArray[i].taxes}</td>
         <td>${productArray[i].ads}</td>
         <td>${productArray[i].discount}</td>
         <td>${productArray[i].total}</td>
         <td>${productArray[i].category}</td>
         <td><button onclick="updateProduct(${i})" id="update">update</button></td>
         <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
     </tr> 
            `;
  }
  tbody.innerHTML = table;

  //--------[5] Create Delete All btn ------//
  if (productArray.length > 0) {
    deleteAllDiv.innerHTML = `<button onclick = "deleteAll()" class="delete-all">Delete All [${productArray.length}]</button>`;
  } else {
    deleteAllDiv.innerHTML = "";
  }
}
showData();

//________________________________

//[5] Delete product

function deleteProduct(i) {
  productArray.splice(i, 1);
  localStorage.product = JSON.stringify(productArray);
  showData();
}

//________________________________

//[5] Delete All product =>the btn created in showData function ^

function deleteAll() {
  localStorage.clear();
  productArray.splice(0);
  showData();
}

//________________________________

//[6] count => in main function ^
//_______________________________

//[7] Update
function updateProduct(i) {
  title.value = productArray[i].title;
  price.value = productArray[i].price;
  taxes.value = productArray[i].taxes;
  ads.value = productArray[i].ads;
  discount.value = productArray[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = productArray[i].category;
  submit.innerHTML = "Update";
  mood = "update";  
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  })

}
//_______________________________

//[8] search
function getSearchMood(id) {
  if (id === "by-title") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  searchInp.placeholder = `Search By ${searchMood}`;
  searchInp.value = "";
  searchInp.focus();
}

function srarchData(value) {
  let table = "";

  for (let i = 0; i < productArray.length; i++) {
    if (searchMood === "Title") {
      if (productArray[i].title.includes(value.toLowerCase())) {
        table += `            
                    <tr>
                    <td>${i + 1}</td>
                    <td>${productArray[i].title}</td>
                    <td>${productArray[i].price}</td>
                    <td>${productArray[i].taxes}</td>
                    <td>${productArray[i].ads}</td>
                    <td>${productArray[i].discount}</td>
                    <td>${productArray[i].total}</td>
                    <td>${productArray[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr> 
                    `;
      }
    } else if (productArray[i].category.includes(value.toLowerCase())) {
      table += `            
            <tr>
            <td>${i + 1}</td>
            <td>${productArray[i].title}</td>
            <td>${productArray[i].price}</td>
            <td>${productArray[i].taxes}</td>
            <td>${productArray[i].ads}</td>
            <td>${productArray[i].discount}</td>
            <td>${productArray[i].total}</td>
            <td>${productArray[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr> 
            `;
    }
  }
  tbody.innerHTML = table;
}

//_______________________________

/*
    1- create
      -get total
      -create product
      -save at local storage
      -clear inputs
      -count
    
    2- read

    3-delete
      -delete one
      -delete all

    4- update
    
    5-search
     
    6-clean data
      
*/

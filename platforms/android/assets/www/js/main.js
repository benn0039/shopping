// JAVASCRIPT

document.addEventListener("DOMContentLoaded", init);
var myList = [];
function init () {
    disableButton();
    checkStorage();
    document.querySelector("#addItem").addEventListener("input", checkInput);      // check input field
    document.querySelector("#addItem").addEventListener("keydown", checkInput);  // catch enter/return key
    
    document.querySelector(".btn").addEventListener("click", function(ev){      // listen for add buttton
        ev.preventDefault();
        addToList();
  });
}

function checkInput(ev) {
    var textValue = document.querySelector("#addItem").value; 
    if(textValue !=""){
        enableButton();     // enable button once there is a value in the input field.
    } else {
        disableButton();    // if backspacing and the field becomes empty button is disabled
    }
    if(ev.keyCode==13 && textValue !="") {
        addToList();
    }
}

function addToList() {
    var newItem = document.querySelector("#addItem");
    myList.push({"description":newItem.value, "state":0});
    sortArray();
    
    disableButton();
    localStorage.setItem("grocery-benn0039", JSON.stringify(myList) );
    newItem.value = "";
    showList();
    return false;
}

function checkStorage() {
    if(localStorage.getItem("grocery-benn0039")){
        myList = JSON.parse(localStorage.getItem("grocery-benn0039"));
        sortArray();
        showList();
    } else {
        welcomePage();
    }
}

function disableButton() {
    var btn = document.querySelector(".btn");
    var textBox = document.querySelector("#addItem");
    btn.style.opacity ='0'
    btn.style.width = '0';
    textBox.style.width = '96%';
    btn.style.marginLeft = '0';
}

function enableButton() {                   
    var btn = document.querySelector(".btn");
    var textBox = document.querySelector("#addItem");
    btn.style.width = '20%';
    textBox.style.width = '80%';
    btn.style.marginLeft = '2%';
    btn.style.opacity ='1';
}

function welcomePage() {
    var output = document.querySelector(".content");
    var newFrag = document.createDocumentFragment();
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "welcome");
    newFrag.appendChild(newDiv);
    var newHeader = document.createElement("h2");
    newHeader.innerHTML = "Sweet!";
    newDiv.appendChild(newHeader);
    var newP = document.createElement("p");
    newP.innerHTML = "no list means no shopping";
    newDiv.appendChild(newP);
    var newP1 = document.createElement("p");
    newP1.innerHTML = "no shopping means more beer";
    newDiv.appendChild(newP1);
    output.appendChild(newFrag);
}

function showList(){
    var output = document.querySelector(".content");
    //document.querySelector("#addItem").focus();
    output.innerHTML = "";
    for(var i=0;i<myList.length;i++){
        var p = document.createElement("p");
        p.setAttribute("class", "item");
        p.innerHTML = myList[i].description;
        if (myList[i].state == 1) {
            p.style.textDecoration = 'line-through';  
            var del = document.createElement('img');
            del.setAttribute('src', 'img/delete.svg')
            del.setAttribute('class', 'delete');
            p.appendChild(del);
            del.addEventListener("click", removeItem);
        }
        output.appendChild(p);
        p.addEventListener("click", markItem);
    }
}

function removeItem(ev){
    var parent = ev.currentTarget.parentElement;
    var txt = parent.firstChild.nodeValue;
    for(var i=0;i<myList.length;i++){
  	if(myList[i].description == txt){
        myList.splice(i, 1);
    }
  }
    if (myList.length != 0) {
        localStorage.setItem("grocery-benn0039", JSON.stringify(myList) );
        sortArray();
        showList();
    } else {
        localStorage.clear(); 
        showList();
        welcomePage();
    }
}

function markItem(ev) {
  var txt = ev.currentTarget.firstChild.nodeValue;
  for(var i=0;i<myList.length;i++){
  	if(myList[i].description == txt){
       ev.currentTarget.style.textDecoration = 'line-through';
      myList[i].state = 1;
    }
  }
    if (myList.length != 0){
        sortArray();
        localStorage.setItem("grocery-benn0039", JSON.stringify(myList) );
        showList();
    } else {
        localStorage.clear(); 
        showList();
        welcomePage();
    }
}

function sortArray() {
    console.log(myList);
    myList.sort(function(a,b) {
        
    if (a.state > b.state) {
            return 1;
        }
        if (a.state < b.state) {
            return -1;
        }
        // a must be equal to b
        return 0;
        
    })
    
};
let data = ["Ram", "Shyam", "Sita", "Gita"];

let list = document.getElementById("myList");

data.forEach((item) => {
  let li = document.createElement("li");
  li.innerText = item;
  list.appendChild(li);
});

/*
function checkString() {
  if (data.indexOf("Ram") > -1) {
    alert("success");
  }
}
*/

// create a function that uses id's myInput and myButton to check if the input is in the array
// if it is, alert success
// if it is not, alert failure
function checkString() {
  let input = document.getElementById("myInput").value;
  if (data.indexOf(input) > -1) {
    alert("success");
  } else {
    alert("failure");
  }
}
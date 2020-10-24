const containerPage = document.querySelector('#container-page');

function myFunction(x) {
    if (x.matches) { // If media query matches
      containerPage.classList.remove('container-fluid')
      containerPage.classList.add('container');
    } else {
     containerPage.classList.remove('container');
     containerPage.classList.add('container-fluid')
    }
  }
  
//   var x = window.matchMedia("(max-width: 700px)")
  var x = window.matchMedia("(min-width: 1800px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
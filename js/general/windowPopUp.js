

const windowPopUp = (url, title, option) => {

    var popUp = window.open(url, title, option);

    if (popUp == null || typeof(popUp)=='undefined') { 	
       return alert('Please disable your pop-up blocker and click the "Open" link again.'); 
    } 
    return popUp.focus();
}


const logOutBtns = Array.from(document.querySelectorAll('.log-out'));

const logOutFunc = (e) => {
    e.preventDefault()

    localStorage.clear()

    location.replace(`${window.location.origin}`);
    
}

logOutBtns.map(x => {
    x.addEventListener('click', (e) => logOutFunc(e))
})
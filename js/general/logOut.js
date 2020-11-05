

const logOutBtns = Array.from(document.querySelectorAll('.log-out'));

console.log(logOutBtns)

const logOutFunc = (e) => {
    e.preventDefault()

    localStorage.clear()

    location.replace(`${window.location.origin}`);
    
}

logOutBtns.map(x => {
    console.log(x)
    x.addEventListener('click', (e) => logOutFunc(e))
})
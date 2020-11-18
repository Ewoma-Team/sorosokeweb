
const loadUserRoomCount = (count) => {
    const userRoomCountDOM = document.querySelector('#userRoomCount')
    userRoomCountDOM.innerHTML = `- ${count} Active Users <i class="fas fa-users icon fa-lg"style="font-size: 10px;"></i> - last 24 hrs`
}
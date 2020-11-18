
const stateDom = document.querySelector('[data-target-state-room-dom]') 

const states = [
    "Abia (Umuahia)", "Adamawa (Yola)", "Akwa-Ibom (Uyo)", "Anambra (Awka)",	
    "Bauchi (Bauchi)", "Bayelsa (Yenagoa)", "Benue (Makurdi)", "Borno (Maiduguri)",	
    "Cross-River (Calabar)", "Delta (Asaba)", "Ebonyi (Abakaliki)", "Edo (Benin)",
    "Ekiti (Ado-Ekiti)", "Enugu (Enugu)", "Gombe (Gombe)", "Imo (Owerri)", "Jigawa (Dutse)",
    "Kaduna (Kaduna)", "Kano (Kano)", "Katsina (Katsina)", "Kebbi (Birnin Kebbi)", "Kogi (Lokoja)",	
    "Kwara (Ilorin)", "Lagos (Ikeja)", "Nasarawa (Lafia)", "Niger (Minna)", "Ogun (Abeokuta)",	
    "Ondo (Akure)", "Osun (Oshogbo)", "Oyo  (Ibadan)", "Plateau  (Jos)", "Rivers (Port Harcourt)",	
    "Sokoto (Sokoto)", "Taraba (Jalingo)", "Yobe (Damaturu)", "Zamfara (Gusau)", "FCT (Abuja)"
]

const viewStateToDom = () => {

    stateDom.innerHTML = '';
    states.map((x, i) => {
        const state = x.split(" (")

        stateDom.innerHTML += `
            <li class="nav-item mb-1 state-room-class roomNameClass" id="state-room-${state[0]}" 
                data-room-type="state" data-room-name="${state[0]}" data-target-${state[0]}-room-btn>
                <span style="text-align: left; font-weight: 500;" class="nav-link state-li">
                ${x}&nbsp;<span id="newMessageNotify${state[0]}" style="color: black !important; font-weight: 600;"
                       class="badge badge-light newMessageNotify"></span>
                </span>
            </li>`;
    })

    Array.from(document.querySelectorAll('.state-room-class')).map(x => {
        x.addEventListener('click', (e) => loadRoomToDomBrigde(e));
    })
}

viewStateToDom();

//--------------------------------------------------Side Bar Toggle Manipulation
const stateRoomBtn = document.querySelector('#state-room-toggle')
let stateRoomToogleSwitch = false; 

const stateRoomToggle = (e) => {
    e.preventDefault();

    if(stateRoomToogleSwitch) {
        stateDom.style.display ='none';//hide the drop down
        return stateRoomToogleSwitch = false;
    }
    if(!stateRoomToogleSwitch) {
        stateDom.style.display ='block';
        return stateRoomToogleSwitch = true;
    }

}

stateRoomBtn.addEventListener('click', (e) => stateRoomToggle(e))


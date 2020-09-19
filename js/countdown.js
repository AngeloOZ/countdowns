
const label = document.querySelectorAll('.text-date')
const labelTextDay = document.querySelectorAll('.text-date2');
const textTitle = document.querySelector('.nombre-countdown h2');
const time = {
    "anios": undefined,
    "meses": undefined,
    "dias": undefined,
    "horas": undefined,
    "minutos": undefined,
    "segundos": undefined,
};
let chosenDate;
let idinterval;

function initCountDown(fecha){
    textTitle.textContent = "Esta la cuenta regresiva de "+localStorage.getItem('nombreEvent')
    chosenDate = new Date(fecha);
    idinterval = setInterval(()=>{
        calcTime(chosenDate);
    },1000);
    contenedorMain.style.display = 'none';
    contenedorCountdown.style.display = 'block';
}

const calcTime = (fechaSeleccionada) => {
    const now = new Date();
    let transcurrido = Math.floor((fechaSeleccionada - now)/1000);
    let MonthDays = diasEnUnMes((now.getMonth() + 1), now.getFullYear())
    time.dias = (Math.floor(transcurrido /(60 * 60 * 24)));
    time.horas = (Math.floor((transcurrido / (60 * 60)) % 24));
    time.minutos = (Math.floor((transcurrido / 60) % 60));
    time.segundos = (Math.floor((transcurrido) % 60));

    //* Asignacion de los segundos */    
    label[3].textContent = time.segundos;
    plurarText(labelTextDay[3],time.segundos,"Segundos");
    //* Asignacion de los Minutos */    
    label[2].textContent = time.minutos;
    plurarText(labelTextDay[2], time.minutos, "Minutos");
    //* Asignacion de los Horas */    
    label[1].textContent = time.horas;
    plurarText(labelTextDay[1], time.horas, "Horas");
    //* Asignacion de los Dias */    
    label[0].textContent = time.dias;
    plurarText(labelTextDay[0], time.dias, "Días");

    if(labelTextDay[0].textContent.length>4){
        console.log('hola');
    }
    
    if(transcurrido <= 0){
        clearInterval(idinterval);
    }
}
function plurarText(elemento, valor, texto){

    if(valor == '1'){
        elemento.textContent = texto.slice(0,-1);
    }else{
        elemento.textContent = texto;
    }
}
function diasEnUnMes(mes, año) {
	return new Date(año, mes, 0).getDate();
}

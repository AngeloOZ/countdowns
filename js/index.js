const contenedorDefault = document.querySelector('.default');
const contenedorCustom = document.querySelector('.custom');
const contenedorMain = document.querySelector('.ctn-main');
const contenedorCountdown = document.querySelector('.countdown');
const radioDefault = document.querySelector('#tipoDefault');
const radioCustom = document.querySelector('#tipoCustom');
const formEvent = document.getElementById('formEvents');
const btnNewEvent = document.getElementById('btn-new-event');
const typed = new Typed('.typed',{
    strings: [
        '<i>Navidad</i>',
        '<i>Fin de Año</i>',
        '<i>Cumpleaños</i>',
        '<i>Aniversario</i>'
    ],
    typeSpeed: 75,
    startDelay: 300,
    backSpeed: 75,
    //smartBackspace: true,
    shuffle: false,
    backDelay: 1500,
    loop: true,
    loopCount: false,
    showCursor: true,
    cursorChar: '|',
    contentType: 'html',
});

LoadDefaultDays();
if(verifyDate(localStorage.getItem('fecha'))){
    initCountDown(localStorage.getItem('fecha'));
}else{
    localStorage.setItem('fecha','null');
}

radioDefault.addEventListener('change', ()=>{
    contenedorDefault.style.display = 'block';
    contenedorCustom.style.display = 'none';
})
radioCustom.addEventListener('change', ()=>{
    contenedorCustom.style.display = 'block';
    contenedorDefault.style.display = 'none';
})

btnNewEvent.addEventListener('click', ()=>{
    localStorage.setItem('fecha','null')
    location.reload();
})
formEvent.addEventListener('submit', (e)=>{
    e.preventDefault();
    let fecha;
    let nombre;
    if(radioDefault.checked){
        fecha = formEvent.eventosDefault.value;
        nombre = formEvent.eventosDefault.selectedOptions[0].textContent;
    }else if(radioCustom.checked){
        fecha = formEvent.dateSelect.value;
        nombre = formEvent.nombreEvent.value;
        const daynow = new Date();
        const datechoosen = new Date(fecha);
        if(datechoosen < daynow){
            alert('La fecha Ingresada es menor a la actual');
            return;
        }   
    }
    // fecha+= ', 00:00:00';
    if(verifyDate(fecha)){
        localStorage.setItem('fecha',fecha);
        localStorage.setItem('nombreEvent',nombre)
        initCountDown(fecha)
        formEvent.reset();
    }else{
        alert('Fecha no válida')
    }
})

function LoadDefaultDays(){
    const dateNow = new Date();
    const select = document.getElementById('eventosDefault');
    const fragment = document.createDocumentFragment();
    const diasFestivos = 
    [
        {
            "nombre": "Año Nuevo",
            "fecha": '01/01/'
        },
        {
            "nombre": "Día de los Reyes",
            "fecha": '01/06/'
        },
        {
            "nombre": "Día de la mujer",
            "fecha": '03/08/'
        },
        {
            "nombre": "Día del hombre",
            "fecha": '03/19/'
        },
        {
            "nombre": "Día del Trabajo",
            "fecha": '05/01/'
        },
        {
            "nombre": "Halloween",
            "fecha": '31/10/'
        },
        {
            "nombre": "Noche Buena",
            "fecha": '12/24/'
        },
        {
            "nombre": "Navidad",
            "fecha": '12/25/',
            "fondo": "https://image.freepik.com/vector-gratis/fondo-nieve-navidad_1048-12843.jpg"
        },
        {
            "nombre": "Fin de año",
            "fecha": '12/31/'
        },
    ];
    for (const dia of diasFestivos) {
        const fecha = dia.fecha.split("/")[0];
        let year = '2020';
        if(fecha < dateNow.getMonth()){
            year = dateNow.getFullYear()+1;
        }
        dia.fecha += year;
        loadSelectDays(fragment, dia);    
    }
    select.appendChild(fragment);
}
function loadSelectDays(fragment, diaFestivo){
    const option = document.createElement('OPTION');
    option.textContent = diaFestivo.nombre;
    option.setAttribute('value',diaFestivo.fecha);
    option.setAttribute('nombreEvento',diaFestivo.nombre);
    fragment.appendChild(option);
}
function verifyDate(date){
    const tempDate = new Date(date);
    if(tempDate == 'Invalid Date'){
        return false;
    }else{
        return true;
    }
}

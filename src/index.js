// VARIABLES
const inputName = document.querySelector('#name');
const inputCardNumber = document.querySelector('#number');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const inputCvc = document.querySelector('#cvc');
const form = document.querySelector('#form');
const button = document.querySelector('#form button[type="submit"]');
const content = document.querySelector('#content');
const cardName = document.querySelector('#cardn');
const cardNumber = document.querySelector('#card-number');
const cardDate = document.querySelector('#card-date');
const cardCvc = document.querySelector('#card-cvc');
// OBJETOS
const formulario = {
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: ''
}

//EVENTOS
inputName.addEventListener('input', validar);
inputCardNumber.addEventListener('input', validar);
inputMonth.addEventListener('input', validar);
inputYear.addEventListener('input', validar);
inputCvc.addEventListener('input', validar);
button.addEventListener('click', enviarFormulario);

//FUNCIONES
function enviarFormulario(e) {
    e.preventDefault();

    // Eliminar el formulario existente
    form.remove();

    // Crear la alerta
    const div = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h2');
    const paragraph = document.createElement('p');
    const nextButton = document.createElement('button');

    img.src = '/images/icon-complete.svg';
    title.textContent = 'THANK YOU!';
    paragraph.textContent = "We've added your card details";
    nextButton.textContent = 'Continue';

    div.classList.add('div-sent');
    img.classList.add('img-sent');
    title.classList.add('title-sent');
    paragraph.classList.add('p-sent');
    nextButton.classList.add('button');


    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(paragraph);
    div.appendChild(nextButton);

    content.appendChild(div);

    nextButton.addEventListener('click', function(){
        div.remove();
        content.appendChild(form);
        reiniciarFormulario();
    });
}

function validar(e) {

    e.preventDefault;
    this.value = this.value.toUpperCase();

    if(e.target.value.trim() === '') {
        crearAlerta("Can't be blank", e.target.parentElement);
        comprobarFormulario();
        return;
    }

    if(e.target.id === 'name' && !validarNombre(e.target.value)) {
        crearAlerta("Invalid name", e.target.parentElement);
        formulario[e.target.name] = '';
        comprobarFormulario();
        return;
    }

    if(e.target.id === 'number' && !validarTarjeta(e.target.value)) {
        crearAlerta("Invalid number", e.target.parentElement);
        formulario[e.target.name] = '';
        comprobarFormulario();
        return;
    }

    if(e.target.id === 'month' && !validarMes(e.target.value)) {
        crearAlerta("Invalid month", e.target.parentElement);
        formulario[e.target.name] = '';
        comprobarFormulario();
        return;
    }

    if(e.target.id === 'year' && !validarAño(e.target.value)) {
        crearAlerta("Invalid year", e.target.parentElement);
        formulario[e.target.name] = '';
        comprobarFormulario();
        return;
    }

    if(e.target.id === 'cvc' && !validarCvc(e.target.value)) {
        crearAlerta("Invalid cvc", e.target.parentElement);
        formulario[e.target.name] = '';
        comprobarFormulario();
        return;
    }

    limpiarAlerta(e.target.parentElement);

      // Asignar los valores
      formulario[e.target.name] = e.target.value.trim().toLowerCase();
      
      // Mostrar datos en la tarjeta
      mostrarDatos();
        
      // Comprobar el objeto de email 
      comprobarFormulario();
}

function validarNombre(name) {
    const regex = /^[a-zA-Z\s]+$/;
    const resultado = regex.test(name);
    return resultado;
}

function validarTarjeta(number) {
    const regex = /^(?:[0-9]{13,16})$/;
    const resultado = regex.test(number);
    return resultado;
}

function validarMes(month) {
    const regex = /^(0?[1-9]|1[0-2])$/;
    const resultado = regex.test(month);
    return resultado;
}

function validarAño(year) {
    const regex = /^(2[4-9]|3[0-4])$/;
    const resultado = regex.test(year);
    return resultado;
}

function validarCvc(cvc) {
    const regex = /^\d{3}$/;
    const resultado = regex.test(cvc);
    return resultado;
}

function crearAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    // Generar alerta en HTML
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('error-text');
            
    // Inyectar el error al formulario
    referencia.appendChild(error);
}

function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.error-text');
        if (alerta) {
            alerta.remove();
        }
}

function comprobarFormulario() {
    if(Object.values(formulario).includes('')) {
        button.classList.add('button-disabled');
        button.disabled = true;
        return;
    }

    button.classList.remove('button-disabled');
    button.disabled = false;
}

function reiniciarFormulario() {
    formulario.name = '';
    formulario.number = '';
    formulario.month = '';
    formulario.year = '';
    formulario.cvc = '';

    form.reset();
    comprobarFormulario();
}

function mostrarDatos() {
    cardName.textContent = formulario.name.toUpperCase();
    cardNumber.textContent = formulario.number;
    cardDate.textContent = `${formulario.month}/${formulario.year}`;
    cardCvc.textContent = formulario.cvc;
}
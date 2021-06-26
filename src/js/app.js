document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    // enlaceActivo();
    clickHamburguer();
    crearHabilidades();
});

function navegacionFija() {
    const barra = document.querySelector('.navegacion');
    const hamburguer = document.querySelector('.hamburguer');
    const toggler = document.querySelector('.toggler');
    const observer = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) {
            barra.classList.add('fijo');
            hamburguer.classList.add('top');
            toggler.classList.add('top');
        } else {
            barra.classList.remove('fijo');
            hamburguer.classList.remove('top');
            toggler.classList.remove('top');
        }
    });
    observer.observe(document.querySelector('.copyright'));
}

function enlaceActivo() {

}

function clickHamburguer() {
    const hamburguer = document.querySelector('.toggler');
    const navegacion = document.querySelector('.navegacion');
    const enlaces = document.querySelector('.contenido-navegacion');
    hamburguer.addEventListener('click', function () {
        if (enlaces.classList.contains('enlaces-activo')) {
            enlaces.classList.remove('enlaces-activo');
            setTimeout(() => {
                navegacion.classList.remove('posicion');
            }, 400);
        } else {
            navegacion.classList.add('posicion');
            enlaces.classList.add('enlaces-activo');
        }
    });
}

async function crearHabilidades() {
    try {
        const ruta = "build/img/skills/";
        const resultado = await fetch('./data.json');
        const db = await resultado.json();
        const { skills } = db;
        const seccionIconos = document.querySelector('.iconos-habilidades');
        skills.forEach(hab => {
            const { id, icon, name, description } = hab;

            const img = document.createElement('IMG');
            img.src = ruta + icon;
            img.alt = "Imagen Skill";
            img.title = name;
            img.dataset.imagenId = id;
            img.dataset.imagenName = name;
            img.dataset.imagenDescription = description;
            img.onclick = mostrarInformacionHabilidad;

            const skill = document.createElement('LI');
            skill.classList.add('skill');
            skill.appendChild(img);

            seccionIconos.appendChild(skill);
        });
    } catch (error) {
        console.log(error);
    }
}

function mostrarInformacionHabilidad(e) {
    // console.log(e.target.dataset.imagenId);
    const encabezadoSkill = document.createElement('H4');
    encabezadoSkill.textContent = e.target.dataset.imagenName;

    const descriptionSkill = document.createElement('P');
    descriptionSkill.textContent = e.target.dataset.imagenDescription;

    const containerDescription = document.createElement('DIV');
    containerDescription.classList.add('descripcion-skill');
    // containerDescription.classList.add('effect-fade-2');
    containerDescription.appendChild(encabezadoSkill);
    containerDescription.appendChild(descriptionSkill);

    const overlay = document.createElement('DIV');
    overlay.appendChild(containerDescription);
    overlay.classList.add('overlay-skill');
    overlay.classList.add('effect-fade-2');

    //Cuando se da click en cualquier parte de la pantalla se cierra la imagen
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Agregar HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
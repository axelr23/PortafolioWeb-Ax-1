document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    // enlaceActivo();
    clickHamburguer();
    crearHabilidades();
    crearPortafolio();
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

    const encabezadoSkill = document.createElement('H4');
    encabezadoSkill.textContent = e.target.dataset.imagenName;

    const descriptionSkill = document.createElement('P');
    descriptionSkill.textContent = e.target.dataset.imagenDescription;

    const containerDescription = document.createElement('DIV');
    containerDescription.classList.add('descripcion-skill');
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

async function crearPortafolio(){
    try {
        const ruta = "build/img/portafolio/";
        const resultado = await fetch('./data.json');
        const db = await resultado.json();
        const { portafolio } = db;
        const seccionPortafolio = document.querySelector('.apartado-portafolio');
        portafolio.forEach(por => {
            const {imagen, repositorio, pagina, tecnologias} = por;

            //Seccion datos del proyecto

            const paginaProyecto = document.createElement('A');
            paginaProyecto.textContent = "Pagina";
            paginaProyecto.href = pagina;
            paginaProyecto.target = "_blank";

            const repositorioProyecto = document.createElement('A');
            repositorioProyecto.textContent = "Repositorio";
            repositorioProyecto.href = repositorio;
            repositorioProyecto.target = "_blank";

            const enlaces = document.createElement('DIV');
            enlaces.classList.add('enlaces');
            enlaces.appendChild(paginaProyecto);
            enlaces.appendChild(repositorioProyecto);

            const iconos = document.createElement('DIV');
            iconos.classList.add('iconos');

            const datosProyecto = document.createElement('DIV');
            datosProyecto.classList.add('datos-proyecto');
            datosProyecto.appendChild(iconos);
            datosProyecto.appendChild(enlaces);

            //Seccion imagen del proyecto
            const sourceWebp = document.createElement('SOURCE');
            sourceWebp.srcset = ruta + imagen + ".webp";
            sourceWebp.type = "image/webp";

            const sourceJpg = document.createElement('SOURCE');
            sourceJpg.srcset = ruta + imagen + ".jpg";
            sourceJpg.type = "image/jpeg";

            const imgProyecto = document.createElement('IMG');
            imgProyecto.loading = "lazy";
            imgProyecto.src = ruta + imagen + ".jpg";
            imgProyecto.alt = "Imagen Cliente";

            const picture = document.createElement('PICTURE');
            picture.appendChild(sourceWebp);
            picture.appendChild(sourceJpg);
            picture.appendChild(imgProyecto);

            const imagenProyecto = document.createElement('DIV');
            imagenProyecto.classList.add('imagen');
            imagenProyecto.appendChild(picture);

            //Contenedor
            const proyecto = document.createElement('DIV');
            proyecto.classList.add('proyecto');
            proyecto.appendChild(datosProyecto);
            proyecto.appendChild(imagenProyecto);

            seccionPortafolio.appendChild(proyecto);
        });
    } catch (error) {
        console.log(error);
    }
}
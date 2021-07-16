document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    clickHamburguer();
    clickEnlace();
    crearHabilidades();
    crearPortafolio();
    validarFormulario();
});

function navegacionFija() {
    const barra = document.querySelector('.row');
    const hamburguer = document.querySelector('.hamburguer');
    const toggler = document.querySelector('.toggler');
    const observer = new IntersectionObserver(function (entries) {
        barra.classList.toggler('fijo');
        // if (entries[0].isIntersecting) {
        //     barra.classList.add('fijo');
        // } else {
        //     barra.classList.remove('fijo');
        // }
    });
    observer.observe(document.querySelector('.seccion-habilidades'));
}

function navegacionHamburguer(){
    const navegacion = document.querySelector('.navegacion');
    const enlaces = document.querySelector('.contenido-navegacion');
    if (enlaces.classList.contains('enlaces-activo')) {
        enlaces.classList.remove('enlaces-activo');
        setTimeout(() => {
            navegacion.classList.remove('posicion');
        }, 400);
    } else {
        navegacion.classList.add('posicion');
        enlaces.classList.add('enlaces-activo');
    }
}

function clickHamburguer() {
    const hamburguer = document.querySelector('.toggler');
    hamburguer.addEventListener('click', function () {
        if (hamburguer.classList.contains('cheked')) {
            hamburguer.classList.remove('cheked');
        }else{
            hamburguer.classList.add('cheked');
        }
        navegacionHamburguer();
    });
}

function clickEnlace(){
    const hamburguer = document.querySelector('.toggler');
    const enlaces = document.querySelectorAll('.contenido-navegacion');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => {
            if (hamburguer.classList.contains('cheked')) {
                hamburguer.classList.remove('cheked');
            }else{
                hamburguer.classList.add('cheked');
            }
            navegacionHamburguer();
        });
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
        const rutaTecnologias = "build/img/tecnologias/";
        const resultado = await fetch('./data.json');
        const db = await resultado.json();
        const { portafolio } = db;
        const seccionPortafolio = document.querySelector('.apartado-portafolio');
        portafolio.forEach(por => {
            const {imagen, repositorio, pagina, tecnologias} = por;

            //Seccion datos del proyecto
            const iconos = document.createElement('DIV');
            iconos.classList.add('iconos');
            
            //Tecnologias Proyecto
            for (let i = 0; i < tecnologias.length; i++) {
                const sourceWebpTecnologia = document.createElement('SOURCE');
                sourceWebpTecnologia.srcset = rutaTecnologias + tecnologias[i] + ".webp";
                sourceWebpTecnologia.type = "image/webp";

                const sourcePngTecnologias = document.createElement('SOURCE');
                sourcePngTecnologias.srcset = rutaTecnologias + tecnologias[i] + ".png";
                sourcePngTecnologias.type = "image/png";

                const imagenTecnologia = document.createElement('IMG');
                imagenTecnologia.type = "lazy";
                imagenTecnologia.src = rutaTecnologias + tecnologias[i] + ".png";
                imagenTecnologia.alt = "Imagen Tecnologia";

                const pictureTecnologias = document.createElement('PICTURE');
                pictureTecnologias.appendChild(sourceWebpTecnologia);
                pictureTecnologias.appendChild(sourcePngTecnologias);
                pictureTecnologias.appendChild(imagenTecnologia);

                iconos.appendChild(pictureTecnologias);
            }

            //Enlaces Proyecto
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

function validarFormulario(){
    const botonEnviar = document.querySelector('#boton-enviar');
    const nombre = document.querySelector('#nombre');
    const obNombre = document.querySelector('.ob-nombre');
    const correo = document.querySelector('#correo');
    const obCorreo = document.querySelector('.ob-correo');
    const asunto = document.querySelector('#asunto');
    const obAsunto = document.querySelector('.ob-asunto');
    const mensaje = document.querySelector('#mensaje');
    const obMensaje = document.querySelector('.ob-mensaje');
    const numero1 = document.querySelector('#numero1');
    const numero2 = document.querySelector('#numero2');
    const suma = document.querySelector('#numero');
    const resultadoSuma = document.querySelector('.suma');
    const obSuma = document.querySelector('.ob-numero');

    botonEnviar.addEventListener('click', function () {
        if (nombre.value == "" || nombre.value == null) {
            obNombre.classList.add('obligatorio');
            return false;
        }else{
            obNombre.classList.remove('obligatorio');
        }

        if (correo.value == "" || correo.value == null) {
            obCorreo.classList.add('obligatorio');
            return false
        }else{
            obCorreo.classList.remove('obligatorio');
        }

        if (asunto.value == "" || asunto.value == null) {
            obAsunto.classList.add('obligatorio');
            return false
        }else{
            obAsunto.classList.remove('obligatorio');
        }

        if (mensaje.value == "" || mensaje.value == null) {
            obMensaje.classList.add('obligatorio');
            return false
        }else{
            obMensaje.classList.remove('obligatorio');
        }

        if (suma.value == "" || suma.value == null){
            obSuma.classList.add('obligatorio');
            return false
        }else{
            obSuma.classList.remove('obligatorio');
        }

        // if (!parseInt(suma.value) == parseInt(numero1.textContent + numero2.textContent)) {
        //     resultadoSuma.classList.add('error-suma');
        //     return false;
        // } else {
        //     resultadoSuma.classList.remove('error-suma');
        // }
    });
}
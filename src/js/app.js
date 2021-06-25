document.addEventListener('DOMContentLoaded', function(){
    navegacionFija();
    // enlaceActivo();
    clickHamburguer();
    crearHabilidades();
});

function navegacionFija(){
    const barra = document.querySelector('.navegacion');
    const hamburguer = document.querySelector('.hamburguer');
    const toggler = document.querySelector('.toggler');
    const observer = new IntersectionObserver(function(entries){
        if (!entries[0].isIntersecting){
            barra.classList.add('fijo');
            hamburguer.classList.add('top');
            toggler.classList.add('top');
        }else{
            barra.classList.remove('fijo');
            hamburguer.classList.remove('top');
            toggler.classList.remove('top');
        }
    });
    observer.observe(document.querySelector('.copyright'));
}

function enlaceActivo(){
    
}

function clickHamburguer(){
    const hamburguer = document.querySelector('.toggler');
    const navegacion = document.querySelector('.navegacion');
    const enlaces = document.querySelector('.contenido-navegacion');
    hamburguer.addEventListener('click', function (){
        if(enlaces.classList.contains('enlaces-activo')){
            enlaces.classList.remove('enlaces-activo');
            setTimeout(() => {
                navegacion.classList.remove('posicion');
            }, 400);
        }else{
            navegacion.classList.add('posicion');
            enlaces.classList.add('enlaces-activo');
        }
    });
}

async function crearHabilidades(){
    try{
        const ruta = "build/img/skills/";
        const resultado = await fetch('./data.json');
        const db = await resultado.json();
        const {skills} = db;
        const seccionIconos = document.querySelector('.iconos-habilidades');
        skills.forEach(hab => {
            const {icon, name, description}= hab;
            
            const img = document.createElement('IMG');
            img.src = ruta + icon;
            img.alt = "Imagen Skill";
            img.onclick = mostrarInformacionHabilidad();


            const skill = document.createElement('LI');
            skill.classList.add('skill');
            skill.appendChild(img);

            seccionIconos.appendChild(skill);
        });
    } catch(error){
        console.log(error);
    }
}

function mostrarInformacionHabilidad(){
    console.log("click skill");
}
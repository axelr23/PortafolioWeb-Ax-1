document.addEventListener('DOMContentLoaded', function(){
    navegacionFija();
    // enlaceActivo();
    clickHamburguer();
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
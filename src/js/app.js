document.addEventListener('DOMContentLoaded', function(){
    navegacionFija();
    enlaceActivo();
});

function navegacionFija(){
    const barra = document.querySelector('.navegacion');
    const observer = new IntersectionObserver(function(entries){
        if (!entries[0].isIntersecting){
            barra.classList.add('fijo');
        }else{
            barra.classList.remove('fijo');
        }
    });
    observer.observe(document.querySelector('.copyright'));
}

function enlaceActivo(){
    const enlaces = document.querySelector('.contenido-navegacion');
}
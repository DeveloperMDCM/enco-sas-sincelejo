import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alerta(mensaje,icono,foco='', text, imagen){
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        icon:icono,
        html:text,
        showConfirmButton: false,
        // confirmButtonText: 'Listo',
        showCloseButton: true,
        width: 600,
        imageUrl: imagen,
    imageWidth: 400,
    imageHeight: 200,
        // timer: 1500,
    });
}

function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}
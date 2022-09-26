const notificacion = (titletext, text, icon, confirmButtonText) => {
    Swal.fire ({
        titletext: titletext,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
    });
}
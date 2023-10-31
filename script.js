document.addEventListener("DOMContentLoaded", function() {
    // Adicionar rolagem suave para links no menu
    var menuLinks = document.querySelectorAll(".menu-desktop a");
    menuLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var targetId = this.getAttribute("data-target");
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Adicionar rolagem suave para o botão "Contato"
    var contatoButton = document.querySelector(".btn-contato a");
    contatoButton.addEventListener("click", function(event) {
        event.preventDefault();
        var targetId = this.getAttribute("data-target");
        var targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

async function cargarJSON(idioma) {
    try {
        const response = await fetch(`lang/${idioma}.json`);
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        return await response.json();
    } catch (error) {
        console.error('Error cargando el JSON:', error);
        return null;
    }
}

function fillUl(ul, lines) {
    ul.innerHTML = ''; // Limpiar el contenido existente
    lines.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line; // Usar textContent en lugar de innerHTML
        ul.appendChild(li);
    });
}

function setElementTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

async function cargarDatos() {
    const header = document.querySelector('header');
    const lang = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'en');
    localStorage.setItem('lang', lang);

    const data = await cargarJSON(lang);
    if (!data) return;

    // Asignar valores del JSON a los elementos del DOM
    setElementTextContent('main-degree', data.mainDegree);
    setElementTextContent('mobile-degree', header.classList.contains('header-small') ? data.mobileDegree : data.mainDegree);
    setElementTextContent('profile-title', data.profile.title);
    setElementTextContent('profile-desc', data.profile.desc);

    setElementTextContent('experience-title', data.experience.title);
    setElementTextContent('fjob-title', data.experience.job[0].title);
    setElementTextContent('fjob-date', data.experience.job[0].date);
    fillUl(document.getElementById('fjob-desc'), data.experience.job[0].innerDesc);
    setElementTextContent('sjob-title', data.experience.job[1].title);
    setElementTextContent('sjob-date', data.experience.job[1].date);
    fillUl(document.getElementById('sjob-desc'), data.experience.job[1].innerDesc);

    setElementTextContent('education-title', data.education.title);
    setElementTextContent('feducation-title', data.education.education[0].title);
    setElementTextContent('feducation-date', data.education.education[0].date);
    setElementTextContent('seducation-title', data.education.education[1].title);
    setElementTextContent('seducation-date', data.education.education[1].date);

    setElementTextContent('skills-title', data.skills.title);
    fillUl(document.getElementById('skillsUl'), data.skills.skills);
    setElementTextContent('badges-title', data.badges.title);
    setElementTextContent('contact-title', data.contact.title);
    setElementTextContent('footer-title', data.footer.title);
}

// Evento de scroll optimizado
let isScrolling;
window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('header-small');
        } else {
            header.classList.remove('header-small');
        }
    }, 100); // Ajusta el tiempo según sea necesario
});

// Cargar los datos al iniciar
cargarDatos();
document.addEventListener('DOMContentLoaded', () => {
    console.log("JS chargé"); 

    fetch('philippeAdigun_Portfolio.json')
    .then(response => response.json())
    .then(data => {
        loadSkills(data.skills);
        loadExperience(data.experience);
        loadEducation(data.education);
        loadProjects(data.projects);
        handleFadeIn(); // animation au scroll
    })
    .catch(error => console.error('Erreur de chargement JSON:', error));

    // Typing effect
const text = "Développeur Web & Enthousiaste Technologique";
let index = 0;
const typed = document.getElementById("typed");

function type() {
    if(index < text.length) {
        typed.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}
type();

    function loadSkills(skills) {
        const container = document.getElementById('skills-container');
        skills.forEach(skill => {
            const div = document.createElement('div');
            div.classList.add('skill', 'fade-in');
            div.innerHTML = `<span class="icon">${skill.icon}</span>${skill.name}`;
            container.appendChild(div);
        });
    }

    function loadExperience(experiences) {
        const container = document.getElementById('experience-container');
        experiences.forEach(exp => {
            const div = document.createElement('div');
            div.classList.add('experience', 'fade-in');
            div.innerHTML = `<h3>${exp.role} - ${exp.company}</h3>
                             <span>${exp.start} à ${exp.end}</span>
                             <p>${exp.description}</p>`;
            container.appendChild(div);
        });
    }

    function loadEducation(education) {
        const container = document.getElementById('education-container');
        education.forEach(ed => {
            const div = document.createElement('div');
            div.classList.add('education', 'fade-in');
            div.innerHTML = `<h3>${ed.degree} - ${ed.school}</h3>
                             <span>${ed.start} à ${ed.end}</span>
                             <p>${ed.description}</p>`;
            container.appendChild(div);
        });
    }

    function loadProjects(projects) {
        const container = document.getElementById('projects-container');

        function displayProjects(filteredProjects) {
            container.innerHTML = '';
            filteredProjects.forEach(project => {
                const div = document.createElement('div');
                div.classList.add('project', 'fade-in');
                div.innerHTML = `<h3>${project.title}</h3>
                                 <p>${project.description}</p>
                                 <a href="${project.link}" target="_blank">Voir le projet</a>`;
                container.appendChild(div);
            });
            handleFadeIn(); // ré-appliquer fade-in après filtrage
        }

        displayProjects(projects);

        // Filtrage
        const buttons = document.querySelectorAll('#project-filters button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.dataset.filter;
                if(filter === 'all') displayProjects(projects);
                else displayProjects(projects.filter(p => p.category === filter));
            });
        });
    }

    function handleFadeIn() {
        const faders = document.querySelectorAll('.fade-in');

        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    }
});

// Data is loaded via data.js included in HTML

document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Personal Info in Socials
    const heroSocials = document.getElementById('hero-socials');
    if (heroSocials) {
        heroSocials.innerHTML = `
            <a href="${personalInfo.github}" target="_blank"><i class="fab fa-github"></i></a>
            <a href="${personalInfo.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:${personalInfo.email}"><i class="fas fa-envelope"></i></a>
        `;
    }

    // 1.5 Populate Contact Grid (New Footer Section)
    const contactGrid = document.getElementById('contact-grid');
    if (contactGrid) {
        // Prepare data
        const contacts = [
            {
                name: 'WhatsApp',
                icon: 'fab fa-whatsapp',
                link: `https://wa.me/977${personalInfo.contact}`,
                color: '#25D366'
            },
            {
                name: 'Gmail',
                icon: 'fas fa-envelope',
                link: `mailto:${personalInfo.email}`,
                color: '#EA4335'
            },
            {
                name: 'LinkedIn',
                icon: 'fab fa-linkedin-in',
                link: personalInfo.linkedin,
                color: '#0077B5'
            },
            {
                name: 'GitHub',
                icon: 'fab fa-github',
                link: personalInfo.github,
                color: '#ffffff'
            }
        ];

        contactGrid.innerHTML = contacts.map(c => `
            <a href="${c.link}" target="_blank" class="contact-card" style="--hover-color: ${c.color}">
                <div class="icon-box">
                    <i class="${c.icon}"></i>
                </div>
                <span>${c.name}</span>
            </a>
        `).join('');
    }

    // 2. Render Projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card fade-in">
                <div class="project-header">
                    <h3>${project.name}</h3>
                </div>
                <div class="project-content">
                    <p class="project-desc">${project.description}</p>
                    <div class="tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-link">
                        <a href="${project.link}" target="_blank">View Code <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 3. Experience
    const expContainer = document.getElementById('experience-container');
    if (expContainer) {
        expContainer.innerHTML = experience.map((exp, index) => `
            <div class="timeline-item">
                <div class="role">${exp.role}</div>
                <div class="company">${exp.company} • ${exp.type}</div>
                <ul class="timeline-desc">
                    ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
                ${exp.image ? `<button class="btn outline sm" onclick="openModal('${exp.image}')"><i class="fas fa-certificate"></i> View Certificate</button>` : ''}
            </div>
        `).join('');
    }

    // 4. Certifications
    const certContainer = document.getElementById('cert-container');
    if (certContainer) {
        certContainer.innerHTML = certifications.map(cert => `
            <div class="cert-item">
                <div class="cert-name">${cert.name}</div>
                <div class="issuer">${cert.issuer}</div>
                <span class="cert-date">${cert.date}</span>
                ${cert.image ? `<div class="cert-action"><button class="btn outline sm" onclick="openModal('${cert.image}')"><i class="fas fa-image"></i> Show Credential</button></div>` : ''}
            </div>
        `).join('');
    }

    // Modal Logic (Global function for onclick)
    window.openModal = function (imageSrc) {
        let modal = document.getElementById('img-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'img-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img id="modal-img" src="">
                </div>
            `;
            document.body.appendChild(modal);

            // CSS for modal here for simplicity or in style.css. I will add to style.css next.
            // But basic close logic:
            modal.querySelector('.close').onclick = () => modal.style.display = 'none';
            modal.onclick = (e) => {
                if (e.target === modal) modal.style.display = 'none';
            }
        }
        document.getElementById('modal-img').src = imageSrc;
        modal.style.display = 'flex';
    };

    // 5. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 6. Cursor Glow Effect
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 7. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Add fade-in logic to CSS later, for now just logic
    document.querySelectorAll('.project-card, .skill-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Custom visible class logic injected via JS for simplicity
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

const hoverSign = document.querySelector('.hover-sign');

const videoList = [video1, video2, video3];

videoList.forEach(function (video) {
    if (!video) return;

    // Garantir que o vídeo esteja mudo para o navegador permitir reprodução imediata
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    // Tentativa de reprodução automática em loop
    const attemptPlay = function () {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(function () {
                // Silencioso se bloqueado até à primeira interação
            });
        }
    };

    attemptPlay();

    // Reprodução ao passar o rato (desktop)
    video.addEventListener("mouseenter", function () {
        attemptPlay();
        if (hoverSign) hoverSign.classList.add("active");
    });

    video.addEventListener("mouseleave", function () {
        // Pausar ou continuar conforme preferência
        if (hoverSign) hoverSign.classList.remove("active");
    });

    // Toque ou clique para alternar reprodução
    video.addEventListener("click", function () {
        if (video.paused) {
            attemptPlay();
        } else {
            video.pause();
        }
    });

    // Iniciar na primeira interação com a página caso haja bloqueio rígido do SO
    document.addEventListener('touchstart', attemptPlay, { once: true });
    document.addEventListener('click', attemptPlay, { once: true });
});

// Sidebar open / close //
if (menu && sideBar) {
    menu.addEventListener("click", function () {
        sideBar.classList.remove("close-sidebar");
        sideBar.classList.add("open-sidebar");
    });
}

if (closeIcon && sideBar) {
    closeIcon.addEventListener("click", function () {
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
    });
}

// Fechar sidebar ao clicar num link
sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (sideBar) {
            sideBar.classList.remove("open-sidebar");
            sideBar.classList.add("close-sidebar");
        }
    });
});

// Scroll down suave ao clicar no indicador
const scrollDownBtn = document.querySelector('.scroll-down');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function () {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Garantir reprodução imediata do vídeo do Hero sem travar em preto
const heroVideo = document.querySelector('.skills-video');
if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('muted', '');
    const tryPlay = function () {
        const promise = heroVideo.play();
        if (promise !== undefined) {
            promise.catch(function () {
                heroVideo.muted = true;
                heroVideo.play();
            });
        }
    };
    tryPlay();
    document.addEventListener('touchstart', tryPlay, { once: true });
    document.addEventListener('click', tryPlay, { once: true });
}

// ==================== TEMA CLARO / ESCURO (THEME TOGGLE) ====================
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const themeIcon = document.getElementById('themeIcon');
const themeIconMobile = document.getElementById('themeIconMobile');

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
        }
        if (themeIconMobile) {
            themeIconMobile.classList.remove('bx-sun');
            themeIconMobile.classList.add('bx-moon');
        }
        localStorage.setItem('portfolio_theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
        }
        if (themeIconMobile) {
            themeIconMobile.classList.remove('bx-moon');
            themeIconMobile.classList.add('bx-sun');
        }
        localStorage.setItem('portfolio_theme', 'dark');
    }
}

// Inicializar com o tema guardado
const savedTheme = localStorage.getItem('portfolio_theme');
if (savedTheme === 'light') {
    setTheme(true);
} else {
    setTheme(false);
}

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        const isCurrentLight = document.body.classList.contains('light-mode');
        setTheme(!isCurrentLight);
    });
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', function () {
        const isCurrentLight = document.body.classList.contains('light-mode');
        setTheme(!isCurrentLight);
    });
}

// ==================== AÇÃO DE ENVIO E CÓPIA DE E-MAIL ====================
const emailCard = document.getElementById('emailCard');
if (emailCard) {
    emailCard.addEventListener('click', function (e) {
        const emailAddress = 'brunopeliganga315@gmail.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(emailAddress).then(function () {
                showToastNotification('E-mail copiado! A abrir aplicação de correio...');
            }).catch(function () {
                // Continua normalmente
            });
        }
    });
}

function showToastNotification(message) {
    let toast = document.getElementById('portfolioToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portfolioToast';
        toast.className = 'portfolio-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class='bx bx-check-circle' style='font-size: 1.3rem; color: #72a1de;'></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 4000);
}


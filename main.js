document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const desktopQuery = window.matchMedia('(min-width: 769px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const setMenuState = (isOpen, returnFocus = false) => {
        if (!navToggle || !navMenu) return;

        navMenu.classList.toggle('active', isOpen);
        navToggle.classList.toggle('is-open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? '關閉導覽選單' : '開啟導覽選單');
        document.body.classList.toggle('nav-open', isOpen);

        if (isOpen) {
            const firstLink = navMenu.querySelector('a');
            window.setTimeout(() => firstLink?.focus(), 80);
        } else if (returnFocus) {
            navToggle.focus();
        }
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') !== 'true';
            setMenuState(isOpen);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                setMenuState(false, true);
            }
        });

        navMenu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                setMenuState(false);
            }
        });

        desktopQuery.addEventListener('change', (event) => {
            if (event.matches) setMenuState(false);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
                block: 'start'
            });

            if (history.replaceState) {
                history.replaceState(null, '', targetId);
            }
        });
    });

    const currentYear = document.querySelector('#current-year');
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});

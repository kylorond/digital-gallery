AOS.init({ duration: 1200, once: true });

        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');
        const scrollPercent = document.getElementById('scroll-percentage');

        const isTouch = 'ontouchstart' in window;
        if(isTouch) {
            dot.style.display = 'none';
            outline.style.display = 'none';
            document.body.style.cursor = 'auto';
        }

        window.addEventListener('mousemove', (e) => {
            if(isTouch) return;
            const { clientX: x, clientY: y } = e;
            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            
            outline.animate({
                transform: `translate3d(${x - 15}px, ${y - 15}px, 0)`
            }, { duration: 500, fill: "forwards", easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
        });

        const reveals = document.querySelectorAll('.scroll-reveal');
        const updateScroll = () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
            scrollPercent.innerText = Math.round(percent).toString().padStart(2, '0') + '%';

            reveals.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateScroll);
        window.addEventListener('resize', updateScroll);
        updateScroll();

        const audio = document.getElementById('bgMusic');
        const btn = document.getElementById('musicToggle');
        const icon = document.getElementById('playIcon');
        let playing = false;

        btn.addEventListener('click', () => {
            if(!playing) {
                audio.play();
                icon.innerHTML = '<path d="M6 4h4v12H6V4zm4 0h4v12h-4V4z"></path>';
            } else {
                audio.pause();
                icon.innerHTML = '<path d="M6 4l10 6-10 6V4z"></path>';
            }
            playing = !playing;
        });

        function createTypewriter(elementId, phrases) {
            const el = document.getElementById(elementId);
            let pIdx = 0;
            let cIdx = 0;
            let deleting = false;
            let speed = 80;

            function tick() {
                const current = phrases[pIdx];
                if (deleting) {
                    el.textContent = current.substring(0, cIdx - 1);
                    cIdx--;
                    speed = 40;
                } else {
                    el.textContent = current.substring(0, cIdx + 1);
                    cIdx++;
                    speed = 80;
                }

                if (!deleting && cIdx === current.length) {
                    deleting = true;
                    speed = 4000;
                } else if (deleting && cIdx === 0) {
                    deleting = false;
                    pIdx = (pIdx + 1) % phrases.length;
                    speed = 600;
                }
                setTimeout(tick, speed);
            }
            if(el) tick();
        }

        const heroPhrases = [
            "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "lorem has been the industry's standard dummy text ever since the 1500s.",
            "ipsum is simply dummy text of the printing and typesetting industry.",
            "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        ];

        const outroPhrases = [
            "\"From this day forward, you shall not walk alone. My heart will be your shelter and my arms will be your home.\"",
            "\"I’d choose you over and over again, in every lifetime.\"",
            "\"With you, I found my forever love.\"",
            "\"I love you more than words can express.\""
        ];

        window.addEventListener('load', () => {
            createTypewriter('typewriter', heroPhrases);
            createTypewriter('typewriter-outro', outroPhrases);
        });

        document.querySelectorAll('a, button, .group').forEach(link => {
            link.addEventListener('mouseenter', () => {
                if(isTouch) return;
                outline.style.width = '50px';
                outline.style.height = '50px';
                outline.style.borderColor = 'white';
                outline.style.backgroundColor = 'rgba(225,29,72,0.1)';
            });
            link.addEventListener('mouseleave', () => {
                if(isTouch) return;
                outline.style.width = '30px';
                outline.style.height = '30px';
                outline.style.borderColor = 'var(--accent-rose)';
                outline.style.backgroundColor = 'transparent';
            });
        });
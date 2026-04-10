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
    const h = document.documentElement, b = document.body;
    const percent = (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight) * 100;
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
function startMusic() {
    if(playing) return;
    audio.play().then(() => {
        playing = true;
        icon.innerHTML = '<path d="M6 4h4v12H6V4zm4 0h4v12h-4V4z"></path>';
    }).catch(() => {});
}
window.addEventListener('load', () => {
    startMusic();
    document.body.addEventListener('click', function once() {
        if(!playing) startMusic();
        document.body.removeEventListener('click', once);
    }, { once: true });
    document.body.addEventListener('touchstart', function onceTouch() {
        if(!playing) startMusic();
        document.body.removeEventListener('touchstart', onceTouch);
    }, { once: true });
});
btn.addEventListener('click', () => {
    if(!playing) {
        audio.play();
        icon.innerHTML = '<path d="M6 4h4v12H6V4zm4 0h4v12h-4V4z"></path>';
        playing = true;
    } else {
        audio.pause();
        icon.innerHTML = '<path d="M6 4l10 6-10 6V4z"></path>';
        playing = false;
    }
});
function createTypewriter(elementId, phrases) {
    const el = document.getElementById(elementId);
    if(!el) return;
    let pIdx = 0, cIdx = 0, deleting = false, speed = 80;
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
    tick();
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
window.addEventListener('scroll', () => {
    const winScroll = window.scrollY;
    const hero = document.getElementById('hero');
    if(hero) hero.style.opacity = 1 - Math.min(winScroll / 500, 0.3);
});
const galleryImages = [
    "https://images.unsplash.com/photo-1513279922550-250c2129b13a?q=80&w=870&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1664529914557-ee01920185e2?q=80&w=380&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=871&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507680576301-98c2029cf434?q=80&w=870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1630576904866-d51b579796f8?q=80&w=902&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1699726265399-b20b23853611?q=80&w=871&auto=format&fit=crop",
    "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?q=80&w=870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1699294144121-52eb57493c06?q=80&w=387&auto=format&fit=crop"
];
function buildGalleryTrack() {
    const track = document.getElementById('galleryTrack');
    if(!track) return;
    let html = '';
    for(let i = 0; i < 3; i++) {
        galleryImages.forEach(src => {
            html += `
                <div class="gallery-card aspect-[4/5] rounded-xl overflow-hidden relative group">
                    <img src="${src}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            `;
        });
    }
    track.innerHTML = html;
}
let animationId = null;
let translateX = 0;
let speed = 1.2;
let isAnimating = true;
function startInfiniteMarquee() {
    const track = document.getElementById('galleryTrack');
    if(!track) return;
    const totalWidth = track.scrollWidth / 3;
    function step() {
        if(!isAnimating) return;
        translateX -= speed;
        if(translateX <= -totalWidth) {
            translateX += totalWidth;
        }
        track.style.transform = `translateX(${translateX}px)`;
        animationId = requestAnimationFrame(step);
    }
    if(animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(step);
}
window.addEventListener('load', () => {
    buildGalleryTrack();
    startInfiniteMarquee();
});
window.addEventListener('resize', () => {
    const track = document.getElementById('galleryTrack');
    if(track && animationId) {
        translateX = 0;
        track.style.transform = `translateX(0px)`;
    }
});

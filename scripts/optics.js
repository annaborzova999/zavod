// Мобильное меню и частицы (те же что везде)
        document.addEventListener('DOMContentLoaded', function() {
            const dropBtn = document.getElementById('dropbtn');
            const dropContent = document.getElementById('dropdownContent');
            dropBtn.addEventListener('click', function(e) { e.preventDefault(); dropContent.classList.toggle('show'); });
            document.addEventListener('click', function(e) { if (!e.target.closest('.dropdown')) dropContent.classList.remove('show'); });
        });

        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        let width, height, particles = [], mouse = { x: -1000, y: -1000 };
        function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize); resize();
        window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
        for (let i = 0; i < 300; i++) { particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, radius: Math.random() * 2 + 0.5 }); }
        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                let dx = p.x - mouse.x; let dy = p.y - mouse.y; let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) { let force = (150 - dist) / 150; let angle = Math.atan2(dy, dx); p.vx += Math.cos(angle) * force * 3; p.vy += Math.sin(angle) * force * 3; }
                p.vx *= 0.97; p.vy *= 0.97;
                if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1) { p.vx += (Math.random() - 0.5) * 0.5; p.vy += (Math.random() - 0.5) * 0.5; }
                if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10; if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = 'rgba(80, 160, 255, 0.7)'; ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();
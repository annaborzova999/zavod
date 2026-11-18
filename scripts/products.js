// ===== МОБИЛЬНОЕ МЕНЮ =====
        document.addEventListener('DOMContentLoaded', function() {
            const dropBtn = document.getElementById('dropbtn');
            const dropContent = document.getElementById('dropdownContent');
            
            dropBtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropContent.classList.toggle('show');
            });
            
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.dropdown')) {
                    dropContent.classList.remove('show');
                }
            });
        });

        // ===== ПАТЕНТЫ (ОТКРЫТИЕ/ЗАКРЫТИЕ) =====
        function openPatent(src) {
            document.getElementById("modalImage").src = src;
            document.getElementById("patentModal").classList.add("show");
        }
        function closePatent() {
            document.getElementById("patentModal").classList.remove("show");
        }
        document.getElementById("patentModal").addEventListener("click", function(e) {
            if (e.target === this) { closePatent(); }
        });

        // ===== ОКНА С МОДЕЛЯМИ (ОТКРЫТИЕ/ЗАКРЫТИЕ) =====
        function openModel(id) {
            document.getElementById('model-' + id).classList.add('show');
        }
        function closeModel(id) {
            document.getElementById('model-' + id).classList.remove('show');
        }

        // ===== ФОРМА ВОПРОСА =====
        let currentTopic = 'Общий вопрос';

        function openAskForm(topic) {
            currentTopic = topic;
            document.getElementById('topic-label').textContent = topic; // Ставим название раздела
            
            // Закрываем все окна с моделями
            document.querySelectorAll('.model-modal').forEach(m => m.classList.remove('show'));
            
            // Открываем форму
            document.getElementById('askFormModal').classList.add('show');
            
            // Очищаем поля формы
            document.getElementById('ask-name').value = '';
            document.getElementById('ask-contact').value = '';
            document.getElementById('ask-question').value = '';
        }

        function closeAskForm() {
            document.getElementById('askFormModal').classList.remove('show');
        }

        function submitQuestion(event) {
            event.preventDefault(); // Останавливаем стандартную отправку формы
            
            // Берем данные из полей
            const name = document.getElementById('ask-name').value.trim();
            const contact = document.getElementById('ask-contact').value.trim();
            const question = document.getElementById('ask-question').value.trim();
            
            // Если что-то не заполнено - ругаемся
            if (!name || !contact || !question) { alert('Пожалуйста, заполните все поля'); return; }
            
            // Формируем тему и текст письма (encodeURIComponent нужен для почтовых ссылок)
            const subject = encodeURIComponent('Вопрос по разделу: ' + currentTopic);
            const body = encodeURIComponent('Имя: ' + name + '\nКонтакт: ' + contact + '\nРаздел: ' + currentTopic + '\n\nВопрос:\n' + question + '\n\n---\nОтправлено с сайта zavod-yupiter.ru');
            
            // Открываем почтовую программу с готовым письмом
            window.location.href = 'mailto:mail@zavod-yupiter.ru?subject=' + subject + '&body=' + body;
            
            // Показываем сообщение и закрываем форму
            setTimeout(() => {
                alert('Спасибо! Ваш вопрос готов к отправке. Откроется почтовая программа, где останется только нажать "Отправить".');
                closeAskForm();
            }, 500);
        }

        // Закрытие модальных окон при клике на фон
        document.querySelectorAll('.model-modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) { this.classList.remove('show'); }
            });
        });
        
        // Закрытие при нажатии Esc
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") { 
                closePatent(); 
                document.querySelectorAll('.model-modal').forEach(m => m.classList.remove('show'));
            }
        });

        // ===== ЧАСТИЦЫ =====
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
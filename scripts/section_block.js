// Функция для перехода к блоку по клику на точку
        function scrollToSection(index) {
            const sections = document.querySelectorAll('section');
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
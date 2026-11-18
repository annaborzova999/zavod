// Проверка загрузки библиотеки
        if (typeof particlesJS === 'undefined') {
            document.getElementById('debug').innerHTML = '❌ Ошибка: particles.js не загрузился!';
            document.getElementById('debug').style.color = '#ef4444';
        } else {
            document.getElementById('debug').innerHTML = '✅ Библиотека загружена. Наведите мышь на частицы!';
            
            // Инициализация частиц с усиленными настройками
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 120, /* Увеличил количество частиц */
                        "density": {
                            "enable": true,
                            "value_area": 600 /* Уменьшил плотность = больше частиц */
                        }
                    },
                    "color": {
                        "value": "#38bdf8" /* Ярко-голубой цвет для лучшей видимости */
                    },
                    "shape": {
                        "type": "circle"
                    },
                    "opacity": {
                        "value": 1, /* Увеличил прозрачность */
                        "random": true
                    },
                    "size": {
                        "value": 1, /* Увеличил размер частиц */
                        "random": true
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 180, /* Увеличил дистанцию соединения */
                        "color": "#38bdf8",
                        "opacity": 0.6, /* Яркие линии */
                        "width": 1.5 /* Толще линии */
                    },
                    "move": {
                        "enable": true,
                        "speed": 3, /* Чуть быстрее для динамики */
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false
                    }
                },
                "interactivity": {
                    "detect_on": "window", /* ← ВАЖНО: detect_on = "window" вместо "canvas" */
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 300, /* ← БОЛЬШОЙ радиус захвата */
                            "line_linked": {
                                "distance": 300,
                                "opacity": 1, /* ← МАКСИМАЛЬНАЯ яркость линий */
                                "color": "#38bdf8"
                            }
                        }
                    }
                },
                "retina_detect": true
            });
        }
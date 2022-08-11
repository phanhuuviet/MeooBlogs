const secretcode = 'meooblog';
        const pressed = [];
        window.addEventListener('keyup', (e) => {
            pressed.push(e.key);
            pressed.splice(-secretcode.length - 1, pressed.length - secretcode.length);
            if (pressed.join('').includes(secretcode)) {
                cornify_add();
            }
        });
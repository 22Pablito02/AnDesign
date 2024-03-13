let theToggle = document.getElementById('toggle');

// hasClass
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
    let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
// toggleClass
function toggleClass(elem, className) {
    let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
            newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function () {
    toggleClass(this, 'on');
    return false;
}


window.addEventListener("DOMContentLoaded", function () {
    const orderCall = document.getElementsByClassName("order_call")[0];
    const orderCallBtn = document.getElementById("order_call_btn");
    const close = document.getElementsByClassName("close")[0];
    const overlay = document.getElementById("overlay");
    const originalContent = orderCall.innerHTML;
    const calcBtn = document.getElementById("calc-btn");
    const mySwiper = document.getElementsByClassName("twoSwiper")[0];
    const calcFinish = document.getElementById("calc-finish");
    const grat = document.getElementsByClassName("gratitude")[0];
    const getCall = document.getElementById("get-calc");

    orderCallBtn.onclick = function () {
        orderCall.style.display = "block";
        overlay.style.display = "block";
    }
    if (getCall) {
        getCall.onclick = function () {
            grat.style.display = "block";
            overlay.style.display = "block";
        }
    }
    if (calcBtn) {
        calcBtn.onclick = function () {
            mySwiper.style.display = "none";
            calcFinish.style.display = "block"
        }
    }
    function closeOrderCall() {
        orderCall.style.display = "none";
        overlay.style.display = "none";
        grat.style.display = "none";
    }

    function closeModal(element) {
        element.addEventListener('click', function (event) {
            if (event.target.matches('.close')) {
                closeOrderCall();
            }
        });
    }


    if (grat) {
        closeModal(grat);
    }
    closeModal(orderCall);

    window.onclick = function (event) {
        if (event.target == overlay) {
            orderCall.style.display = "none";
            overlay.style.display = "none";
            grat.style.display = "none";
        }
    }

    orderCall.addEventListener('submit', function (event) {
        event.preventDefault();
        orderCall.innerHTML = '';

        let newContent = document.createElement('h3');
        newContent.innerHTML = 'Мы свяжемся с вами в ближайшее время!';
        newContent.style.cssText = 'color: #000; text-align: center;';
        orderCall.appendChild(newContent);
        close.onclick = closeOrderCall;

        setTimeout(function () {
            orderCall.innerHTML = originalContent;
            closeOrderCall();
        }, 3000);
    });


    document.body.addEventListener("input", function (event) {
        if (event.target.matches("#number_or")) {
            let keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___ ____",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = ""
            }

            event.target.addEventListener("input", mask, false);
            event.target.addEventListener("focus", mask, false);
            event.target.addEventListener("blur", mask, false);
            event.target.addEventListener("keydown", mask, false);
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.feedback form');
    const nameInput = document.getElementById('name');
    const numberInput = document.getElementById('number');
    const emailInput = document.getElementById('mail');
    const descriptionInput = document.getElementById('description-task');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Проверка на пустые поля
        if (!nameInput.value.trim() || !numberInput.value.trim() || !emailInput.value.trim() || !descriptionInput.value.trim()) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const formData = new FormData(this); 
        const url = this.getAttribute('action');

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.text();
        })
        .then(data => {
            console.log('Данные успешно отправлены:', data);
            nameInput.value = '';
            numberInput.value = '';
            emailInput.value = '';
            descriptionInput.value = '';
        })
        .catch(error => {
            console.error('Ошибка отправки данных:', error.message);
        });
    });
});






document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.order');
    const phoneInput = document.querySelector('.order input[type="tel"]');
    const emailInput = document.querySelector('.order input[type="email"]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!phoneInput.value.trim() || !emailInput.value.trim()) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const formData = new FormData(this); 
        const url = this.getAttribute('action'); 

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.text();
        })
        .then(data => {
            console.log('Данные успешно отправлены:', data);
            phoneInput.value = '';
            emailInput.value = '';
        })
        .catch(error => {
            console.error('Ошибка отправки данных:', error.message);
        });
    });
});


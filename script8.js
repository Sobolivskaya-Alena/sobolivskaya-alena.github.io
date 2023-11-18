/*jslint browser: true */
/*jslint single: true */
/*jslint unordered: true */
/*jslint this: true */
/*global $, jQuery, history, Slapform */

function homeURL() {
    history.pushState({modal: "close"}, "ModalOut", "./index8.html");
}

function modalCh(event) {
    if (event) {
        document.querySelector(".main_but").click();
    } else {
        document.querySelector(".close").click();
        homeURL();
    }
}

window.onload = function (event) {
    let stateStatus = event.currentTarget.history.state;
    modalCh(stateStatus && stateStatus.modal === "open");

    document.querySelector(".main_but").addEventListener("click", function () {
        history.pushState({modal: "open"}, "ModalIn", "?form=true");
    });

    let modalPop = document.getElementById("exampleModal");
    modalPop.addEventListener("click", function (e) {
        if (e.target === document.getElementById("exampleModal")) {
            homeURL();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            homeURL();
        }
    });

    document.querySelector(".close").addEventListener("click", function () {
        homeURL();
    });


    let slapformMain = document.getElementById("main");
    slapformMain.addEventListener("submit", function (e) {
        e.preventDefault();

        let status = document.getElementById("status");
        let slapforms = new Slapform();
        slapforms.submit({
            form: "hSfvks6qU",
            data: {
                fio: document.getElementById("fio").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                organization: document.getElementById("organization").value,
                message: document.getElementById("message").value,
                oznakomlen: document.getElementById("check_mark").value
            }
        }).then(function () {
            status.style.color = "rgba(122, 77, 167, 0.975)";
            status.innerHTML = "Отправлено";

            let inps = document.querySelectorAll(".form_input, #check_mark");
            for (let i = 0; i < inps.length; i++) {
                localStorage.removeItem(inps[i].id);
                inps[i].value = "";
            }
            document.getElementById("check_mark").checked = false;
        }).catch(function () {
            status.style.color = "red";
            status.innerHTML = "Данные не отправлены";
        });
    });

    function editLocStor(el, val) {
        localStorage.setItem(el, val);
        if (val === "") {
            localStorage.removeItem(el);
        }
    }

    $(".form_input").on("change", function () {
        editLocStor(this.id, this.value);
    });

    $(".form_input").on("input", function () {
        editLocStor(this.id, this.value);
    });

    $("#oznakomlen").on("click", function () {
        editLocStor(this.id, this.checked);
    });

    let inps = document.querySelectorAll(".form_input");
    for (let i = 0; i < inps.length; i++) {
        let val = localStorage.getItem(inps[i].id);
        if (val != null) {
            inps[i].value = val;
        }
    }
};


window.onpopstate = function (event) {
    modalCh(event.state && event.state.modal === "open");
};

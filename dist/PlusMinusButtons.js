class PlusMinusButtons {
    workPlusMinusButtonsComments() {
        const messages = document.querySelectorAll(".comment_people ");
        messages.forEach(function (mess) {
            const btnMinus = mess.querySelector(".button_minus");
            const btnPlus = mess.querySelector(".button_plus");
            const numberLikes = +mess.querySelector(".number_likes").textContent;
            let newNumberLikes = numberLikes;
            btnMinus.addEventListener("click", function () {
                newNumberLikes--;
                getNumber(newNumberLikes);
            });
            btnPlus.addEventListener("click", function () {
                newNumberLikes++;
                getNumber(newNumberLikes);
            });
            function getNumber(num) {
                localStorage.setItem(`newLike${mess.getAttribute("data-index")}`, `${num}`);
                mess.querySelector(".number_likes").innerText = `${num}`;
                if (num <= Number(localStorage.getItem(`like${mess.getAttribute("data-index")}`)) - 1) {
                    btnMinus.setAttribute("disabled", "");
                    btnMinus.style = "color: black; opacity: 0.4;";
                }
                else {
                    btnMinus.removeAttribute("disabled");
                    btnMinus.removeAttribute("style");
                }
                if (num >= Number(localStorage.getItem(`like${mess.getAttribute("data-index")}`)) + 1) {
                    btnPlus.setAttribute("disabled", "");
                    btnPlus.style = "color: black; opacity: 0.4;";
                }
                else {
                    btnPlus.removeAttribute("disabled");
                    btnPlus.removeAttribute("style");
                }
                if (num < 0) {
                    mess.querySelector(".number_likes").style = "color: red";
                }
                else {
                    mess.querySelector(".number_likes").removeAttribute("style");
                }
            }
        });
    }
    workPlusMinusButtonsAnswers() {
        const messages = document.querySelectorAll(".comment_people ");
        messages.forEach(function (mess, index) {
            let answer = mess.querySelectorAll(".answer");
            answer.forEach(function (ans) {
                const btnMinus = ans.querySelector(".button_minus");
                const btnPlus = ans.querySelector(".button_plus");
                const numberLikes = Number(ans.querySelector(".number_likes").textContent);
                let newNumberLikes = numberLikes;
                btnMinus.addEventListener("click", function () {
                    newNumberLikes--;
                    getNumberAnswer(newNumberLikes);
                });
                btnPlus.addEventListener("click", function () {
                    newNumberLikes++;
                    getNumberAnswer(newNumberLikes);
                });
                function getNumberAnswer(num) {
                    localStorage.setItem(`newLikeAnswer${ans.closest(".comment_people").getAttribute("data-index")}.index${ans.closest(".answer").getAttribute("data-index")}`, `${num}`);
                    ans.querySelector(".number_likes").innerText = `${num}`;
                    if (num <= Number(localStorage.getItem(`likeAnswer${ans.closest(".comment_people").getAttribute("data-index")}.index${ans.closest(".answer").getAttribute("data-index")}`)) - 1) {
                        btnMinus.setAttribute("disabled", "");
                        btnMinus.style = "color: black; opacity: 0.4;";
                    }
                    else {
                        btnMinus.removeAttribute("disabled");
                        btnMinus.removeAttribute("style");
                    }
                    if (num >= Number(localStorage.getItem(`likeAnswer${ans.closest(".comment_people").getAttribute("data-index")}.index${ans.closest(".answer").getAttribute("data-index")}`)) + 1) {
                        btnPlus.setAttribute("disabled", "");
                        btnPlus.style = "color: black; opacity: 0.4;";
                    }
                    else {
                        btnPlus.removeAttribute("disabled");
                        btnPlus.removeAttribute("style");
                    }
                    if (num < 0) {
                        ans.querySelector(".number_likes").style = "color: red";
                    }
                    else {
                        ans.querySelector(".number_likes").removeAttribute("style");
                    }
                }
            });
        });
    }
}
export default PlusMinusButtons;

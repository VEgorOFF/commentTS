import GetStartComments from "./GetStartComments.js";
import LoadContent from "./LoadContent.js";
import PlusMinusButtons from "./PlusMinusButtons.js";
import SortComments from "./SortComments.js";
import Count from "./Count.js";
document.addEventListener("DOMContentLoaded", mainStart);
const getStartComments = new GetStartComments();
const sortComments = new SortComments();
const loadContent = new LoadContent();
const plusMinusButtons = new PlusMinusButtons();
const count = new Count();
function mainStart() {
    getStartComments.drawStartComments();
    getStartComments.drawGetApi();
    loadContent.drawGetComments();
    loadContent.drawGetAnswers();
    count.workCommentsCount();
    count.workAnswerCount();
    loadContent.drawGetFavorites();
    sortComments.workSortFavorites();
    workSort();
    plusMinusButtons.workPlusMinusButtonsComments();
    plusMinusButtons.workPlusMinusButtonsAnswers();
    workSendComment();
}
function workSendComment() {
    const allComments = document.querySelector(".allComments");
    const buttonSend = document.querySelectorAll(".send")[0];
    const textArea = document.querySelectorAll(".message")[0];
    const maxText = document.querySelectorAll(".max_text")[0];
    const warningText = document.querySelectorAll(".warning_text")[0];
    let indexAuthorComment;
    let local = localStorage.getItem("indexAuthorComment");
    if (local !== null) {
        let localNumber = Number(local);
        indexAuthorComment = localNumber;
    }
    else {
        indexAuthorComment = 0;
    }
    textArea.addEventListener("input", function (event) {
        textArea.style.height = "5px";
        textArea.style.height = `${textArea.scrollHeight}px`;
        if (event.target !== null && event.target.value.length === 0) {
            buttonSend.setAttribute("disabled", "");
            buttonSend.style.background = "#a1a1a1";
            buttonSend.classList.remove("hover-style");
        }
        else {
            buttonSend.removeAttribute("disabled");
            buttonSend.style.background = "#ABD873";
            buttonSend.classList.add("hover-style");
        }
        if (event.target !== null && event.target.value.length > 0) {
            maxText.innerHTML = `${event.target.value.length}/1000`;
            if (event.target.value.length > 1000) {
                buttonSend.setAttribute("disabled", "");
                buttonSend.style.background = "#a1a1a1";
                buttonSend.classList.remove("hover-style");
                maxText.setAttribute("style", "color:red; opacity: 1;");
                warningText.style.display = "flex";
                warningText.style.gridColumnStart = "1";
                warningText.style.gridColumnEnd = "3";
                warningText.style.justifyContent = "center";
            }
            else {
                maxText.setAttribute("style", "color:black; opacity: 0.4;");
                warningText.style.display = "none";
            }
        }
        else {
            maxText.innerText = "Макс. 1000 символов";
        }
    });
    buttonSend.addEventListener("click", function () {
        //отправка комментария
        const messages = document.querySelectorAll(".comment_people");
        const newComment = document.createElement("div");
        newComment.className = "comment_people author_comments";
        newComment.setAttribute("data-index", `${messages.length}`);
        const authorAndMessage = document.createElement("div");
        authorAndMessage.className = "author_and_message";
        var nowTime = new Date();
        const authorAvatar = document.getElementById("avatar");
        const cloneAuthorAvatar = authorAvatar.cloneNode(true);
        const authorAndText = document.createElement("div");
        authorAndText.className = "author_and_text";
        const authorName = document.getElementById("name");
        const cloneAuthorName = authorName.cloneNode(true);
        const timeComment = document.createElement("div");
        timeComment.className = "date_and_time";
        timeComment.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;
        localStorage.setItem(`dateAuthorComment${indexAuthorComment}`, `${timeComment.textContent}`);
        const commentText = document.createElement("div");
        commentText.className = "comment_text";
        commentText.innerText = `${textArea.value}`;
        localStorage.setItem(`authorComment${indexAuthorComment}`, `${commentText.textContent}`);
        const underText = document.createElement("div");
        underText.className = "under_text";
        let likeRandom;
        likeRandom = random(0, 10);
        underText.innerHTML = `<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/like_null.png" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;
        localStorage.setItem(`like${newComment.getAttribute("data-index")}`, `${likeRandom}`);
        authorAndText.appendChild(cloneAuthorName);
        authorAndText.appendChild(timeComment);
        authorAndMessage.appendChild(cloneAuthorAvatar);
        authorAndMessage.appendChild(authorAndText);
        authorAndMessage.appendChild(commentText);
        authorAndMessage.appendChild(underText);
        newComment.appendChild(authorAndMessage);
        if (allComments !== null) {
            allComments.insertBefore(newComment, allComments.firstChild);
        }
        count.workCommentsCount();
        textArea.value = "";
        textArea.style.height = "43.531px";
        buttonSend.setAttribute("disabled", "");
        buttonSend.style.background = "#a1a1a1";
        buttonSend.classList.remove("hover-style");
        maxText.innerText = "Макс. 1000 символов";
        indexAuthorComment++;
        localStorage.setItem("indexAuthorComment", `${indexAuthorComment}`);
        plusMinusButtons.workPlusMinusButtonsComments();
        sortComments.workSortFavorites();
        workSort();
    });
}
function workSendAnswers(messageAtributeIndex) {
    const formAnswer = document.getElementById("form_answer");
    if (formAnswer !== null) {
        formAnswer.style = "display: grid";
        formAnswer.classList += " answer_padding";
        const buttonSendAnswer = formAnswer.querySelector(".send");
        const textAreaAnswer = formAnswer.querySelector(".message");
        const maxTextAnswer = formAnswer.querySelector(".max_text");
        const warningTextAnswer = formAnswer.querySelector(".warning_text");
        let indexAuthorAnswer;
        let local = localStorage.getItem("indexAuthorAnswer");
        if (local !== null) {
            let localNumber = Number(local);
            indexAuthorAnswer = localNumber;
        }
        else {
            indexAuthorAnswer = 0;
        }
        if (buttonSendAnswer !== null) {
            buttonSendAnswer.style = "width: 100px";
        }
        if (textAreaAnswer !== null && buttonSendAnswer !== null && maxTextAnswer !== null && warningTextAnswer !== null) {
            textAreaAnswer.addEventListener("input", function (event) {
                textAreaAnswer.style.height = "5px";
                textAreaAnswer.style.height = `${textAreaAnswer.scrollHeight}px`;
                if (event.target.value.length === 0) {
                    buttonSendAnswer.setAttribute("disabled", "");
                    buttonSendAnswer.style.background = "#a1a1a1";
                    buttonSendAnswer.classList.remove("hover-style");
                }
                else {
                    buttonSendAnswer.removeAttribute("disabled");
                    buttonSendAnswer.style.background = "#ABD873";
                    buttonSendAnswer.classList.add("hover-style");
                }
                if (event.target.value.length > 0) {
                    maxTextAnswer.innerHTML = `${event.target.value.length}/1000`;
                    if (event.target.value.length > 1000) {
                        buttonSendAnswer.setAttribute("disabled", "");
                        buttonSendAnswer.style.background = "#a1a1a1";
                        buttonSendAnswer.classList.remove("hover-style");
                        maxTextAnswer.setAttribute("style", "color:red; opacity: 1;");
                        warningTextAnswer.style.display = "flex";
                        warningTextAnswer.style.gridColumnStart = "1";
                        warningTextAnswer.style.gridColumnEnd = "3";
                        warningTextAnswer.style.justifyContent = "center";
                    }
                    else {
                        maxTextAnswer.setAttribute("style", "color:black; opacity: 0.4;");
                        warningTextAnswer.style.display = "none";
                    }
                }
                else {
                    maxTextAnswer.innerText = "Макс. 1000 символов";
                }
            });
            buttonSendAnswer.addEventListener("click", function () {
                const answer = document.createElement("div");
                answer.className = "answer";
                const authorAndMessage = document.createElement("div");
                authorAndMessage.className = "author_and_message";
                const avatarAuthor = document.getElementById("avatar").cloneNode(true);
                avatarAuthor.className = "avatar_author";
                const authorAndText = document.createElement("div");
                authorAndText.className = "author_and_text author_and_text_answer";
                const authorName = document.getElementById("name");
                const cloneAuthorName = authorName.cloneNode(true);
                const timeComment = document.createElement("div");
                var nowTime = new Date();
                timeComment.className = "date_and_time";
                timeComment.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;
                const arrowAnswer = document.createElement("img");
                arrowAnswer.src = "images/otvet.svg";
                arrowAnswer.alt = "ответ";
                const nameAuthorComment = document.createElement("div");
                nameAuthorComment.className = "name_author_comment";
                const commentText = document.createElement("div");
                commentText.className = "comment_text";
                commentText.innerText = `${textAreaAnswer.value}`;
                const underText = document.createElement("div");
                underText.className = "under_text under_text_answer";
                let likeRandom = random(0, 10);
                underText.innerHTML = `<div class="button_favorites"><img src="images/like_null.png" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;
                authorAndText.appendChild(cloneAuthorName);
                authorAndText.appendChild(arrowAnswer);
                authorAndText.appendChild(nameAuthorComment);
                authorAndText.appendChild(timeComment);
                authorAndMessage.appendChild(underText);
                authorAndMessage.appendChild(commentText);
                authorAndMessage.appendChild(authorAndText);
                authorAndMessage.appendChild(avatarAuthor);
                answer.appendChild(authorAndMessage);
                const answerMessage = document.querySelector(`.comment_people[data-index="${messageAtributeIndex}"]`);
                answerMessage.appendChild(answer);
                const answerParent = answer.closest(".comment_people");
                if (answerParent !== null) {
                    const answersIndex = answerParent.querySelectorAll(".answer").length - 1;
                    answer.setAttribute("data-index", `${answersIndex}`);
                }
                nameAuthorComment.innerText = `${nameAuthorComment.closest(".comment_people").querySelector(".name_author").textContent}`;
                textAreaAnswer.value = "";
                textAreaAnswer.style.height = "43.531px";
                buttonSendAnswer.setAttribute("disabled", "");
                buttonSendAnswer.style.background = "#a1a1a1";
                buttonSendAnswer.classList.remove("hover-style");
                maxTextAnswer.innerText = "Макс. 1000 символов";
                formAnswer.remove();
                if (answerParent !== null) {
                    localStorage.setItem(`likeAnswer${answerParent.getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, `${likeRandom}`);
                    localStorage.setItem(`idAnswerParent${answerParent.getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, answerParent.getAttribute("data-index"));
                    localStorage.setItem(`dateAnswer${answerParent.getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, timeComment.textContent);
                    localStorage.setItem(`authorAnswer${answerParent.getAttribute("data-index")}.index${answer.getAttribute("data-index")}`, commentText.textContent);
                }
                indexAuthorAnswer++;
                localStorage.setItem("indexAuthorAnswer", `${indexAuthorAnswer}`);
                plusMinusButtons.workPlusMinusButtonsAnswers();
                count.workAnswerCount();
            });
        }
    }
}
//кнопки ОТВЕТИТЬ
document.addEventListener("click", (event) => {
    const messages = document.querySelectorAll(".comment_people");
    if (event.target.closest(".button_answer")) {
        messages.forEach(function (mess) {
            //проверка есть ли блоки с отправкой ответа, то удалить
            if (mess.querySelector(".copy_form_answer") !== null) {
                mess.querySelector(".copy_form_answer").remove();
            }
        });
        const index = Number(event.target.closest(".button_answer").getAttribute("data-index"));
        const formSend = document.querySelector(".comment_author");
        if (formSend !== null) {
            const cloneFormSend = formSend.cloneNode(true);
            cloneFormSend.className += " copy_form_answer";
            cloneFormSend.id = "form_answer";
            const parent = document.querySelector(`.comment_people[data-index="${index}"]`);
            if (parent !== null) {
                parent.appendChild(cloneFormSend);
            }
            workSendAnswers(index);
        }
    }
});
//кнопки избранное
document.addEventListener("click", (event) => {
    const buttonFavorites = event.target.closest(".button_favorites");
    if (buttonFavorites) {
        const id = event.target.closest(".comment_people").getAttribute("data-index");
        if (event.target.closest(".answer") !== null) {
            if (buttonFavorites.hasAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`)) {
                localStorage.removeItem(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`);
                buttonFavorites.removeAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`);
                buttonFavorites.style = "color: black";
                buttonFavorites.innerHTML = '<img src="images/like_null.png" alt="izbran" /><p>В избранное</p>';
            }
            else {
                buttonFavorites.style = "color: red";
                buttonFavorites.innerHTML = '<img src="images/like_active.png" alt="izbran" /><p>В избранном</p>';
                buttonFavorites.setAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`, `${true}`);
                localStorage.setItem(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`, buttonFavorites.getAttribute(`active-favorites${id}-${buttonFavorites.closest(".answer").getAttribute("data-index")}`));
            }
        }
        else {
            if (buttonFavorites.hasAttribute(`active-favorites${id}`) && localStorage.getItem(`active-favorites${id}`) !== null) {
                buttonFavorites.removeAttribute(`active-favorites${id}`);
                localStorage.removeItem(`active-favorites${id}`);
                buttonFavorites.style = "color: black";
                buttonFavorites.innerHTML = '<img src="images/like_null.png" alt="izbran" /><p>В избранное</p>';
            }
            else {
                buttonFavorites.style = "color: red";
                buttonFavorites.innerHTML = '<img src="images/like_active.png" alt="izbran" /><p>В избранном</p>';
                buttonFavorites.setAttribute(`active-favorites${id}`, `${true}`);
                localStorage.setItem(`active-favorites${id}`, buttonFavorites.getAttribute(`active-favorites${id}`));
            }
        }
    }
});
//сортировка
function workSort() {
    const sortName = document.querySelector(".sort_name p");
    const sortDate = document.getElementById("date");
    const sortCountLikes = document.getElementById("count_likes");
    const sortActual = document.getElementById("actual");
    const sortCountAnswers = document.getElementById("count_answers");
    const arrow = document.getElementById("arrow");
    sortName.innerHTML = sortActual.querySelector("p").textContent;
    arrow.style.display = "none";
    sortDate.addEventListener("click", function () {
        sortName.innerHTML = sortDate.querySelector("p").textContent;
        if ((arrow.style.display = "none")) {
            arrow.style.display = "flex";
            arrow.style.transform = "rotate(0deg)";
            arrow.style.transition = "500ms ease-out";
        }
        sortComments.workSortDateComments();
    });
    sortCountLikes.addEventListener("click", function () {
        sortName.innerHTML = sortCountLikes.querySelector("p").textContent;
        if ((arrow.style.display = "none")) {
            arrow.style.display = "flex";
            arrow.style.transform = "rotate(0deg)";
            arrow.style.transition = "500ms ease-out";
        }
        sortComments.workSortLikes();
    });
    sortActual.addEventListener("click", function () {
        sortName.innerHTML = sortActual.querySelector("p").textContent;
        arrow.style.display = "none";
        sortComments.workSortDateComments();
    });
    sortCountAnswers.addEventListener("click", function () {
        sortName.innerHTML = sortCountAnswers.querySelector("p").textContent;
        if ((arrow.style.display = "none")) {
            arrow.style.display = "flex";
            arrow.style.transform = "rotate(0deg)";
            arrow.style.transition = "500ms ease-out";
        }
        sortComments.workSortCountAnswers();
    });
}
function padTo2Digits(num) {
    return num.toString().padStart(2, "0"); // Преобразует 9 в 09, а 10 оставит без изменений
}
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

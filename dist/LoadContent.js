class LoadContent {
    drawGetComments() {
        let i = 0;
        while (localStorage.getItem(`dateAuthorComment${i}`) !== null && localStorage.getItem(`authorComment${i}`) !== null) {
            const allComments = document.querySelector(".allComments");
            const newComment = document.createElement("div");
            newComment.className = "comment_people author_comments";
            newComment.setAttribute("data-index", `${document.querySelectorAll(".comment_people").length}`);
            const authorAndMessage = document.createElement("div");
            authorAndMessage.className = "author_and_message";
            const avatarAuthor = document.createElement("div");
            avatarAuthor.className = "avatar_author";
            avatarAuthor.innerHTML = `<img src="${localStorage.getItem(`picture[0]`)}">`;
            const authorAndText = document.createElement("div");
            authorAndText.className = "author_and_text";
            const nameAuthor = document.createElement("div");
            nameAuthor.className = "name_author";
            nameAuthor.innerHTML = `${localStorage.getItem(`firstName[0]`)} ${localStorage.getItem(`lastName[0]`)}`;
            const timeComment = document.createElement("div");
            timeComment.className = "date_and_time";
            timeComment.innerText = `${localStorage.getItem(`dateAuthorComment${i}`)}`;
            const commentText = document.createElement("div");
            commentText.className = "comment_text";
            commentText.innerText = `${localStorage.getItem(`authorComment${i}`)}`;
            let likeRandom;
            if (localStorage.getItem(`newLike${newComment.getAttribute("data-index")}`) !== null) {
                likeRandom = Number(localStorage.getItem(`newLike${newComment.getAttribute("data-index")}`));
            }
            else {
                if (localStorage.getItem(`like${newComment.getAttribute("data-index")}`) !== null) {
                    likeRandom = Number(localStorage.getItem(`like${newComment.getAttribute("data-index")}`));
                }
                else {
                    likeRandom = random(0, 10);
                    localStorage.setItem(`like${newComment.getAttribute("data-index")}`, `${likeRandom}`);
                }
            }
            const underText = document.createElement("div");
            underText.className = "under_text";
            underText.innerHTML = `<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/like_null.png" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;
            authorAndMessage.appendChild(avatarAuthor);
            authorAndMessage.appendChild(authorAndText);
            authorAndText.appendChild(nameAuthor);
            authorAndText.appendChild(timeComment);
            authorAndMessage.appendChild(commentText);
            authorAndMessage.appendChild(underText);
            newComment.appendChild(authorAndMessage);
            if (allComments !== null) {
                allComments.insertBefore(newComment, allComments.firstChild);
            }
            const newLikeLokalStorage = Number(localStorage.getItem(`newLike${newComment.getAttribute("data-index")}`));
            const likeLikalStorage = Number(localStorage.getItem(`like${newComment.getAttribute("data-index")}`));
            const btnPlus = authorAndMessage.querySelector(".button_minus");
            const btnMinus = authorAndMessage.querySelector(".button_minus");
            if (localStorage.getItem(`newLike${newComment.getAttribute("data-index")}`) !== null && newLikeLokalStorage <= likeLikalStorage - 1) {
                btnMinus.setAttribute("disabled", "");
                btnMinus.style = "color: black; opacity: 0.4;";
            }
            else {
                btnMinus.removeAttribute("disabled");
                btnMinus.removeAttribute("style");
            }
            if (localStorage.getItem(`newLike${newComment.getAttribute("data-index")}`) !== null && newLikeLokalStorage >= likeLikalStorage + 1) {
                btnPlus.setAttribute("disabled", "");
                btnPlus.style = "color: black; opacity: 0.4;";
            }
            else {
                btnPlus.removeAttribute("disabled");
                btnPlus.removeAttribute("style");
            }
            const divNumberLikes = authorAndMessage.querySelector(".number_likes");
            if (divNumberLikes !== null) {
                const numberLikes = Number(divNumberLikes.textContent);
                if (numberLikes < 0) {
                    divNumberLikes.style = "color: red";
                }
                else {
                    divNumberLikes.removeAttribute("style");
                }
            }
            i++;
        }
    }
    drawGetAnswers() {
        const messages = document.querySelectorAll(".comment_people");
        for (let i = 0; i <= messages.length; i++) {
            for (let k = 0; k <= messages.length; k++) {
                if (localStorage.getItem(`dateAnswer${i}.index${k}`) !== null && localStorage.getItem(`authorAnswer${i}.index${k}`) !== null && localStorage.getItem(`idAnswerParent${i}.index${k}`) !== null) {
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
                    timeComment.innerText = `${localStorage.getItem(`dateAnswer${i}.index${k}`)}`;
                    const nameAuthorComment = document.createElement("div");
                    nameAuthorComment.className = "name_author_comment";
                    const arrowAnswer = document.createElement("img");
                    arrowAnswer.src = "images/otvet.svg";
                    arrowAnswer.alt = "ответ";
                    const commentText = document.createElement("div");
                    commentText.className = "comment_text";
                    commentText.innerText = `${localStorage.getItem(`authorAnswer${i}.index${k}`)}`;
                    const underText = document.createElement("div");
                    underText.className = "under_text under_text_answer";
                    let likeRandom;
                    if (localStorage.getItem(`newLikeAnswer${i}.index${k}`) !== null) {
                        likeRandom = localStorage.getItem(`newLikeAnswer${i}.index${k}`);
                    }
                    else {
                        if (localStorage.getItem(`likeAnswer${i}.index${k}`) !== null) {
                            likeRandom = localStorage.getItem(`likeAnswer${i}.index${k}`);
                        }
                    }
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
                    const newLikeAnswerLocalStorage = Number(localStorage.getItem(`newLikeAnswer${i}.index${k}`));
                    const likeAnswerLocalStorage = Number(localStorage.getItem(`likeAnswer${i}.index${k}`));
                    const btnPlus = authorAndMessage.querySelector(".button_plus");
                    const btnMinus = authorAndMessage.querySelector(".button_minus");
                    if (localStorage.getItem(`newLikeAnswer${i}.index${k}`) !== null && newLikeAnswerLocalStorage <= likeAnswerLocalStorage - 1) {
                        btnMinus.setAttribute("disabled", "");
                        btnMinus.style = "color: black; opacity: 0.4;";
                    }
                    else {
                        btnMinus.removeAttribute("disabled");
                        btnMinus.removeAttribute("style");
                    }
                    if (localStorage.getItem(`newLikeAnswer${i}.index${k}`) !== null && newLikeAnswerLocalStorage >= likeAnswerLocalStorage + 1) {
                        btnPlus.setAttribute("disabled", "");
                        btnPlus.style = "color: black; opacity: 0.4;";
                    }
                    else {
                        btnPlus.removeAttribute("disabled");
                        btnPlus.removeAttribute("style");
                    }
                    const divNumberLikes = authorAndMessage.querySelector(".number_likes");
                    if (divNumberLikes !== null) {
                        const numberLikes = Number(divNumberLikes.textContent);
                        if (numberLikes < 0) {
                            divNumberLikes.style = "color: red";
                        }
                        else {
                            divNumberLikes.removeAttribute("style");
                        }
                    }
                    const idAnswerParentIndex = Number(localStorage.getItem(`idAnswerParent${i}.index${k}`));
                    messages[messages.length - idAnswerParentIndex - 1].appendChild(answer);
                    if (nameAuthorComment.closest(".comment_people").querySelector(".name_author") !== null) {
                        const nameAuthor = nameAuthorComment.closest(".comment_people").querySelector(".name_author");
                        nameAuthorComment.innerText = `${nameAuthor.textContent}`;
                    }
                }
            }
        }
    }
    drawGetFavorites() {
        const buttonFavorites = document.querySelectorAll(".button_favorites");
        buttonFavorites.forEach(function (btn) {
            let id = btn.closest(".comment_people").getAttribute("data-index");
            if (localStorage.getItem(`active-favorites${id}`) !== null && btn.closest(".answer") === null) {
                btn.setAttribute(`active-favorites${id}`, `${localStorage.getItem(`active-favorites${id}`)}`);
                btn.style = "color: red";
                btn.innerHTML = "<p>В избранном</p>";
            }
            if (btn.closest(".answer") !== null && localStorage.getItem(`active-favorites${id}.${btn.closest(".answer").getAttribute("data-index")}`) !== null) {
                btn.setAttribute(`active-favorites${id}-${btn.closest(".answer").getAttribute("data-index")}`, localStorage.getItem(`active-favorites${id}.${btn.closest(".answer").getAttribute("data-index")}`));
                btn.style = "color: red";
                btn.innerHTML = "<p>В избранном</p>";
            }
        });
    }
}
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
export default LoadContent;

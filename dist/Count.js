class Count {
    workCommentsCount() {
        const commentPeople = document.querySelectorAll(".comment_people");
        const buttonAnswer = document.querySelectorAll(".button_answer");
        const divCount = document.querySelector(".first p:last-child");
        if (divCount !== null) {
            divCount.innerHTML = `(${commentPeople.length})`;
        }
        let id = commentPeople.length - 1;
        for (let i = 0; i < commentPeople.length; i++) {
            commentPeople[i].setAttribute("data-index", `${id}`);
            buttonAnswer[i].setAttribute("data-index", `${id}`);
            id = id - 1;
            localStorage.setItem(`id_comment[${i}]`, `${i}`);
        }
    }
    workAnswerCount() {
        const commentPeople = document.querySelectorAll(".comment_people");
        commentPeople.forEach(function (mess) {
            if (mess.querySelectorAll(".answer").length !== 0) {
                mess.querySelectorAll(".answer").forEach(function (answer, index) {
                    answer.setAttribute("data-index", `${index}`);
                });
            }
        });
    }
}
export default Count;

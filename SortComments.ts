class SortComments {
  workSortCountAnswers() {
    const allComments = document.querySelector(".allComments");
    let arrAllComments = Array.from(allComments!.children);
    let sortArrAllComments = arrAllComments.sort((a, b) => b.querySelectorAll(".answer").length - a.querySelectorAll(".answer").length);

    sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));

    const arrow = document.getElementById("arrow");
    let isAgain = false;
    arrow!.addEventListener("click", function () {
      if (!isAgain) {
        sortArrAllComments = arrAllComments.sort((a, b) => a.querySelectorAll(".answer").length - b.querySelectorAll(".answer").length);
        sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));
        arrow!.style.transform = "rotate(180deg)";
        arrow!.style.transition = "500ms ease-out";
        isAgain = true;
      } else {
        sortArrAllComments = arrAllComments.sort((a, b) => b.querySelectorAll(".answer").length - a.querySelectorAll(".answer").length);
        sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));
        arrow!.style.transform = "rotate(360deg)";
        arrow!.style.transition = "500ms ease-out";
        isAgain = false;
      }
    });
  }

  workSortDateComments() {
    const allComments = document.querySelector(".allComments");
    let arrAllComments = Array.from(allComments!.children);
    let sortArrAllComments = arrAllComments.sort(
      (a, b) =>
        Number(new Date(`${b.querySelector(".date_and_time")!.textContent!.substr(3, 2)}/${b.querySelector(".date_and_time")!.textContent!.substr(0, 2)}${b.querySelector(".date_and_time")!.textContent!.substr(5, 6)}`)) -
        Number(new Date(`${a.querySelector(".date_and_time")!.textContent!.substr(3, 2)}/${a.querySelector(".date_and_time")!.textContent!.substr(0, 2)}${a.querySelector(".date_and_time")!.textContent!.substr(5, 6)}`))
    );
    sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));

    const arrow = document.getElementById("arrow");
    let isAgain = false;
    arrow!.addEventListener("click", function () {
      if (!isAgain) {
        sortArrAllComments = arrAllComments.sort(
          (a, b) =>
            Number(new Date(`${a.querySelector(".date_and_time")!.textContent!.substr(3, 2)}/${a.querySelector(".date_and_time")!.textContent!.substr(0, 2)}${a.querySelector(".date_and_time")!.textContent!.substr(5, 6)}`)) -
            Number(new Date(`${b.querySelector(".date_and_time")!.textContent!.substr(3, 2)}/${b.querySelector(".date_and_time")!.textContent!.substr(0, 2)}${b.querySelector(".date_and_time")!.textContent!.substr(5, 6)}`))
        );
        sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));
        arrow!.style.transform = "rotate(180deg)";
        arrow!.style.transition = "500ms ease-out";
        isAgain = true;
      } else {
        sortArrAllComments = arrAllComments.sort(
          (a, b) =>
            Number(new Date(`${b.querySelector(".date_and_time")!.textContent!.substr(3, 2)}/${b.querySelector(".date_and_time")!.textContent!.substr(0, 2)}${b.querySelector(".date_and_time")!.textContent!.substr(5, 6)}`)) -
            Number(new Date(`${a.querySelector(".date_and_time")!.textContent!.substr(3, 2)}/${a.querySelector(".date_and_time")!.textContent!.substr(0, 2)}${a.querySelector(".date_and_time")!.textContent!.substr(5, 6)}`))
        );
        sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));
        arrow!.style.transform = "rotate(360deg)";
        arrow!.style.transition = "500ms ease-out";
        isAgain = false;
      }
    });
  }

  workSortLikes() {
    const allComments = document.querySelector(".allComments");
    let arrAllComments = Array.from(allComments!.children);
    let sortArrAllComments = arrAllComments.sort((a, b) => Number(b.querySelector(".number_likes")!.textContent) - Number(a.querySelector(".number_likes")!.textContent));

    sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));

    const arrow = document.getElementById("arrow");
    let isAgain = false;
    arrow!.addEventListener("click", function () {
      if (!isAgain) {
        sortArrAllComments = arrAllComments.sort((a, b) => Number(a.querySelector(".number_likes")!.textContent) - Number(b.querySelector(".number_likes")!.textContent));
        sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));
        arrow!.style.transform = "rotate(180deg)";
        arrow!.style.transition = "500ms ease-out";
        isAgain = true;
      } else {
        sortArrAllComments = arrAllComments.sort((a, b) => Number(b.querySelector(".number_likes")!.textContent) - Number(a.querySelector(".number_likes")!.textContent));
        sortArrAllComments.forEach((el) => document.querySelector(".allComments")!.appendChild(el));
        arrow!.style.transform = "rotate(360deg)";
        arrow!.style.transition = "500ms ease-out";
        isAgain = false;
      }
    });
  }

  workSortFavorites() {
    const favoritesButton = document.querySelector(".favorites");
    const messages = document.querySelectorAll(".comment_people ");
    let isAgain = false;

    favoritesButton!.addEventListener("click", function () {
      if (!isAgain) {
        messages.forEach(function (mess) {
          let id = mess.getAttribute("data-index");
          if (mess.querySelector(`[active-favorites${id}="true"]`) === null) {
            (mess as HTMLElement).style = "display: none";
            (favoritesButton! as HTMLElement).style = "color: red";
          }

          let answer = mess.querySelectorAll(".answer");
          answer.forEach(function (ans) {
            let idAnswer = ans.getAttribute("data-index");
            if (mess.querySelector(`[active-favorites${id}="true"]`) === null && ans.querySelector(`[active-favorites${id}-${idAnswer}="true"]`) !== null) {
              const clone = <HTMLElement>ans.cloneNode(true);
              clone.className += " clone_answer";
              clone.style = "border-top: 3px solid #d9d9d9; border-bottom: 3px solid #d9d9d9;";
              mess.before(clone);
            }

            if (ans.querySelector(`[active-favorites${id}-${idAnswer}="true"]`) === null) {
              (ans as HTMLElement).style = "display: none";
            }
          });
          isAgain = true;
        });
      } else {
        document.querySelectorAll(".clone_answer").forEach((ans) => {
          ans.remove();
        });
        messages.forEach(function (mess) {
          let id = mess.getAttribute("data-index");
          (mess as HTMLElement).style = "dislpay: flex";
          (favoritesButton! as HTMLElement).style = "color: black";

          let answer = mess.querySelectorAll(".answer");
          answer.forEach(function (ans) {
            let idAnswer = ans.getAttribute("data-index");
            if (ans.querySelector(`[active-favorites${id}-${idAnswer}="true"]`) === null) {
              (ans as HTMLElement).style = "display: flex";
            }
          });

          isAgain = false;
        });
      }
    });
  }
}

export default SortComments;

class GetStartComments {
  drawStartComments() {
    const allComments = document.querySelector(".allComments");
    for (let i: number = 0; i <= 2; i++) {
      let divCommentPeople = document.createElement("div");
      divCommentPeople.className = "comment_people blockFetch";
      divCommentPeople.setAttribute("data-index", `${2 - i}`);

      if (allComments !== null) {
        allComments.appendChild(divCommentPeople);
      }

      let authorAndMessage = document.createElement("div");
      authorAndMessage.className = "author_and_message";

      divCommentPeople.appendChild(authorAndMessage);

      let avatarAuthor = document.createElement("div");
      avatarAuthor.className = "avatar_author";

      let authorAndText = document.createElement("div");
      authorAndText.className = "author_and_text";

      let commentText = document.createElement("div");
      commentText.className = "comment_text";
      if (localStorage.getItem(`text${i}`) !== null) {
        commentText.innerText = `${localStorage.getItem(`text${i}`)}`;
      } else {
        commentText.innerText = `${i}'Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого "Кольца власти" просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.'`;
        if (commentText.textContent !== null) {
          localStorage.setItem(`text${i}`, commentText.textContent);
        }
      }

      let likeRandom: number;

      if (localStorage.getItem(`newLike${divCommentPeople.getAttribute("data-index")}`) !== null) {
        likeRandom = Number(`${localStorage.getItem(`newLike${divCommentPeople.getAttribute("data-index")}`)}`);
      } else {
        if (localStorage.getItem(`like${divCommentPeople.getAttribute("data-index")}`) !== null) {
          likeRandom = Number(`${localStorage.getItem(`like${divCommentPeople.getAttribute("data-index")}`)}`);
        } else {
          likeRandom = random(0, 10);
          localStorage.setItem(`like${divCommentPeople.getAttribute("data-index")}`, `${likeRandom}`);
        }
      }

      let underText = document.createElement("div");
      underText.className = "under_text";
      underText.innerHTML = `<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;

      authorAndMessage.appendChild(avatarAuthor);
      authorAndMessage.appendChild(authorAndText);
      authorAndMessage.appendChild(commentText);
      authorAndMessage.appendChild(underText);

      let nameAuthor = document.createElement("div");
      nameAuthor.className = "name_author";

      let dateAndTime = document.createElement("div");
      var nowTime = new Date();
      dateAndTime.className = "date_and_time";
      if (localStorage.getItem(`date${i}`) !== null) {
        dateAndTime.innerText = `${localStorage.getItem(`date${i}`)}`;
      } else {
        dateAndTime.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;
        if (dateAndTime.textContent !== null) {
          localStorage.setItem(`date${i}`, dateAndTime.textContent);
        }
      }
      authorAndText.appendChild(nameAuthor);
      authorAndText.appendChild(dateAndTime);

      const newLikeLocalStorage: number = Number(localStorage.getItem(`newLike${divCommentPeople.getAttribute("data-index")}`));
      const likeLocalStorage: number = Number(localStorage.getItem(`like${divCommentPeople.getAttribute("data-index")}`));
      const btnPlus: HTMLButtonElement | null = authorAndMessage.querySelector(".button_plus");
      const btnMinus: HTMLButtonElement | null = authorAndMessage.querySelector(".button_minus");

      if (localStorage.getItem(`newLike${divCommentPeople.getAttribute("data-index")}`) !== null && newLikeLocalStorage <= likeLocalStorage - 1) {
        btnMinus!.setAttribute("disabled", "");
        btnMinus!.style = "color: black; opacity: 0.4;";
      } else {
        btnMinus!.removeAttribute("disabled");
        btnMinus!.removeAttribute("style");
      }
      if (localStorage.getItem(`newLike${divCommentPeople.getAttribute("data-index")}`) !== null && newLikeLocalStorage >= likeLocalStorage + 1) {
        btnPlus!.setAttribute("disabled", "");
        btnPlus!.style = "color: black; opacity: 0.4;";
      } else {
        btnPlus!.removeAttribute("disabled");
        btnPlus!.removeAttribute("style");
      }

      const divNumberLikes: HTMLElement | null = authorAndMessage.querySelector(".number_likes");
      if (divNumberLikes !== null) {
        const numberLikes = Number(divNumberLikes.textContent);
        if (numberLikes < 0) {
          divNumberLikes.style = "color: red";
        } else {
          divNumberLikes.removeAttribute("style");
        }
      }
    }

    function random(min: number, max: number) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    function padTo2Digits(num: number) {
      return num.toString().padStart(2, "0"); // Преобразует 9 в 09, а 10 оставит без изменений
    }
  }

  drawGetApi() {
    const blockFetch = document.querySelectorAll(".blockFetch");
    for (let i = 0; i < blockFetch.length; i++) {
      if (localStorage.getItem(`firstName[${i}]`) !== null && localStorage.getItem(`lastName[${i}]`) !== null && localStorage.getItem(`picture[${i}]`) !== null) {
        let divFirstName = blockFetch[i].querySelector(".name_author");
        let divPhoto = blockFetch[i].querySelector(".avatar_author");
        divFirstName!.innerHTML = `${localStorage.getItem(`firstName[${i}]`)} ${localStorage.getItem(`lastName[${i}]`)}`;
        divPhoto!.innerHTML = `<img src="${localStorage.getItem(`picture[${i}]`)}">`;
      } else {
        fetch("https://randomuser.me/api/")
          .then((res) => res.json())
          .then((data) => {
            let firstName: string = data.results[0].name.first;
            let lastName: string = data.results[0].name.last;
            let picture: string = data.results[0].picture.large;

            localStorage.setItem(`firstName[${i}]`, firstName);
            localStorage.setItem(`lastName[${i}]`, lastName);
            localStorage.setItem(`picture[${i}]`, picture);

            let divFirstName = blockFetch[i].querySelector(".name_author");
            let divPhoto = blockFetch[i].querySelector(".avatar_author");
            divFirstName!.innerHTML = `${firstName} ${lastName}`;
            divPhoto!.innerHTML = `<img src="${picture}">`;
          });
      }
    }
  }
}

export default GetStartComments;

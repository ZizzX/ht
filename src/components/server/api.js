window.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector("#form");
  const $nights = $form.querySelector("#nights");
  const $nightsTo = $form.querySelector("#nights-to");
  const URL = "https://ht.kz/test/searchPartner1";

  const getData = async ({
    departCity,
    country,
    date,
    nights,
    nightsTo,
  } = {}) => {
    const res = await fetch(
      `${URL}?departCity=${departCity}&country=${country}&date=${date}&nights=${nights}&nightsTo=${nightsTo}`
    );

    return await res.json();
  };

  $nights.addEventListener("input", (event) => {
    const target = event.target;
    if (
      $nightsTo.value.length > 0 &&
      $nightsTo.value !== undefined &&
      +$nightsTo.value <= +target.value
    ) {
      target.value = "";
      target.setAttribute("placeholder", "Больше чем до");
      target.classList.add("error");
    }
    target.classList.remove("error");
    target.setAttribute("placeholder", "");
  });

  $nightsTo.addEventListener("change", (event) => {
    const target = event.target;
    if (
      $nights.value.length > 0 &&
      $nights.value !== undefined &&
      +$nights.value >= +target.value
    ) {
      target.value = "";
      target.setAttribute("placeholder", "Меньше чем от");
      target.classList.add("error");
    } else if ($nights.value < target.value) {
      target.classList.remove("error");
      target.setAttribute("placeholder", "");
    }
  });

  /* FORM GET */
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { departCity, country, date, nights, nightsTo } = formData;

    getData({ departCity, country, date, nights, nightsTo }).then((data) => {
      const tours = data.tours;
      const sort = tours.sort(compare);
      console.log(sort)
    });
  });


  function compare(a, b) {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
    return 0;
  }

  // function inputError(e, message) {
  //   const target = e.target;
  //   target.value = "";
  //   target.setAttribute("placeholder", message);
  //   target.classList.add("error");
  // }

  // function removeErrorClass(e) {
  //   const target = e.target;
  //   target.classList.remove("error");
  //   target.setAttribute("placeholder", "");
  // }
});

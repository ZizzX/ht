window.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector("#form");
  const $nights = $form.querySelector("#nights");
  const $nightsTo = $form.querySelector("#nights-to");
  const $departCity = $form.querySelector("#depart-city");
  const $country = $form.querySelector("#country");
  const $tourTableBody = document.querySelector("#tourTableBody");
  const $tourTableHead = document.querySelector(".tour-table thead");
  const $tourTitle = document.querySelector(".tours__title");
  const maxDate = changeDatePickerRange(90);
  const minDate = changeDatePickerRange(1);

  const URL = "https://ht.kz/test/searchPartner1";

  function inputAddError(target, message) {
    target.value = "";
    target.setAttribute("placeholder", message);
    target.classList.add("error");
  }

  function removeErrorClass(elem) {
    elem.classList.remove("error");
    elem.setAttribute("placeholder", "от 5 до 15");
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setMaxDate(selector, date) {
    document.getElementById(selector).setAttribute("max", date);
  }
  function setMinDate(selector, date) {
    document.getElementById(selector).setAttribute("min", date);
  }

  function getMillisecunds(days) {
    const mil = 1000 * 60 * 60 * 24 * days;
    return mil;
  }

  function compareFn(a, b) {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
    return 0;
  }

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

  //  funtions nights input change

  $nights.addEventListener("input", (event) => {
    const target = event.target;
    if ($nightsTo.value.length > 0 && +$nightsTo.value <= +target.value) {
      inputAddError(target, "Больше чем до");
    } else if ($nightsTo.value > target.value) {
      removeErrorClass(target);
    }
  });

  $nightsTo.addEventListener("change", (event) => {
    const target = event.target;
    if ($nights.value.length > 0 && +$nights.value >= +target.value) {
      inputAddError(target, "Меньше чем от");
    } else if (target.value > $nights.value) {
      removeErrorClass(target);
    }
  });

  /* ============= functions date picker =============== */

  function changeDatePickerRange(days) {
    const millesec = getMillisecunds(days);
    const date = getDate(millesec);
    return date;
  }

  function getDate(millisec) {
    const t = Date.now() + millisec,
      days = new Date(t).getDate(),
      month = new Date(t).getMonth() + 1,
      year = new Date(t).getFullYear();

    const date = `${year}-${getZero(month)}-${getZero(days)}`;

    return date;
  }

  setMaxDate("date-input", maxDate);
  setMinDate("date-input", minDate);

  // function createNode(element, className, message) {
  //   const div = document.createElement(element);
  //   div.classList.add(className);
  //   div.textContent = message;
  //   return div;
  // }

  // function append(parent, el) {
  //   return parent.append(el);
  // }

  /* FORM GET */
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { departCity, country, date, nights, nightsTo } = formData;

    getData({ departCity, country, date, nights, nightsTo })
      .then((data) => {
        const tours = data.tours;
        const sort = tours.sort(compareFn);

        let selectedCity =
          $departCity[$departCity.options.selectedIndex].innerText;
        let selectedCountry =
          $country[$country.options.selectedIndex].innerText;
        let localDate = new Date(date)
          .toLocaleDateString("lookup", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .replace(/г.$/g, "")
          .trim();

        $tourTitle.innerHTML = `
      <h2>
        Результаты запроса (${selectedCity} -
        ${selectedCountry},
        ${localDate},
        ${nights}-${nightsTo}н.):
      </h2>
      `;

        $tourTableHead.innerHTML = `
        <tr>
          <th>Hotel name</th>
          <th>price</th>
          <th>currency</th>
        </tr>
      `;

        sort.forEach((tour) => {
          $tourTableBody.innerHTML += `
        <tr>
          <td>${tour.hotelName}</td>
          <td>${tour.price}</td>
          <td>${tour.currency}</td>
        </tr>
        `;

          document.querySelector("#tours").classList.add("tours");
        });
      })
      .catch((err) => {
        throw new Error(`${err.name} ${err.message}`);
      })
      .finally(() => {
        e.target.reset();
        removeErrorClass($nights);
        removeErrorClass($nightsTo);
      });
  });

  $departCity.addEventListener("change", (e) => {
    const target = e.target;
    if (target && $departCity.value === "10") {
      $country.innerHTML = `
      <option value="" disabled selected hidden>Страна</option>
      <option value="552">Турция</option>
      <option value="553">Тайланд</option>`;
    } else if (target && $departCity.value === "11") {
      $country.innerHTML = `
      <option value="" disabled selected hidden>Страна</option>
      <option value="552">Турция</option>
      <option value="554">Чехия</option>`;
    } else {
      $country.innerHTML = `
      <option value="" disabled selected hidden>Страна</option>
      <option>Страна</option>
      `;
    }
  });
});

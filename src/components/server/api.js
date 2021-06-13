window.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector("#form");
  const $nightsInput = document.querySelector("#nights"),
    $nightsToInput = document.querySelector("#nights-to"),
    $formNightTo = document.querySelector("#form-nights-to"),
    $formNight = document.querySelector("#form-nights");

  $nightsToInput.addEventListener("change", (e) => {
    if (+$nights.value >= +e.target.value && +$nights.value) {
      $nightsInput.value = "";
      append($formNightTo, createNode("div", "error", "Error"));
    }
  });

  $nightsInput.addEventListener("change", (e) => {
    if (+$nightsToInput.value <= +e.target.value && +$nightsToInput.value) {
      $nightsToInput.value = "";
      append($formNight, createNode("div", "error", "Error"));
    }
  });

  const URL = "https://ht.kz/test/searchPartner1";
  const data = {
    departCity: 10,
    country: 552,
    date: 2021 - 06 - 20,
    nights: 5,
    nightsTo: 15,
  };

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData($form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log(json);
    postData(URL, json)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw new Error("Error: " + err.message + ", error name: " + err.name);
      })
      .finally(() => {
        $form.reset();
      });
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    return await res.json();
  };
});

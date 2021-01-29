document.forms.formName.addEventListener("submit", async (event) => {
  event.preventDefault();

  const recipeValue = document.getElementById("recipe").value;
  const recipe = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeValue}`
  );

  const result = await recipe.json();

  // получаю главный объект meals (объект с массивами)
  let mainObj = result;

  // получаю массив с объектами, которые подходят под мой запрос
  let mealsObj = mainObj.meals;

  let divForName = document.querySelector("#divForName");
  divForName.innerHTML = "";
  // перебираю объекты внутри массива
  let arrsInObj = mealsObj.map((object) => {
    const div = document.createElement("div");
    (divForName.innerHTML += `<h3>${object.strMeal}</h3><br>`),
    (divForName.innerHTML += `<a href="${object.strSource}"><img src="${object.strMealThumb}"></a><br><br>`);

    for (let i = 1; i < 20; i++) {
      if (object["strIngredient" + i] != "" && object["strIngredient" + i] != null) {
        divForName.innerHTML += `<p>${object["strIngredient" + i]}: ${object["strMeasure" + i]}</p>`;
      }
    }

    (divForName.innerHTML += `<br><h4>Instruction: </h4><p>${object.strInstructions}</p><br>`),
    (divForName.innerHTML += `<br><p>Category: ${object.strCategory}</p><br>`),
    (divForName.innerHTML += `YouTube link: <a href=${object.strYoutube}>Watch a video about this dish </a><div class="place"></div><br><hr><div class="space"></div>`);
  });
});

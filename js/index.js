document.addEventListener("DOMContentLoaded", function() {
  const monsterContainer = document.getElementById("monster-container")
  let currentPage = 1

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
  .then(res => res.json())
  .then(slapAllMonstersDOM)

  function slapAllMonstersDOM(monstersData) {
    monstersData.forEach(slapMonsterDOM)
  }

  function slapMonsterDOM(monster) {
    // console.log(monster)
    const monsterDiv = document.createElement("div")
    monsterDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
    `
    monsterContainer.append(monsterDiv)
  }

  const newMonsterForm = document.getElementById("create-monster")
  newMonsterForm.innerHTML = `
  <form>
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create Monster</button>
  </form>
  `
  // console.log(newMonsterForm)
  newMonsterForm.addEventListener("submit", function() {
    event.preventDefault()
    const nameInput = document.getElementById("name").value
    const ageInput = document.getElementById("age").value
    const descInput = document.getElementById("description").value

    if (nameInput != "" && ageInput != "" && descInput != "") {
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameInput,
          age: ageInput,
          description: descInput
        })
      }).then(res => res.json())
        .then(slapMonsterDOM)
    } else {
      console.log("Please fill in all the fields")
    }
  })

  const nextBtn = document.getElementById("forward")
  nextBtn.addEventListener("click", function() {
    // console.log("next button has been clicked")
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage += 1}`)
    .then(res => res.json())
    .then(slapAllMonstersDOM)
  })

  const prevBtn = document.getElementById("back")
  prevBtn.addEventListener("click", function() {
    if (currentPage != 1) {
      monsterContainer.innerHTML = ""
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage -= 1}`)
      .then(res => res.json())
      .then(slapAllMonstersDOM)
    } else {
      console.log("You are at page 1. You cannot go back further.")
    }
  })
})

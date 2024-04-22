console.log("Project")

const textApi = document.getElementById("api-text")
const form = document.getElementById("form")

let postsArr = [] //creating array for items from api

//Getting first 5 object from api
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then(response => response.json())
  .then(data => {
    postsArr = data.slice(0, 5) //pushing first 5 objects into array
    render()
  })

//rendering object from api
const render = () => {
  const postMap = postsArr
    .map(object => {
      return `
         <div class="api-inner-div">
             <h2>${object.title}</h2>
             <p>${object.body}</p>
         </div>
    `
    })
    .join("")
  textApi.innerHTML = postMap
}

form.addEventListener("submit", function (e) {
  e.preventDefault()
  const infoFromForm = new FormData(form) //data from form in object
  const titleForm = infoFromForm.get("title")
  const bodyForm = infoFromForm.get("post")

  const objectDataForm = {
    title: titleForm,
    body: bodyForm,
  }
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(objectDataForm),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(data => {
      postsArr.unshift(data) //add object on top array
      render()
    })

  form.reset() //reseting form with reset method
})

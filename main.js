console.log("Project")

const textApi = document.getElementById("api-text")
const form = document.getElementById("form")

//Getting first 5 object from api
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then(response => response.json())
  .then(data => {
    const postData = data.slice(0, 5)
    render(postData)
  })

//rendering object from api
const render = item => {
  const postMap = item
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
      textApi.innerHTML = `
          <div class="api-inner-div">
            <h2>${data.title}</h2>
            <p>${data.body}</p>
          </div>
           ${textApi.innerHTML}
    ` //when operation is not over it remember older content of variable
    })

  document.getElementById("titleId").value = ""
  document.getElementById("post-text-area").value = ""
})

const DATA_URL = "json/data.json"; 
const container = document.getElementById("container");
const courseElement = document.getElementById("course");
const teacherElement = document.getElementById("teacher");

let getJSONData = function(url){
  let result = {};
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
    result.status = 'ok';
    result.data = response;
    return result;
  })
  .catch(function(error) {
    result.status = 'error';
    result.data = error;
    return result;
  });
}

function mostrarEstudiantes(data) {
  // Mostrar los datos del curso y del profesor
  courseElement.textContent = data.course;
  teacherElement.textContent = data.teacherName;

  // Mostrar los estudiantes
  data.students.forEach(student => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${student.name} ${student.lastname}</h5>
            <p class="card-text">Edad: ${student.age}</p>
          </div>
        </div>
      </div>
    `;
  });
}

getJSONData(DATA_URL).then(function(result) {
  if (result.status === 'ok') {
    mostrarEstudiantes(result.data);
  } else {
    console.error("Error al obtener los datos");
  }
});



const DATA_URL = "json/data.json"; // URL que contiene los datos que queremos mostrar

const container = document.getElementById("container"); // "Traemos" utilizando el DOM el div de id "container" para colocar la información en él

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

function mostrarEmpleados(arreglo) {
    arreglo.forEach((students) => {
        container.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">El nombre es: ${students.name} ${students.lastname}</h2>
                <p class="card-text">Su edad es: ${students.age}</p>
            </div>
        </div>
        `;
        
        console.log(`El nombre es: ${students.name} ${students.lastname}`);
        console.log(`Su edad es: ${students.age}`); 
    });
}

getJSONData(DATA_URL).then(function(result) {
    if (result.status === 'ok') {
        mostrarEmpleados(result.data.students);
    } else {
        console.error("Error al obtener los datos");
    }
});


const resp = fetch('https://reqres.in/api/users?page=1');
resp.then(response => response.json())
.then((json)=>{
    let content = document.getElementById('container');
    let htmlx = '';
    json.data.forEach(element => {
        console.log(element);
        let card = `
      <a
        href="#"
        class="group flex flex-col justify-between rounded-sm bg-white p-4 shadow-xl transition-shadow hover:shadow-lg sm:p-6 lg:p-8"
      >
        <div>
          <h1 class="text-xl font-bold text-indigo-600 sm:text-5xl">${element.id}</h1>
          <div class="mt-4 border-t-2 border-gray-100 pt-4">
          <p class="text-sm font-medium uppercase text-gray-500">${element.first_name}</p>
            <p class="text-sm font-medium uppercase text-gray-500">${element.last_name}</p>
            <p class="text-sm font-medium uppercase text-gray-500">${element.email}</p>
          </div>
        </div>
        <div
          class="inline-flex gap-2 "
        >
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
        onClick="searchUser(${element.id})">
        Detalles
        </button>
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button"
        onclick='delUsers(${element.id})'>
        Eliminar
        </button>
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800" type="button"
        onClick="">
        Actualizar
        </button>
        </div>
      </a> 
      `;
      htmlx = htmlx+card;
    });
    content.innerHTML= htmlx;
});

const searchUser = id => {
  const modal = new bootstrap.Modal('#modal', {});
  fetch(`https://reqres.in/api/users/${id}`).then(res => res.json()).then(({data}) => {
      document.getElementById('modal-body').innerHTML = `<img class='mx-auto'src='${data.avatar}' alt='...'>
          <div class='mt-3 text-center'>
          <h5>${data.first_name} ${data.last_name}</h5>
          <p>${data.email}</p>
          </div>`;
  });
  modal.show();
}

const delUsers = (idUser) => {
  fetch('https://reqres.in/api/users/' + idUser, {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json",
      }
  })
      .then(res => {
          if (res.status == 204) {
              Swal.fire({
                  title: 'Usuario eliminado',
                  icon: 'success',
                  showDenyButton: false,
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 1500
              })
          } else {
              Swal.fire({
                  title: 'Error al eliminar',
                  icon: 'error',
                  showDenyButton: false,
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 1500
              })
          }

      })
}

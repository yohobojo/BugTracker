window.onload = getData;
$('#adminBtn').click(function (e) {
  e.preventDefault();
  window.location = 'adminHome.html';
});
$('#userBtn').click(function (e) {
  e.preventDefault();
  window.location = 'userHome.html';
});

async function getData() {
  const bugTable = document.getElementById('bugTable');
  const url = 'http://localhost:5500/';
  const response = await fetch(url, { method: 'GET', mode: 'cors' })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  for (let i = 0; i < response.length; i++) {
    const data = response[i];
    bugTable.innerHTML +=
      '<tr data-bs-toggle="collapse" data-bs-target="#row1" aria-expanded="false" aria-controls="collapseExample"><td>' +
      data.id +
      '</td><td>' +
      data.name +
      '</td><td>' +
      data.description +
      '</td></tr><tr><td class="collapse text-center align-middle" id="row1" colspan="1"><button type="button" class="btn btn-primary" id="testBtn">Done</button></td><td class="collapse" id="row1" colspan="2"><div class="card card-body"><p>Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.</p></div></td></tr>';
  }
}

// const testBtn = document.getElementById('testBtn');
// testBtn.addEventListener('click', async (e) => {
//   console.log('button clicked');
//   const url = 'http://localhost:5500/';
//   const response = await fetch(url, { method: 'GET', mode: 'cors' }).then(
//     (data) => data.json()
//   );
//   console.log(response);
// });

// window.onload = getData;

$('#adminBtn').click(function (e) {
  e.preventDefault();
  window.location = 'adminHome.html';
});
$('#userBtn').click(function (e) {
  e.preventDefault();
  window.location = 'userHome.html';
});
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    loginData = { name: username, password: password };
    const url = 'http://localhost:5500/users';
    const response = await fetch(url, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      });
    console.log(response);
    var checkName = false;
    for (let i = 0; i < response.length; i++) {
      const data = response[i];
      if (data.name === username) {
        checkName = true;
      }
    }
    if (checkName == false) {
      createNewUser();
    } else {
      loginUser();
    }
  });

  async function loginUser() {
    const url = 'http://localhost:5500/users/login';
    const response = await fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.text())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    console.log(response);
    if (response === 'admin') {
      window.location = 'adminHome.html';
    } else if (response === 'user') {
      window.location = 'userHome.html';
    }
  }

  async function createNewUser() {
    console.log(loginData);
    console.log(JSON.stringify(loginData));
    const url = 'http://localhost:5500/newUser';
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
}

async function getData() {
  console.log('hello world');
  const bugTable = document.getElementById('bugTable');
  const url = 'http://localhost:5500/bugs';
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

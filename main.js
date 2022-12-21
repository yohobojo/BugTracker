// window.onload = getData;

$('#adminBtn').click(function (e) {
  e.preventDefault();
  window.location = 'adminHome.html';
});
$('#userBtn').click(function (e) {
  e.preventDefault();
  window.location = 'userHome.html';
});

var DBBugs;

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

async function getUserData() {
  console.log('hello world');
  const bugTable = document.getElementById('bugTable');
  const url = 'http://localhost:5500/bugs';
  const response = await fetch(url, { method: 'GET', mode: 'cors' })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  DBBugs = response;
  for (let i = 0; i < response.length; i++) {
    const data = response[i];
    bugTable.innerHTML +=
      '<tr data-bs-toggle="collapse" data-bs-target="#row' +
      data.id +
      '" aria-expanded="false" aria-controls="collapseExample"><td>' +
      data.id +
      '</td><td>' +
      data.name +
      '</td><td>' +
      data.description +
      '</td></tr><tr><td class="collapse text-center align-middle" id="row' +
      data.id +
      '" colspan="1"><button type="button" class="btn btn-primary" id="testBtn">Fixed</button></td><td class="collapse" id="row' +
      data.id +
      '" colspan="2"><div class="card card-body"><p>' +
      data.description_ext +
      '</p></div></td></tr>';
  }
}
async function getAdminData() {
  console.log('hello world');
  const newBugTable = document.getElementById('newBugTable');
  const doneBugTable = document.getElementById('doneBugTable');
  const newUrl = 'http://localhost:5500/newBugs';
  const doneUrl = 'http://localhost:5500/doneBugs';
  const newResponse = await fetch(newUrl, { method: 'GET', mode: 'cors' })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  for (let i = 0; i < newResponse.length; i++) {
    const data = newResponse[i];
    newBugTable.innerHTML +=
      '<tr data-bs-toggle="collapse" data-bs-target="#row' +
      data.id +
      '" aria-expanded="false" aria-controls="collapseExample"><td>' +
      data.id +
      '</td><td>' +
      data.name +
      '</td><td>' +
      data.description +
      '</td></tr><tr><td class="collapse text-center align-middle" id="row' +
      data.id +
      '" colspan="1"><button type="button" class="btn btn-primary" id="approveBtn">Approve</button><button type="button" class="btn btn-primary" id="disapproveBtn">Disapprove</button></td><td class="collapse" id="row' +
      data.id +
      '" colspan="2"><div class="card card-body"><p>' +
      data.description_ext +
      '</p></div></td></tr>';
  }
  const doneResponse = await fetch(doneUrl, { method: 'GET', mode: 'cors' })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  for (let i = 0; i < doneResponse.length; i++) {
    const data = doneResponse[i];
    doneBugTable.innerHTML +=
      '<tr data-bs-toggle="collapse" data-bs-target="#row' +
      data.id +
      '" aria-expanded="false" aria-controls="collapseExample"><td>' +
      data.id +
      '</td><td>' +
      data.name +
      '</td><td>' +
      data.description +
      '</td></tr><tr><td class="collapse text-center align-middle" id="row' +
      data.id +
      '" colspan="1"><button type="button" class="btn btn-primary" id="testBtn">Fixed</button></td><td class="collapse" id="row' +
      data.id +
      '" colspan="2"><div class="card card-body"><p>' +
      data.description_ext +
      '</p></div></td></tr>';
  }
  const approveBtn = document.getElementById('approveBtn');
  approveBtn.addEventListener('click', async (e) => {
    var bugID = parseInt(
      e.target.offsetParent.offsetParent.childNodes[3].children[0].children[0]
        .innerHTML
    );
    console.log(bugID);
    var bug = {
      id: bugID,
      approved: 'true',
    };
    const url = 'http://localhost:5500/approveBug';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bug),
    });
    window.location.reload();
  });
}
document.getElementById('newBugForm').addEventListener('submit', async (e) => {
  var newBugID = DBBugs.length + 1;
  var newBugName = e.target[0].value;
  var newBugDescription = e.target[1].value;
  var newBugDescriptionExt = e.target[2].value;
  var newBugDone = 'false';
  var newBugApproved = 'false';

  var bug = {
    id: newBugID,
    name: newBugName,
    description: newBugDescription,
    descriptionExt: newBugDescriptionExt,
    done: newBugDone,
    approved: newBugApproved,
  };

  const url = 'http://localhost:5500/newBug';
  const response = await fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bug),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  window.location.reload();
});

// const username = e.target[0].value;
// const password = e.target[1].value;
// loginData = { name: username, password: password };
// const testBtn = document.getElementById('testBtn');
// testBtn.addEventListener('click', async (e) => {
//   console.log('button clicked');
//   const url = 'http://localhost:5500/';
//   const response = await fetch(url, { method: 'GET', mode: 'cors' }).then(
//     (data) => data.json()
//   );
//   console.log(response);
// });

$('#adminBtn').click(function (e) {
  e.preventDefault();
  window.location = 'adminHome.html';
});
$('#userBtn').click(function (e) {
  e.preventDefault();
  window.location = 'userHome.html';
});

const testBtn = document.getElementById('testBtn');
testBtn.addEventListener('click', (e) => {
  console.log('button clicked');
  const url = 'http://localhost:3306/bugs';
  const response = fetch(url);
  return response.json();
});

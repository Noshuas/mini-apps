var button = document.getElementById('submit');
var submitText = function(e) {
  e.preventDefault();
  var file = document.getElementById('input').files[0];
  // var data = new FormData(form);

  fetch('./', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: file,
  })
  .then(response=> {
    console.log(response);
    return response.blob();
  })
  .then(blob=>{
    return blob.text();
  })
  .then(result=>console.log(result));
}
button.addEventListener('click', submitText)
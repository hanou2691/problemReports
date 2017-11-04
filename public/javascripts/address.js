 
function findAddress(){
  var input = document.getElementById('addressInput');
  var options = { types: ['(cities)'],componentRestrictions: {country: 'ca' }};
  var autocomplete = new google.maps.places.Autocomplete(input, options); 
}; 
$(function(){
  $('#date').datepicker(); 
  $('#report').click(function(){
    window.location.href = '/reportProblem' 
  });
  $('#check').click(function(){
    window.location.href = '/reports' 
  });
})

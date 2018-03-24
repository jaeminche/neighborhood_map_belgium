// This event listener handles #searchForm
// so that it always keeps the dropdown-menu open as the user is on the search form.

$('#searchForm').click(function(e){
  // Kills click event:
  e.stopPropagation();
  // Toggles dropdown if not already visible:
  if ($('.dropdown').find('.dropdown-menu').is(":hidden")){
    $('#dropdownMenuButton').dropdown('toggle');
    $('#searchForm').focus();
  }
});

// Displays the dropdown menu with all locations by default.
$('#dropdownMenuButton').trigger('click');
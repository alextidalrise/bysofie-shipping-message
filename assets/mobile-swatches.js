$('.swatch-options').clone().attr("style", "display:none").addClass('is-visible--mobile').appendTo("#swatch-mobile-only");

$('#swatch-mobile-only .swatch-element').click(function() {
  var inputId = $(this).prev()[0].id;
  var trueInput = $('#product-form').find('input[id="' + inputId + '"]');
  trueInput.click();
});
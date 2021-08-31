function getQueryStringParameters() {
    var parameters = {}, hash;
    var q = document.URL.split('?')[1];
    if(q != undefined) {
        q = q.split('&');
        for(var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            parameters[hash[0]] = hash[1];
        }
    }
    return parameters;
}

var twoInOne = null;
var threeInOne = null;
var variant = null;

function updateRecommender() {
    if (twoInOne && threeInOne) {
        if (window.location.href.indexOf("3-in-1") > -1) {
          if (variant == null) { // all variants are OOS
          	var redirectVariant = twoInOne.variants.find(v => v.available); // First available one
            // Set image thumbnail
            $('.product-image').find('img')[0].src = redirectVariant.featured_image.src;
            $('#recommended-link').attr("href", '/products/little-hoppa-®-2-in-1?variant=' + redirectVariant.id);
          } else {
            var thisVariant = threeInOne.variants.find(v => v.id == variant.id).title;
            var redirectVariant = twoInOne.variants.find(v => v.title == thisVariant);
            // Set image thumbnail
            $('.product-image').find('img')[0].src = redirectVariant.featured_image.src;
            $('#recommended-link').attr("href", '/products/little-hoppa-®-2-in-1?variant=' + redirectVariant.id);
          }
        } else if (window.location.href.indexOf("2-in-1") > -1) {
          if (variant == null) { // all variants are OOS
          	var redirectVariant = threeInOne.variants.find(v => v.available); // First available one
            // Set image thumbnail
            $('.product-image').find('img')[0].src = redirectVariant.featured_image.src;
            $('#recommended-link').attr("href", '/products/little-hoppa-3-in-1?variant=' + redirectVariant.id);
          } else {
            var thisVariant = twoInOne.variants.find(v => v.id == variant.id).title;
            var redirectVariant = threeInOne.variants.find(v => v.title == thisVariant);
            // Set image thumbnail
            $('.product-image').find('img')[0].src = redirectVariant.featured_image.src;
            $('#recommended-link').attr("href", '/products/little-hoppa-3-in-1?variant=' + redirectVariant.id);
          }
       }
    } else return;
};

window.addEventListener('DOMContentLoaded', (event) => {
    jQuery.getJSON('/products/little-hoppa-®-2-in-1.js', function(product) {
        twoInOne = product;
        if (window.location.href.indexOf("2-in-1") > -1) {
            variant = product.variants.find(v => v.available);
        }
        updateRecommender();
    });
    jQuery.getJSON('/products/little-hoppa-3-in-1.js', function(product) {
        threeInOne = product;
        if (window.location.href.indexOf("3-in-1") > -1) {
            variant = product.variants.find(v => v.available);
        }
        updateRecommender();
    });
});
$(".fa-facebook-f").on("click", function() {
    window.open("https://www.facebook.com/");
});
$(".fa-twitter").on("click", function() {
    window.open("https://twitter.com/");
});
$(".fa-linkedin-f").on("click", function() {
    window.open("https://www.linkedin.com/");
});
let reviewarray = ['"Awesome site for training as well as learning with a lots of projects for practical knowledge" - Akash', '"A consulting agency which is all that you want" - Shubhashish', '"Just one word for it, Extraordinary" - Karan', '"What a change of life I had after the counselling, I just think I have become a different person" - Prachi', '"I think everyone should try this" - Shubh', '"Can\'t think of someone better in this particular line" - Ruchi'];
let i=0;
$(".slidetext").text(reviewarray[i]);
setInterval(function() {
    if(i===reviewarray.length-1)
        i=0;
    else
        i++;
    $('.slidetext').fadeOut(500, function() {
        $(this).text(reviewarray[i]).fadeIn(500);
        
    });
}, 5000);

$('.file').on('change', function () {
    var reader = new FileReader(),
        imageSelector = $(this).data('image-selector');

    if (this.files && this.files[0]) {
        reader.onload = function (e) {
            imageIsLoaded(e, imageSelector);
        };
        reader.readAsDataURL(this.files[0]);
    }
});

function imageIsLoaded(e, imageSelector) {
    $(imageSelector).attr('src', e.target.result);
    merge();
}

function merge() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        imageObj1 = new Image(),
        imageObj2 = new Image();

    imageObj1.src = $('.image').attr('src');
    imageObj1.onload = function () {
        ctx.canvas.width = 540;
        ctx.canvas.height = 540;
        ctx.globalAlpha = 1;
        ctx.drawImage(imageObj1, 0, 0, 540, 540);
        imageObj2.src = $('.avatar').attr('src');
        imageObj2.onload = function () {
            ctx.globalAlpha = 1;
            ctx.drawImage(imageObj2, 0, 0, 540, 540);
            var img = canvas.toDataURL('image/jpeg');
            $('.merged-image').attr('src', img).removeClass('hidden');
            $('a').attr('href', img).removeClass('hidden');
        };
    };
}

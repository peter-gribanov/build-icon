$(function () {
    var parameters = $('.parameter');
    var template = $('#template').text();
    var markdown = $('#markdown');
    var preview = $('#preview');
    var collection = {};

    parameters.on('keyup', function () {
        var data = {};

        $.each(collection, function(param, el) {
            if (param == 'github' && !collection[param].val()) {
                data[param] = collection.composer.val();
            } else {
                data[param] = collection[param].val();
            }
        });

        var result = Mustache.render(template, data);
        markdown.val(result);
        preview.html(window.markdownit().render(result));

    }).each(function () {
        collection[this.id] = $(this);
    });
});

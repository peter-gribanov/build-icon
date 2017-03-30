$(function () {
    var parameters = $('.parameter');
    var template = $('#template').text();
    var markdown = $('#markdown');
    var preview = $('#preview');
    var collection = {};

    parameters.on('keyup', function () {
        render();
    }).each(function () {
        collection[this.id] = $(this).val(Cookies.get(this.id));
    });


    render();

    function render() {
        var data = {};

        $.each(collection, function(param) {
            if (param == 'github' && !collection[param].val()) {
                data[param] = collection.composer.val();
            } else {
                data[param] = collection[param].val();
            }

            Cookies.set(param, collection[param].val());
        });

        var result = Mustache.render(template, data);
        markdown.val(result);
        preview.html(window.markdownit().render(result));
    }
});

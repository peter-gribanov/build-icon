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
            data[param] = collection[param].val();

            switch (param) {
                case 'github':
                    if (!data[param]) {
                        data[param] = collection.composer.val();
                    }
                    break;
                case 'maxAge':
                    if (!data[param]) {
                        data[param] = 3600;
                    } else {
                        data[param] = parseInt(data[param]);
                    }
                    break;
            }

            Cookies.set(param, collection[param].val());
        });

        var result = Mustache.render(template, data);
        markdown.val(result);
        preview.html(window.markdownit().render(result));
    }
});

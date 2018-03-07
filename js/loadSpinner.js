
const loadSpinner = () => {
    const $loadSpinner = $(".loader");

    window.addEventListener("load", function (e) {
        $loadSpinner.css({
            'display': 'none'
        });
    });

}
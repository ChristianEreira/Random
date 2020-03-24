// Simple random number generator
// Christian Ereira - https://chrise.dev
// Full source - https://github.com/ChristianEreira/Random

function generate() {
    let number = document.getElementById("number");

    // If first time generating, textboxes are animated to 'shrink'
    if (number.classList.contains("noDisplay")) {
        let bigMin = document.getElementById("bigMin");
        let bigMax = document.getElementById("bigMax");
        let smallMin = document.getElementById("smallMin");
        let smallMax = document.getElementById("smallMax");
        // Make the boxes smaller
        bigMin.classList.add("small");
        bigMax.classList.add("small");

        // Animate min
        document.getElementById("sMinBox").value = document.getElementById("bMinBox").value;
        var minAnimate = document.getElementById("bigMin").animate([
            { transform: 'translate(0px, 0px)' },
            { transform: 'translate(' + (smallMin.offsetLeft - bigMin.offsetLeft - ((bigMin.clientWidth / 2) - (smallMin.clientWidth / 2))) + 'px, ' + (smallMin.offsetTop - bigMin.offsetTop + (-1 * ((bigMin.clientHeight / 2) - (smallMin.clientHeight / 2)))) + 'px)' }
        ], {
            duration: 200,
            iterations: 1,
            easing: "ease"
        });
        minAnimate.onfinish = function () {
            smallMin.classList.remove("hidden");
            bigMin.classList.add("noDisplay");
            number.classList.remove("noDisplay");
            // Generate random number after animation finished
            animateNumber(number);
        };

        // Animate max
        document.getElementById("sMaxBox").value = document.getElementById("bMaxBox").value;
        var maxAnimate = document.getElementById("bigMax").animate([
            { transform: 'translate(0px, 0px)' },
            { transform: 'translate(' + (smallMax.offsetLeft - bigMax.offsetLeft - ((bigMax.clientWidth / 2) - (smallMax.clientWidth / 2))) + 'px, ' + (smallMax.offsetTop - bigMax.offsetTop + (-1 * ((bigMax.clientHeight / 2) - (smallMax.clientHeight / 2)))) + 'px)' }
        ], {
            duration: 200,
            iterations: 1,
            easing: "ease"
        });
        maxAnimate.onfinish = function () {
            smallMax.classList.remove("hidden");
            bigMax.classList.add("noDisplay");
            number.classList.remove("noDisplay");
        };
    } else {
        animateNumber(number);
    }
}

function animateNumber(number) {
    number.classList.remove("largeNumber");
    let from = parseInt(document.getElementById("sMinBox").value);
    let to = parseInt(document.getElementById("sMaxBox").value);

    // Vallidation
    if (isNaN(from)) {
        from = 0;
    }
    if (isNaN(to)) {
        to = 0;
    }
    if (from > to) {
        let temp = from;
        from = to;
        to = temp;
    }
    document.getElementById("sMinBox").value = from;
    document.getElementById("sMaxBox").value = to;

    // Start timer for random number animation
    let t = 0;
    let timer = setInterval(displayNumber, 60);

    function displayNumber() {
        // Animate/show 10 random numbers then display the chosen number in a larger font
        if (t == 10) {
            clearInterval(timer);
            number.classList.add("largeNumber");
        } else {
            number.classList.remove("hidden");
            number.innerHTML = Math.floor((Math.random() * ((to - from) + 1)) + from);
        }
        t++;
    }
}
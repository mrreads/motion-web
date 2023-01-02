let time = 60 * 30 - 1;

setInterval(() => {
    let element = document.querySelector('.timer');
    let duration = time;
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    element.textContent = minutes + ":" + seconds;

    if (--time < 0)
        time = duration;
}, 1000);
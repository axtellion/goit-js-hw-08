import _ from 'lodash'

const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

let videoTime = {
        
};

function receivingTime() {
    player.on('timeupdate', function (event) {
        videoTime = event.seconds;
        localStorage.setItem("videoplayer-current-time", videoTime);
    });
};


addEventListener("DOMContentLoaded", _.throttle(receivingTime, 1000));

console.log(localStorage.getItem("videoplayer-current-time"));

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
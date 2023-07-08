
import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new VimeoPlayer(iframe);

const savedTime = localStorage.getItem('videoplayer-current-time');

const saveTimeThrottled = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

if (savedTime !== null) {
  player.setCurrentTime(savedTime)
    .then(function () {

      player.play();
    })
    .catch(function (error) {
      console.error('Помилка при встановленні часу відтворення:', error);
    });
}

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeThrottled(currentTime);
});

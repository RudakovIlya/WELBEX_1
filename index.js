const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const createTimerAnimator = () => {
  let remainingTime;
  let intervalId;

  const animateTimer = (seconds) => {
    remainingTime = seconds;

    intervalId = setInterval(() => {
      remainingTime--;
      if (remainingTime < 0) {
        clearInterval(intervalId);
        remainingTime = 0;
      }
      timerEl.textContent = formatTime(remainingTime);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  return {animateTimer, stopTimer};
};

const {animateTimer, stopTimer} = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, '');
});

buttonEl.addEventListener('click', () => {
  stopTimer();
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
const songs = [
  {
    name: 'Duniya',
    path: '/songs/1.mp3',
    cover: './images/covers/1.jpg'
  },
  {
    name: 'Aaj din chadeya',
    path: '/songs/2.mp3',
    cover: './images/covers/2.jpg'
  },
  {
    name: 'Feeling',
    path: '/songs/3.mp3',
    cover: './images/covers/3.jpg'
  },
  {
    name: 'Humnava',
    path: '/songs/4.mp3',
    cover: './images/covers/4.jpg'
  },
  {
    name: 'O More Saiyaan',
    path: '/songs/5.mp3',
    cover: './images/covers/5.jpg'
  },
  {
    name: 'Tune jo na kaha',
    path: '/songs/6.mp3',
    cover: './images/covers/6.jpg'
  },
  {
    name: 'Dil ke pass',
    path: '/songs/7.mp3',
    cover: './images/covers/7.jpg'
  },
  {
    name: 'Chup chup ke',
    path: '/songs/8.mp3',
    cover: './images/covers/8.jpg'
  },
  {
    name: 'Humsafar',
    path: '/songs/9.mp3',
    cover: './images/covers/9.jpeg'
  },
  {
    name: 'Waaliyaan',
    path: '/songs/10.mp3',
    cover: './images/covers/10.jpg'
  },
  {
    name: 'Hai apna dil awara',
    path: '/songs/11.mp3',
    cover: './images/covers/11.jpg'
  },
  {
    name: 'Hasi',
    path: '/songs/12.mp3',
    cover: './images/covers/12.jpg'
  },
  {
    name: 'Kal ho na ho',
    path: '/songs/13.mp3',
    cover: './images/covers/13.jpg'
  },
  {
    name: 'Main rahoon na rahoon',
    path: '/songs/14.mp3',
    cover: './images/covers/14.jpg'
  },
  {
    name: 'Likhe jo khat tujhe',
    path: '/songs/15.mp3',
    cover: './images/covers/15.jpg'
  },
  {
    name: 'Meri samne wali',
    path: '/songs/16.mp3',
    cover: './images/covers/16.jpg'
  },
  {
    name: 'Mera dil bhi',
    path: '/songs/17.mp3',
    cover: './images/covers/17.jpg'
  },
  {
    name: 'Mere liye',
    path: '/songs/18.mp3',
    cover: './images/covers/18.jpg'
  },
  {
    name: 'Ajab si',
    path: '/songs/19.mp3',
    cover: './images/covers/19.jpg'
  }
];

const container = document.querySelector('.songItemContainer');
const fragment = document.createDocumentFragment();

songs.forEach((song, index) => {
  const songItemEl = document.createElement('div');
  songItemEl.classList.add('songItem');
  const coverImgEl = document.createElement('img');
  coverImgEl.classList.add('songImage');
  coverImgEl.src = song.cover;
  coverImgEl.alt = 'song';
  songItemEl.appendChild(coverImgEl);
  fragment.appendChild(songItemEl);
  const songNameEl = document.createElement('span');
  songNameEl.classList.add('songName');
  songNameEl.innerText = song.name;
  songItemEl.appendChild(songNameEl);

  const timestamp = document.createElement('span');
  timestamp.classList.add('timestamp');
  const controls = document.createElement('i');
  const controlSpan = document.createElement('span');
  controls.dataset.src = song.path;
  controls.dataset.index = index;
  controls.classList.add('fa', 'fa-play-circle', 'songItemPlay');
  controlSpan.appendChild(controls);
  songItemEl.appendChild(timestamp);
  songItemEl.appendChild(controlSpan);
});

container.appendChild(fragment);

let audioElement = new Audio(songs[0].path);
audioElement.dataset.index = 0;
let masterPlay = document.getElementById('masterPlay');
let masterPause = document.getElementById('masterPause');
let progressBar = document.getElementById('progressBar');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = document.getElementsByClassName('songItemPlay');
let timestamp = document.getElementsByClassName('timestamp');

function fetchDuration(path) {
  return new Promise(resolve => {
    const audio = new Audio();
    audio.src = path;
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
  });
}

function fetchAudioDurations(paths) {
  return Promise.all(paths.map(path => fetchDuration(path)));
}

window.addEventListener('DOMContentLoaded', async () => {
  await fetchAudioDurations([
    '/songs/1.mp3',
    '/songs/2.mp3',
    '/songs/3.mp3',
    '/songs/4.mp3',
    '/songs/5.mp3',
    '/songs/6.mp3',
    '/songs/7.mp3',
    '/songs/8.mp3',
    '/songs/9.mp3',
    '/songs/10.mp3',
    '/songs/11.mp3',
    '/songs/12.mp3',
    '/songs/13.mp3',
    '/songs/14.mp3',
    '/songs/15.mp3',
    '/songs/16.mp3',
    '/songs/17.mp3',
    '/songs/18.mp3',
    '/songs/19.mp3'
  ]).then(totalDuration => {
    for (let index = 0; index <= songs.length - 1; index++) {
      timestamp[index].innerText = (totalDuration[index] / 60).toFixed(2);
    }
  });
});

//play first song from master play button,it will play first song
const masterSongNameEl = document.querySelector('#masterSongName');
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play().catch();
    masterPlay.classList.add('play');
    masterPause.classList.add('active');
    gif.style.opacity = 1;
    const index = +audioElement.dataset.index;
    songItemPlay[index].classList.remove('fa-play-circle');
    songItemPlay[index].classList.add('fa-pause-circle');
    masterSongNameEl.innerText = songs[index].name;
  }
});

//to pause song from master pause button
masterPause.addEventListener('click', () => {
  if (audioElement.play) {
    audioElement.pause();
    masterPlay.classList.remove('play');
    masterPause.classList.remove('active');
    gif.style.opacity = 0;
    const index = +audioElement.dataset.index;
    songItemPlay[index].classList.add('fa-play-circle');
    songItemPlay[index].classList.remove('fa-pause-circle');
    masterSongNameEl.innerText = songs[index].name;
  }
});

//update progress bar
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});

//seek progress bar
progressBar.addEventListener('change', () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

//change  song item play button
function makeAllPlays() {
  Array.from(songItemPlay).forEach(element => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}

container.addEventListener('click', event => {
  const element = event.target;
  const songIndex = parseInt(element.dataset.index); //to get id or index from element
  masterSongName.innerText = songs[songIndex].name;
  const source = element.dataset.src;

  if (!audioElement.src.includes(source)) {
    audioElement.src = element.dataset.src;
    audioElement.dataset.index = songIndex;
    audioElement.currentTime = 0;
  }

  const isPaused = audioElement.paused;

  gif.style.opacity = +!isPaused;

  if (isPaused) {
    audioElement.play().catch();
    gif.style.opacity = 1;
    makeAllPlays();
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle', 'playing');
    masterPlay.classList.add('play');
    masterPause.classList.add('active');
    return;
  }
  audioElement.pause();
  gif.style.opacity = 0;
  makeAllPlays();
  element.classList.add('fa-play-circle');
  element.classList.remove('fa-pause-circle', 'playing');
  masterPlay.classList.remove('play');
  masterPause.classList.remove('active');
});

//  to next from master next button
next.addEventListener('click', () => {
  const index = +audioElement.dataset.index;
  let nextIndex = index + 1;
  if (index === songs.length - 1) {
    nextIndex = 0;
  }
  updateSongs(nextIndex, index);
  makeAllPlays();
  songItemPlay[nextIndex].classList.remove('fa-play-circle');
  songItemPlay[nextIndex].classList.add('fa-pause-circle');
});

// to previous from master previous button
previous.addEventListener('click', () => {
  let index = +audioElement.dataset.index;
  let prevIndex = index - 1;
  if (index <= 0) {
    prevIndex = songs.length - 1;
  }
  updateSongs(prevIndex, index);
  makeAllPlays();
  songItemPlay[prevIndex].classList.remove('fa-play-circle');
  songItemPlay[prevIndex].classList.add('fa-pause-circle');
});

function updateSongs(removeIndex, activeIndex) {
  audioElement.src = songs[removeIndex].path;
  audioElement.dataset.index = removeIndex;
  masterSongName.innerText = songs[removeIndex].name;
  audioElement.currentTime = 0;
  audioElement.play().catch();
  masterPlay.classList.add('play');
  masterPause.classList.add('active');
  // togglePlayIcons();
}
//story typewriter
var text2 = 'Story | Memories';
var about_type = document.querySelector('#memories');
var obs2 = new IntersectionObserver(
  entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      for (let i = 0; i < text2.length; i++) {
        setTimeout(() => {
          about_type.innerHTML += text2[i];
        }, i * 100);
      }
      obs2.unobserve(about_type);
    }
  },
  {
    threshold: 0.1
  }
);
obs2.observe(about_type);

//music typewriter
var text1 = 'Music you will adore!!!!!!!';
var services_type = document.querySelector('#music');
var obs1 = new IntersectionObserver(
  entries => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      for (let i = 0; i < text1.length; i++) {
        setTimeout(() => {
          services_type.innerHTML += text1[i];
        }, i * 100);
      }
      obs1.unobserve(services_type);
    }
  },
  {
    threshold: 0.1
  }
);
obs1.observe(services_type);

//bestOfUs
var text3 = 'Playlist...';
var bestOfUs_type = document.querySelector('#bestOfUs');
var obs3 = new IntersectionObserver(
  entries => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      for (let i = 0; i < text3.length; i++) {
        setTimeout(() => {
          bestOfUs_type.innerHTML += text3[i];
        }, i * 100);
      }
      obs3.unobserve(bestOfUs_type);
    }
  },
  {
    threshold: 0.1
  }
);
obs3.observe(bestOfUs_type);

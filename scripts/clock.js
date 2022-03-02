const digitalHours = document.querySelector('.digital-hours')
const digitalMinutes = document.querySelector('.digital-minutes')
const digitalSeconds = document.querySelector('.digital-seconds')
const digitalDotOne = document.querySelector('.dot-one')
const digitalDotTwo = document.querySelector('.dot-two')
const fullDate = document.querySelector('.date-wrapper')
const greetingsText = document.querySelector('.greetings-text')
const visitorName = document.querySelector('.input-visitor-name')
const weatherCity = document.querySelector('.weather-city')
const body = document.querySelector('body')
const rightBgButton = document.querySelector('.right-bg')
const leftBgButton = document.querySelector('.left-bg')
const quotesText = document.querySelector('.quotes-text')
const quotesAuthor = document.querySelector('.quotes-author')
const quotesRefreshButton = document.querySelector('.quotes-refresh-button')
const languageButtons = document.querySelectorAll('.lang-radio')
const sourceUrls = document.querySelectorAll('.image-source-radio')
const displayItems = document.querySelectorAll('.disp-checkbox')
const autoButton = document.querySelector('.autoslide-checkbox');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const errorPopup = document.querySelector('.error-popup');
const settingsStart = document.querySelector('.settings-arrow');
const settingsClose = document.querySelector('.settings-window-close');
const linksClose = document.querySelector('.links-window-close');
const linksStart = document.querySelector('.links-arrow');
const settingsWindow = document.querySelector('.settings-window');
const mainWeather = document.querySelector('.weather-forecast');
const mainClock = document.querySelector('.digital-clock');
const mainQuotes = document.querySelector('.quotes-wrapper');
const mainGreetings = document.querySelector('.greetings-wrapper');
const inputInterval = document.querySelector('.autoslide-timer-input');
const inputTag = document.querySelector('.unsplash-tag');
const audioPlayerWrapper = document.querySelector('.audio-player-wrapper')
const audioPlayer = document.querySelector('.audio-player')
const buttonPlay = document.querySelector('.music-play')
const buttonPrev = document.querySelector('.music-left')
const buttonNext = document.querySelector('.music-right')
const buttonShuffle = document.querySelector('.music-shuffle')
const buttonSound = document.querySelector('.music-sound')
const audioPlayerTitle = document.querySelector('.audio-player-title')
const musicPlaylist = document.querySelector('.music-playlist')
const musicProgressbar = document.querySelector('.audio-player-progressbar')
const soundBar = document.querySelector('.audio-player-soundbar')
const rInput = document.querySelector('.custom-color-r')
const gInput = document.querySelector('.custom-color-g')
const bInput = document.querySelector('.custom-color-b')
const musicTime = document.querySelector('.music-time')
const addedLinks = document.querySelector('.added-links-ul')
const addLinkButton = document.querySelector('.add-links-button')
const resetLinksButton = document.querySelector('.reset-links-button')
const inputLinksInput = document.querySelector('.add-input')
const linksListWrapper = document.querySelector('.links-list-wrapper')
let musicPlaylistSong = document.querySelectorAll('.music-playlist > li')
let prevVolume = 100;

const dayArr = [['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                ['Воскресенье ', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']]
const monthArr = [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 
                    ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентябрь', 'октября', 'ноября', 'лекабря']]
const greetingsArr = [['Good morning,', 'Good afternoon,', 'Good evening,', 'Good night,'],
                      ['Доброе утро,', 'Добрый день,', 'Добрый вечер,', 'Доброй ночи,']]
const errorText = [['Error: wrong city', 'Error: request limit reached. <br> Github is now used', 'Error: wrong tag. <br> Github is now used'],
                   ['Ошибка: неверный город', 'Ошибка: лимит запросов исчерпан. <br> Сейчас используется Github', 'Ошибка: неверный тег. <br> Сейчас используется Github']]
const allText = [['Image source', 'Autoslider', 'Autoplay', 'Delay (s):', 'Tag:', 'Displaying items', 'Music player',
                  'Clock', 'Date', 'Greetings','Quotes', 'Weather forecast', 'Settings', 'Custom font color', 'Links'],
                 ['Источник картинок', 'Автослайдер', 'Авто', 'Задержка (с):', 'Тег:', 'Отображение', 'Музыка',
                  'Часы', 'Дата', 'Приветствие', 'Цитаты', 'Прогноз погоды', 'Настройки', 'Цвет шрифта', 'Ссылки']]

let dateStart = new Date()

let seconds = dateStart.getSeconds();
let minutes = dateStart.getMinutes();
let hours = dateStart.getHours();
let day = dateStart.getDate();
let month = dateStart.getMonth();
let dayWeek = dateStart.getDay();
let greetingsCount = 0
let randomPicNumber = 0
let receivedQuotes;
let quotesCounter = 0
let isBgChanging = 0
let prevTimeOfDay;
let unsplashUrl;
let galleryFromFlickr;
let autosliderTimerId;
let isShuffle = 0


// MAIN SETTINGS OBJECT
let settings = {
  langCount : 0,
  mainLang: 'en',
  visitorNameText: null,
  prevRandPic: 0,
  city: 'Minsk',
  numberBgUrl: 0,
  picTag: 'autumn',
  'music': true,
  'clock': true,
  'date': true,
  'greetings': true,
  'quotes': true,
  'weather': true,
  autoslider: false,
  autosliderInterval: 5000,
  red: 255,
  green: 255,
  blue: 255,
  soundValue: 100,
  linksArray: [],
}


// LOAD SETTINS OBJECT
load()

languageButtons.forEach(item => {
  item.addEventListener("change", () => {
    settings.mainLang = item.value
    save()
    loadLang()
  })
})

sourceUrls.forEach(item => {
  item.addEventListener("change", () => {
    settings.numberBgUrl = +item.value
    save()
    loadAndSetBg(settings.numberBgUrl)
  })
})

displayItems.forEach(item => {
  item.addEventListener("change", () => {
    if (item.checked) {
      hideItems(item.value, true) 
      settings[item.value] = true
    } else {
      hideItems(item.value, false)
      settings[item.value] = false
    }
    save()
  })
})

autoButton.addEventListener('change', () => {
  autosliderStartStop()
  save()
})

visitorName.addEventListener('input', () => {
  settings.visitorNameText = visitorName.value
  save()
})

inputInterval.addEventListener('change', () => {
  autoButton.checked = false
  autosliderStartStop()
  if (+inputInterval.value < 5) inputInterval.value = 5
  settings.autosliderInterval = inputInterval.value * 1000
  autoButton.checked = true
  autosliderStartStop()
  save()
})

inputTag.addEventListener('change', () => {
  settings.picTag = inputTag.value
  save()
})

weatherCity.addEventListener('change', () => {
  settings.city = weatherCity.value
  getWeather()
  save()  
})

rightBgButton.addEventListener('click', () => {
  picSlider('right')
})
leftBgButton.addEventListener('click', () => {
  picSlider('left')
})

quotesRefreshButton.addEventListener('click', quotesSlider)

settingsStart.addEventListener('click', () => {
  settingsWindow.classList.toggle('hidden-settings')
  linksListWrapper.classList.add('links-hidden')
})
settingsClose.addEventListener('click', () => {
  settingsWindow.classList.toggle('hidden-settings')
  linksListWrapper.classList.add('links-hidden')
})

linksStart.addEventListener('click', () => {
  linksListWrapper.classList.toggle('links-hidden')
  settingsWindow.classList.add('hidden-settings')
})
linksClose.addEventListener('click', () => {
  linksListWrapper.classList.toggle('links-hidden')
  settingsWindow.classList.add('hidden-settings')
})

const urlForBg = []

let timerId = setTimeout(function tick() {
  date = new Date()

  seconds = date.getSeconds()
  minutes = date.getMinutes()
  hours = date.getHours()
  day = date.getDate()
  month = date.getMonth()
  dayWeek = date.getDay()

  //Greetings text
  hours < 6 ? greetingsCount = 3 : hours < 12 ? greetingsCount = 0 : hours < 18 ? greetingsCount = 1 : greetingsCount = 2
  greetingsText.innerHTML = `${greetingsArr[settings.langCount][greetingsCount]}`;

  //Digital clock
  digitalHours.innerHTML = `${digitalCorrect(hours)}`;
  digitalMinutes.innerHTML = `${digitalCorrect(minutes)}`;
  digitalSeconds.innerHTML = `${digitalCorrect(seconds)}`;

  //Day of week and date
  fullDate.innerHTML = settings.langCount === 0 ? `${dayArr[settings.langCount][dayWeek]}, ${monthArr[settings.langCount][month]} ${digitalCorrect(day)}` : `${dayArr[settings.langCount][dayWeek]}, ${digitalCorrect(day)} ${monthArr[settings.langCount][month]}`

  if (!prevTimeOfDay) {
    prevTimeOfDay = timeOfDay(hours)
  } else if (prevTimeOfDay !== timeOfDay(hours)) {
    prevTimeOfDay = timeOfDay(hours)
    loadAndSetBg(settings.numberBgUrl)
  }

  timerId = setTimeout(tick, 1000); 
}, 1000);

//-----------------------------------LOAD & SAVE-------------------------------
function save() {
    localStorage.setItem('jack13only-momentum-settings', JSON.stringify(settings))
}

function load() {
  if (!localStorage.getItem('jack13only-momentum-settings')) {
    save()
  } else {
    settings = JSON.parse(localStorage.getItem('jack13only-momentum-settings'))
  }
  loadLang()
  loadQuotesFromJson()
  randomPic(1, 20)
  loadAndSetBg(settings.numberBgUrl)
  getWeather()
  loadVisitorName()
  changeTextColor(settings.red, settings.green, settings.blue)
  languageButtons.forEach(item => {
    if (settings.mainLang === item.value) {
      // item.setAttribute('checked', 'checked');
      item.checked = true;
    }
  })
  sourceUrls.forEach(item => {
    if (settings.numberBgUrl === +item.value) {
      // item.setAttribute('checked', 'checked');
      item.checked = true;
    }
  })
  displayItems.forEach(item => {
    item.checked = settings[item.value]
    if (item.checked) {
      hideItems(item.value, true) 
      settings[item.value] = true
    } else {
      hideItems(item.value, false)
      settings[item.value] = false
    }
  })

  if (settings.autoslider) {
    autoButton.setAttribute('checked', 'true');
    autosliderStartStop()
  }
  inputInterval.value = settings.autosliderInterval / 1000
  inputTag.value = settings.picTag
  rInput.value = settings.red
  gInput.value = settings.green
  bInput.value = settings.blue
  document.querySelector('.custom-color-r-number').innerHTML = `${settings.red}`
  document.querySelector('.custom-color-g-number').innerHTML = `${settings.green}`
  document.querySelector('.custom-color-b-number').innerHTML = `${settings.blue}`
  soundBar.value = settings.soundValue
  audioPlayer.volume = soundBar.value / 100
  if (settings.linksArray.length !== 0) {
    settings.linksArray.forEach(item => {
      addNewLink(item)
    })
  }
}
//-----------------------------------LOAD & SAVE-------------------------------


//Add 0 to minutes and seconds
function digitalCorrect(x) {
  return x < 10 ? '0' + String(x) : x
}

function loadLang() {
  if (settings.mainLang === 'en') {
    settings.mainLang = 'ru'
  } else {
    settings.mainLang = 'en'
  }
  changeLang()
}

function changeLang() {
  if (settings.mainLang === 'en') {
    settings.mainLang = 'ru'
    settings.langCount = 1
    if (settings.city.toLowerCase() === 'minsk') settings.city = 'Минск'  
    weatherCity.value = settings.city
    visitorName.setAttribute('placeholder', '[Введи имя]')
    loadQuotesFromJson()
    textTranslate()
    getWeather()
  } else {
    settings.mainLang = 'en'
    settings.langCount = 0
    if (settings.city.toLowerCase() === 'минск') settings.city = 'Minsk'  
    weatherCity.value = settings.city
    visitorName.setAttribute('placeholder', '[Input name]')
    loadQuotesFromJson()
    textTranslate()
    getWeather()
  }
}

function loadVisitorName() {
  if (settings.visitorNameText) {
    visitorName.value = settings.visitorNameText
  } 
}

function randomPic(min, max) {
  randomPicNumber = Math.floor(min + Math.random() * (max + 1 - min))
  settings.prevRandPic === randomPicNumber ? randomPic(min, max) : settings.prevRandPic = randomPicNumber
  save()
  return randomPicNumber
}

function randomNumPrettier(randomPicNumber) {
  return randomPicNumber > 9 ? '' + randomPicNumber : '0' + randomPicNumber
}

function timeOfDay(hours) {
  if (hours < 6) {
    return 'night'
  } else if (hours < 12) {
    return 'morning'
  } else if (hours < 18) {
    return 'day'
  } else {
    return 'evening'
  }
}

function timeOfDayForGallery(hours) {
  if (hours < 6) {
    return '72157720063404481'
  } else if (hours < 12) {
    return '72157720063430231'
  } else if (hours < 18) {
    return '72157720070413772'
  } else {
    return '72157720057859178'
  }
}

// function picRandomizer() {
//   randomPic(1, 20)
//   body.style.backgroundImage = `url('https://raw.githubusercontent.com/jack13only/stage1-tasks/assets/images/${timeOfDay(hours)}/${randomNumPrettier(randomPicNumber)}.jpg')`;
// }

function picSlider(direction) {
  if (!isBgChanging) {
    isBgChanging = 1
    if (direction === 'right') {
      randomPicNumber > 19 ? randomPicNumber = 1 : randomPicNumber++
    } 
    if (direction === 'left') {
      randomPicNumber < 2 ? randomPicNumber = 20 : randomPicNumber--
    }
    loadAndSetBg(settings.numberBgUrl)
    body.style.transition = '0.5s linear'
    setTimeout(() => {
      isBgChanging = 0
    }, 800);
  }
}


function loadAndSetBg(x) {
  if (x === 0) {
    loadBgFromGithub()
  } else if (x === 1) {
    loadBgFromUnsplash()
  } else {
    loadBgFromFlickr()
  }
}

function loadBgFromGithub() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/jack13only/stage1-tasks/assets/images/${timeOfDay(hours)}/${randomNumPrettier(randomPicNumber)}.jpg`
  img.onload = () => {      
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/jack13only/stage1-tasks/assets/images/${timeOfDay(hours)}/${randomNumPrettier(randomPicNumber)}.jpg')`
  }
}

function loadBgFromUnsplash() {
  const url = `https://api.unsplash.com/photos/random?query=${settings.picTag}&client_id=-eAqbntVQwmBNFZ6HejSX-HOPbXD7t8mod46829ZOXY`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
        const img = new Image();
        img.src = `${data.urls.regular}`
        img.onload = () => {      
          body.style.backgroundImage = `url('${data.urls.regular}')`
        }
      })
    .catch(err => {
      console.log(err);
      loadBgFromGithub()
      errorPop(1)
      settings.numberBgUrl = 0
      sourceUrls.forEach(item => {
        if (settings.numberBgUrl === +item.value) {
          item.checked = true;
        }
      })
      save()
    })
}

function loadBgFromFlickr() {
  if (!galleryFromFlickr) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=339cfdcd69415fdd0e1a7d2510f1cb5f&gallery_id=${timeOfDayForGallery(hours)}&extras=url_h&format=json&nojsoncallback=1`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
        galleryFromFlickr = data.photos.photo
        setBgFromFlickr()
      })
    .catch(err => {
      loadBgFromGithub()
      errorPop(2)
      settings.numberBgUrl = 0
      sourceUrls.forEach(item => {
        if (settings.numberBgUrl === +item.value) {
          item.checked = true;
        }
      })
      save()
    })
  } else {
    setBgFromFlickr()
  }  
}

function setBgFromFlickr() {
  const img = new Image();
  img.src = `${galleryFromFlickr[randomPicNumber - 1].url_h}`
  img.onload = () => {      
    body.style.backgroundImage = `url('${img.src}')`
  }; 
}


async function loadQuotesFromJson() {  
  const res = await fetch('./json/quotes.json');
  const data = await res.json(); 
  data.forEach((item) => item.sort(() => Math.random() - 0.5))
  quotesText.innerHTML = `${data[settings.langCount][0].text}`
  quotesAuthor.innerHTML = `${data[settings.langCount][0].author}`
  receivedQuotes = data
}

function quotesSlider() {
  if (receivedQuotes) {
    quotesCounter++
    (quotesCounter > receivedQuotes[settings.langCount].length - 1) ? quotesCounter = 0 : quotesCounter
    quotesText.innerHTML = `${receivedQuotes[settings.langCount][quotesCounter].text}`
    quotesAuthor.innerHTML = `${receivedQuotes[settings.langCount][quotesCounter].author}`
  }
}

async function getWeather() { 
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${settings.city}&lang=${settings.mainLang}&appid=b42c6090920a7777976b68df3fe8da07&units=metric`);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    wind.textContent = `${Math.round(data.wind.speed)} ${settings.mainLang === 'en' ? 'm/s' : 'м/c'}`;
    weatherDescription.textContent = data.weather[0].description;
  } catch(err) {
    errorPop(0)
    settings.city = settings.mainLang === 'en' ? 'Minsk' : 'Минск'
    weatherCity.value = settings.city
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${settings.mainLang === 'en' ? 'Minsk' : 'Минск'}&lang=${settings.mainLang}&appid=b42c6090920a7777976b68df3fe8da07&units=metric`);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    wind.textContent = `${Math.round(data.wind.speed)} ${settings.mainLang === 'en' ? 'm/s' : 'м/c'}`;
    weatherDescription.textContent = data.weather[0].description;
    save()
  }
}

function errorPop(x) {
    errorPopup.innerHTML = errorText[settings.langCount][x]
    errorPopup.classList.remove('error-popup-hide')
    setTimeout(() => {
      errorPopup.classList.add('error-popup-hide')
    }, 2500)
}

function hideItems(x, hide) {
  if (!hide) {
    switch (x) {
      case 'music':
        audioPlayerWrapper.classList.add('hide-item')
        break;
      case 'clock':
        mainClock.classList.add('hide-item')
        break;
      case 'date':
        fullDate.classList.add('hide-item')
        break;
      case 'greetings':
        mainGreetings.classList.add('hide-item')
        break;
      case 'quotes':
        mainQuotes.classList.add('hide-item')
        break;
      case 'weather':
        mainWeather.classList.add('hide-item')
        break;
      default:      
    }
  } else {
    switch (x) {
      case 'music':
        audioPlayerWrapper.classList.remove('hide-item')
        break;
      case 'clock':
        mainClock.classList.remove('hide-item')
        break;
      case 'date':
        fullDate.classList.remove('hide-item')
        break;
      case 'greetings':
        mainGreetings.classList.remove('hide-item')
        break;
      case 'quotes':
        mainQuotes.classList.remove('hide-item')
        break;
      case 'weather':
        mainWeather.classList.remove('hide-item')
        break;
      default:      
    }
  }
}

function autoslider() {
  autosliderTimerId = setInterval(() => picSlider('right'), settings.autosliderInterval);
  save()
}

function autosliderStartStop() {
  if (autoButton.checked) {
    settings.autoslider = true
    autoslider()
  } else {
    settings.autoslider = false
    clearInterval(autosliderTimerId)
  }
}

function textTranslate() {
  document.querySelector('.image-source-header').innerHTML = allText[settings.langCount][0]
  document.querySelector('.lang-header-autoslider').innerHTML = allText[settings.langCount][1]
  document.querySelector('.autoslide-text').innerHTML = allText[settings.langCount][2]
  document.querySelector('.autoslide-timer').innerHTML = allText[settings.langCount][3]
  document.querySelector('.tag-name').innerHTML = allText[settings.langCount][4]
  document.querySelector('.displaying-header').innerHTML = allText[settings.langCount][5]
  document.querySelector('.disp-name.music').innerHTML = allText[settings.langCount][6]
  document.querySelector('.disp-name.clock').innerHTML = allText[settings.langCount][7]
  document.querySelector('.disp-name.date').innerHTML = allText[settings.langCount][8]
  document.querySelector('.disp-name.greetings').innerHTML = allText[settings.langCount][9]
  document.querySelector('.disp-name.quotes').innerHTML = allText[settings.langCount][10]
  document.querySelector('.disp-name.weather').innerHTML = allText[settings.langCount][11]
  document.querySelector('.settings-arrow-text').innerHTML = allText[settings.langCount][12]
  document.querySelector('.custom-color-header').innerHTML = allText[settings.langCount][13]
  document.querySelector('.links-arrow-text').innerHTML = allText[settings.langCount][14]
}


const playlist = [{
    title: 'Ultimate Music - Pokemon Metal Cover',
    src: './assets/music/Ultimate Music - Pokemon Metal Cover.mp3',
  },
  {
    title: 'Dope - You Spin Me Round',
    src: './assets/music/Dope - You spin me round.mp3',
  },
  {
    title: 'A-Ha - Take On Me',
    src: './assets/music/A-Ha - Take On Me.mp3',
  },
  {
    title: 'Marty Robbins - Big Iron',
    src: './assets/music/Marty Robbins - Big Iron.mp3',
  },
  {
    title: 'Avantasia - The Story Aint Over',
    src: './assets/music/Avantasia - The Story Aint Over.mp3',
  },
]


let isPlay = false;
let countSongsPlaylist = 0

fillPlaylist()

audioPlayer.addEventListener('timeupdate', () => {
  audioProgress()
  checkMusicEnd() 
  musicTime.innerHTML = `${secToMin(audioPlayer.currentTime)}/${secToMin(audioPlayer.duration)}`
})
buttonPlay.addEventListener('click', playPauseAudio)
buttonNext.addEventListener('click', next)
buttonPrev.addEventListener('click', prev)
buttonShuffle.addEventListener('click', () => {
  fillPlaylist()
  setTimeout(() => {
    playAudio()
    activeSong()
  }, 1700)
})
musicProgressbar.addEventListener('input', function() {
  audioPlayer.currentTime = audioPlayer.duration * musicProgressbar.value / 100
})

function secToMin(x) {
  if (!isNaN(x)) {
    x = Math.round(x)
    return `${x < 60 ? 0 : ((x - (x % 60))/60)}:${x < 60 ? x < 10 ? '0' + x : x : (x % 60) < 10 ? '0' + x % 60 : x % 60}`
  } else return `0:00`
}

function playAudio() {
  audioPlayerTitle.innerHTML = `${playlist[countSongsPlaylist].title}`
  audioPlayer.src = playlist[countSongsPlaylist].src
  // audioPlayer.currentTime = 0;
  audioPlayer.play();
  isPlay = true
  buttonPlay.innerHTML = '&#9632;'
  activeSong()
}

function pauseAudio() {
  audioPlayer.pause();
  isPlay = false
  buttonPlay.innerHTML = '&#9654;'
  musicPlaylistSong.forEach((item) => {
    item.classList.remove('playy')
  })
}

function playPauseAudio() {
  isPlay ? pauseAudio() : playAudio()
}

function audioProgress() {
  let percent = (audioPlayer.currentTime / audioPlayer.duration)
  if (isNaN(percent)) percent = 0
  musicProgressbar.value = percent * 100
}

function next() {
  countSongsPlaylist++
  countSongsPlaylist >= playlist.length ? countSongsPlaylist = 0 : countSongsPlaylist
  audioPlayer.src = playlist[countSongsPlaylist].src
  playAudio()
  activeSong()
}

function prev() {
  countSongsPlaylist--
  countSongsPlaylist < 0 ? countSongsPlaylist = playlist.length - 1 : countSongsPlaylist
  audioPlayer.src = playlist[countSongsPlaylist].src
  playAudio()
  activeSong()
}

function shufflePlaylist() {
  playlist.sort(() => Math.random() - 0.5)
}

function fillPlaylist() {
  if (!isShuffle) {
    isShuffle = 1
    musicPlaylist.innerHTML = ''
    shufflePlaylist()
    countSongsPlaylist = 0
    audioPlayerTitle.innerHTML = `${playlist[0].title}`
    for(let i = 0; i < playlist.length; i++) {      
      setTimeout(() => {
        let liFirst = document.createElement('li');
        liFirst.innerHTML = `${playlist[i].title}`;
        musicPlaylist.append(liFirst)
        if (i === playlist.length - 1) {
          isShuffle = 0
          musicPlaylistSong = document.querySelectorAll('.music-playlist li')
          playFromPlaylist()
        }
      }, (i + 1 ) * 200)
    }
  }
}

function checkMusicEnd() {
  if (audioPlayer.currentTime === audioPlayer.duration) {
    next()
  }
}

function playFromPlaylist() {
  for (let i = 0; i < 5; i++) {
    if (musicPlaylistSong[i]) {
      musicPlaylistSong[i].addEventListener('click', () => {
        if (i === countSongsPlaylist && isPlay) {
          pauseAudio()
        } else {
          countSongsPlaylist = i
          playAudio()
          activeSong()
        }
      })
    }
  }
}

function activeSong() {
  musicPlaylistSong.forEach((item) => {
    item.classList.remove('playy')
  })
  let playingSong = document.querySelector(`li:nth-child(${countSongsPlaylist + 1})`)
  if (playingSong) playingSong.classList.add('playy')
}

soundBar.addEventListener('input', () => {
  if (audioPlayer.muted) {
    audioPlayer.muted = false
    buttonSound.classList.remove('muted')
  }
  audioPlayer.volume = soundBar.value / 100
  settings.soundValue = soundBar.value
  save()
})

buttonSound.addEventListener('click', () => {
  if (audioPlayer.muted) {
    soundBar.value = prevVolume
    settings.soundValue = prevVolume
    audioPlayer.muted = false
    buttonSound.classList.remove('muted')
  } else {
    audioPlayer.muted = true
    prevVolume = soundBar.value
    soundBar.value = 0
    settings.soundValue = 0
    buttonSound.classList.add('muted')
  }
  save()
})


rInput.addEventListener('input', () => {
  settings.red = rInput.value
  changeTextColor(settings.red, settings.green, settings.blue)
  document.querySelector('.custom-color-r-number').innerHTML = `${settings.red}`
  save()
})

gInput.addEventListener('input', () => {
  settings.green = gInput.value
  changeTextColor(settings.red, settings.green, settings.blue)
  document.querySelector('.custom-color-g-number').innerHTML = `${settings.green}`
  save()
})

bInput.addEventListener('input', () => {
  settings.blue = bInput.value
  changeTextColor(settings.red, settings.green, settings.blue)
  document.querySelector('.custom-color-b-number').innerHTML = `${settings.blue}`
  save()
})

function changeTextColor(r, g, b) {
  document.documentElement.setAttribute("style", `--main-text-color: rgb(${r}, ${g}, ${b});`);
}

addLinkButton.addEventListener('click', () => {
  if (settings.linksArray.length < 15) {
    addNewLink(inputLinksInput.value)
    if (inputLinksInput.value) settings.linksArray.push(inputLinksInput.value)
    save()
    inputLinksInput.value = ''
  } else {
      inputLinksInput.value = settings.langCount === 0 ? 'Max 20 links' : 'Максимум 15 ссылок'
    setTimeout(() => {
      inputLinksInput.value = ''
    }, 1000)
  }
  
})

resetLinksButton.addEventListener('click', () => {
  addedLinks.innerHTML = ''
  settings.linksArray = []
  save()
})

function addNewLink(x) {
  if (x) {
    addedLinks.insertAdjacentHTML("beforeEnd", `<li><a target="_blank" href='https://${x}'>${x}</a></li>`);
  }
}



console.log('Дополнительный функционал:');
console.log('---------------------------');
console.log('1. Кнопка shuffle для перемешивания плейлиста');
console.log('2. Выбор цвета (RGB) оформления приложения в настройках');
console.log('3. Автослайдер изображений с настраиваемым интервалом');
console.log('4. Список ссылок, добавление новых, полная очистка списка, не пропадают после обновления страницы');
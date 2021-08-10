
//开始和暂停切换
const bindEventToggle = function(audio) {
	let player = e('.fa-play')
	player.addEventListener('click', function() {
		if (player.classList.contains('fa-play')) {
			audio.play()
			player.classList.remove('fa-play')
			player.classList.add('fa-pause')
		} else if (player.classList.contains('fa-pause')) {
			audio.pause()
			player.classList.remove('fa-pause')
			player.classList.add('fa-play')
		}
	})
}

//生成1到array.length之间的随机函数
const choice = function(array) {
	// 1. 得到  0 - 1 之间的小数 a
	// 2. 把 a 转成 0 - array.length 之间的小数
	// 3. 得到 0 - array.length - 1 之间的整数作为下标
	// 4. 得到 array 中的随机元素
	let a = Math.random()
	let len = array.length
	let random = a * len
	random = Math.floor(random)
	return random
	// log(random)
}

//把时间转换为分秒
const clock = function(time) {
	let minute = Math.floor(time / 60)
	let second = Math.floor(time - (60 * minute))
	let result = ''
	if (second < 10) {
		result = `0${minute}:0${second}`
		} else {
		result = `0${minute}:${second}`
		}
		return result
}

//显示在页面上的当前播放时间
const bindEventNow = function(audio, duration) {
	let span = e('#id-span-now')
	log(span)
	let clockId = setInterval(function() {
		let time = audio.currentTime
		// log('time', time)
		span.innerHTML = clock(time)
		// if (time == duration) {
		// 	clearInterval(clockId)
		// }
	}, 1000)
}

//显示在页面上歌曲总时长
const bindEventSum = function(audio) {
	let span = e('#id-span-sum')
	log(audio.duration)
	span.innerHTML = clock(audio.duration)
}

//拿到歌曲总时长
const bindEventCanplay = function(audio) {
    audio.addEventListener('canplay', function() {
	let duration = audio.duration
	log('duration in canplay', duration)
	// 拿到 duration 之后
	// 调用 dom api 就可以在页面显示 duration
	bindEventNow(audio, duration)
	bindEventSum(audio)
	})
}

//结束播放下一首
const bindEventEnded = function(audio, musicarray, img, imgarray, o, obj) {
	audio.addEventListener('ended', function() {
		if (obj.randomchoice === true) {
			randomplay(audio, musicarray, img, imgarray, o, obj)
		} else if (obj.circulatechoice === true) {
			audio.src = audio.src
			audio.play()
		} else {
			index += 1
			index = (index) % musicarray.length
			playaudio(audio, musicarray, img, imgarray, o, index)
		}
	})
}

//随机播放
const bindrandom = function(obj) {
	let randombutton = e('.fa-random')
	let circulatebutton = e('.fa-undo')
	randombutton.classList.add('second')
	randombutton.addEventListener('click', function() {
		if (randombutton.classList.contains('second')) {
			obj.randomchoice = true
			log(obj.randomchoice)
			randombutton.classList.remove('second')
			randombutton.style.color = '#00FF00'
		} else if (!randombutton.classList.contains('second')) {
			obj.randomchoice = false
			log(obj.randomchoice)
			randombutton.classList.add('second')
			randombutton.style = 'none'
		}
	})
}

//单曲循环
const bindcirculate = function(obj) {
	let circulatebutton = e('.fa-undo')
	let randombutton = e('.fa-random')
	circulatebutton.classList.add('second')
	circulatebutton.addEventListener('click', function() {
		if (circulatebutton.classList.contains('second')) {
			obj.circulatechoice = true
			log(obj.circulatechoice, 'circulate')
			circulatebutton.classList.remove('second')
			circulatebutton.style.color = '#00FF00'
		} else if (!circulatebutton.classList.contains('second')) {
			obj.circulatechoice = false
			log(obj.circulatechoice, 'circulate')
			circulatebutton.classList.add('second')
			circulatebutton.style = 'none'
		}
	})
}

const songaudio = function() {
	let player = e('#fa-play')
	if (!player.classList.contains('fa-pause')) {
		player.classList.add('fa-pause')
		log('index', index)
	}
}

const playaudio = function(audio, musicarray, img, imgarray, o, index) {
	let album = e('.info__album')
	let song = e('.info__song')
	let artist = e('.info__artist')
	audio.src = musicarray[index]
	img.src = imgarray[index]
	album.innerHTML = o[index].name
	song.innerHTML = o[index].song
	artist.innerHTML = o[index].artist
	audio.play()
	songaudio()
}

const randomplay = function(audio, musicarray, img, imgarray, o) {
	let album = e('.info__album')
	let song = e('.info__song')
	let artist = e('.info__artist')
	let random = choice(musicarray)
	index = random
	audio.src = musicarray[random]
	img.src = imgarray[random]
	album.innerHTML = o[random].name
	song.innerHTML = o[random].song
	artist.innerHTML = o[random].artist
	audio.play()
	songaudio()
}
//右边下一首
const rightbutton = function(audio, musicarray, img, imgarray, o, obj) {
	let right = e('.fa-step-forward')
	right.addEventListener('click', function() {
		index += 1
		if (index > musicarray.length - 1) {
			index = 0
		}
		if (obj.randomchoice === true) {
			randomplay(audio, musicarray, img, imgarray, o)
		} else if (obj.circulatechoice === true) {
			audio.src = audio.src
			audio.play()
		} else {
			playaudio(audio, musicarray, img, imgarray, o, index)
			log(obj)
		}
	})
}

//左边下一首
const leftbutton = function(audio, musicarray, img, imgarray, o, obj) {
	let left = e('.fa-step-backward')
	left.addEventListener('click', function() {
		index -= 1
		if (index < 0) {
			index = musicarray.length - 1
		}
		if (obj.randomchoice === true) {
			randomplay(audio, musicarray, img, imgarray, o)
		} else if (obj.circulatechoice === true) {
		 	audio.src = audio.src
		 	audio.play()
		} else {
			playaudio(audio, musicarray, img, imgarray, o, index)
			log(obj)
		}
	})
}

//进度条
const progress = function(audio) {
	let range = e('.range')
	let outer = e('.outer')
	let dot = e('.dot')
	
	let clockId = setInterval(function() {
	let now = audio.currentTime
	let sum = audio.duration
	let progresslength = (now / sum) * 100
	range.style.width = `${progresslength}%`
	}, 1)
	outer.addEventListener('click', function(event) {
		// log(event)
		let clicklength = event.offsetX
		// log(clicklength, 'click')
		let currentTime = (clicklength / outer.offsetWidth) * audio.duration
		log(currentTime, 'afsf')
		audio.currentTime = currentTime
		range.style.width = String(currentTime) + '%'
		audio.play()
		let player = e('.fa-play')
		player.classList.add('fa-pause')
	})
}
const tuodong = function(audio) {
	let range = e('.range')
	let outer = e('.outer')
	let dot = e('.dot')
	// 初始偏移量
	let offset = 0
	let moving = false
	let max = outer.offsetWidth
	let now = audio.currentTime
	let sum = audio.duration
	let progresslength = (now / sum) * 100
	
	dot.addEventListener('mousedown', (event) => {
	    log('event', event.clientX, dot.offsetLeft, event.clientX - dot.offsetLeft)
	    // event.clientX 是浏览器窗口边缘到鼠标的距离
	    // dot.offsetLeft 是 dot 元素左上角到父元素左上角的距离
	    // offset 就是父元素距离浏览器窗口边缘的距离, 注意这个值基本上是不变的
	    offset = event.clientX - dot.offsetLeft
	    moving = true
	})
	document.addEventListener('mousemove', (event) => {
	    if (moving) {
	        // 离浏览器左侧窗口当前距离减去父元素距离浏览器左侧窗口距离就是
	        // dot 移动的距离
			// log('mousemove', event)
	        let x = event.clientX - offset
	        // dot 距离有一个范围, 即 0 < x < max
	        if (x > max) {
	            x = max
	        }
	        if (x < 0) {
	            x = 0
	        }
	        let width = (x / max) * 100
			log(width, 'width')
			progresslength = width
			// log('pro', progresslength)
	        range.style.width = String(progresslength) + '%'
			clearInterval(clockId)
	    }
	})
	document.addEventListener('mouseup', (event) => {
	    moving = false
		now = progresslength
		let clockId = setInterval(function() {
		let now = audio.currentTime
		let sum = audio.duration
		let progresslength = (now / sum) * 100
		range.style.width = `${progresslength}%`
		}, 1)
		// audio.play()
	})
}

const guasync = (callback) => {
    // 第二个参数是延迟 x ms执行程序
    // 延迟的意思是排队, 就是说延迟 x ms 把这个函数放到队伍里

    // 排队的执行顺序
    // 1. 有两个队列, 一个同步队列, 一个异步队列
    // 2. 把 callback 放在异步队列里
    // 3. 先执行完同步队列的代码
    // 4. 再执行异步队列的代码
    setTimeout(() => {
        callback()
    }, 0)
}

const bindEvents = function() {
	// 因为要绑定不少事件, 我们希望一直用同一个 audio
	// 所以就提前选好 audio, 然后作为参数传给这些函数
	let musicarray = ['audio/记忆停留-蓝心羽.flac', 'audio/四季予你-程响.flac', 'audio/周笔畅 - 最美的期待.mp3', 'audio/陈粒 - 走马 .flac', 'audio/房东的猫 - 云烟成雨.flac', 'audio/星辰大海-黄霄雲.mp3']
	let imgarray = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg']
	let o = [{name: '记忆停留', song: '蓝心羽', artist: '蓝心羽'},{name: '四季予你', song: '程响', artist: '程响'}, {name: '最美的期待', song: '周笔畅', artist: '周笔畅'}, {name: '陈粒', song: '走马', artist: '陈粒'}, {name: '房东的猫', song: '云烟成雨', artist: '房东的猫'}, {name: '黄霄雲', song: '星辰大海', artist: '黄霄雲'}]
	// let index = 0
	let obj = {
			 randomchoice: false,
			 circulatechoice: false,
		}
	let audio = e('#id-audio-player')
	let img = e('#id-img')
	bindEventToggle(audio)
	rightbutton(audio, musicarray, img, imgarray, o, obj)
	leftbutton(audio, musicarray, img, imgarray, o, obj)
	bindrandom(obj)
	bindcirculate(obj)
	bindEventEnded(audio, musicarray, img, imgarray, o, obj)
	bindEventCanplay(audio)
	progress(audio)
	tuodong(audio)
}
const __main = function() {
	// 播放
	// 暂停
	// 当前时间
	// 时长
	// 随机播放
	// 顺序播放
	// 单曲循环
	// 进度条管理
	let musicarray = [{
						
	                 }]
	guasync(bindEvents)
}
let index = 0
__main()
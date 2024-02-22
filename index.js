//Sole Developer: Aiden J

const c = document.getElementById("canvas")
const ctx = c.getContext("2d")
const img = document.getElementById("cart")
const endscreenEls = document.getElementById("endscreen-stuff")
const ytBtn = document.getElementById("link-opener")
const startBtn = document.getElementById("start")
const finalScoreDisplay = document.getElementById("final-points")

img.width = window.innerWidth/30
img.height = window.innerHeight/20
c.width = window.innerWidth
c.height = window.innerHeight

function image(x, y, w, h, src){
  var kid = document.createElement("IMG")
  kid.style.height = x
  kid.style.width = y
  kid.src = src
  ctx.drawImage(kid, x, y, w, h)
  kid.remove()
}

class Hitbox{
  constructor(x, y, w, h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  show(){
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  detectCollision(obj){
    var lowerBoundX = obj.x
    var upperBoundX = obj.x + (obj.w)
    var lowerBoundY = obj.y
    var upperBoundY = obj.y + (obj.h)
    origin = [this.x, this.y]
    if(origin[0] <= upperBoundX && lowerBoundX <= origin[0]+(this.w)){
      if(origin[1] <= upperBoundY && lowerBoundY <= origin[1]+(this.h)){
        //What to do on collision
        return true
      }
    } else if(origin[1] <= upperBoundY && lowerBoundY <= origin[1]+(this.h)){
      if(origin[0] <= upperBoundX && lowerBoundX <= origin[0]+(this.w)){
        //What to do on collision
        return true
      }
    }
  }
  wallDetection(){
    if(this.y <= 0){
      return "top"
    }else if(this.y+this.h >= c.height){
      return "bottom"
    }
    if(this.x <= 0){
      return "left"
    }else if(this.y+this.w>=c.width){
      return "right"
    }
    
  }
}

class Clothing {
  constructor(x, y, w, h, src){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.hitbox = new Hitbox(this.x, this.y, this.w, this.h)
    this.src = src
  }
  draw(){
    this.hitbox = new Hitbox(this.x, this.y, this.w, this.h)
    image(this.x, this.y, this.w, this.h, this.src)
  }
  move(a){
    this.y += a
  }
}

function remove(target, arr){
  var placeholder = []
  for(var item of arr){
    if(target==item){
      continue
    }
    placeholder.push(item)
  }
  return placeholder
}

var mouse

let points = 0

let g = 2

var srcs = [
  "images/clothing 1.jpg",
  "images/clothing 2.jpg",
  "images/clothing 3.jpg",
  "images/clothing 4.jpg",
  "images/clothing 5.jpg",
  "images/clothing 6.jpg",
  "images/clothing 7.jpg",
]

var gamestart = false

var endscreen = true

clothes = [
  new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/20, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
  new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
  new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
  new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
  new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))])
]


function main(){
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, c.width, c.height)
  console.log(ctx.fillStyle)
  if(gamestart){
    document.getElementById("score").innerHTML = points
    c.width = window.innerWidth
    c.height = window.innerHeight
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, c.width, c.height)
    for(var item of clothes){
      item.draw()
      item.move(g)
      console.log(item.hitbox.wallDetection())
      if(item.hitbox.wallDetection() == "bottom"){
        console.log("Game Over")
        gamestart = false
        endscreen = true
        endscreenEls.style.display = "flex"
        window.open("https://youtu.be/2dxJaiODs8c", "_blank")
      }
    }
  } else if(endscreen){
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, c.width, c.height)
    clothes = [
      new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
      new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
      new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
      new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]),
      new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))])
    ]
    console.log(points)
    finalScoreDisplay.innerHTML = points
  }
}

addEventListener("click", function(e){
  for(var item of clothes){
    if(mouse.detectCollision(item.hitbox)){
      clothes = remove(item, clothes)
      clothes.push(new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]))
      points++
    }
  }
})
addEventListener("mousemove", function(e){
  mouse = new Hitbox(e.clientX, e.clientY, 1, 1)
})

ytBtn.addEventListener("click", function(){
  window.open("https://youtu.be/2dxJaiODs8c", "_blank")
})

startBtn.addEventListener("click", function(){
  gamestart = true
  endscreen = false
  endscreenEls.style.display = "none"
  points = 0
})

setInterval(main, 50)
setInterval(function(){
  clothes.push(new Clothing(Math.floor(Math.random() * (c.width-window.innerWidth/4)), Math.floor(Math.random() * c.height/4), window.innerWidth/15, window.innerHeight/8, srcs[Math.floor(Math.random() * (srcs.length))]))
}, 5000)
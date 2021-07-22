  
var hero,herorunning,herosit;
var zrunning,zombie,zombieattacking;
var ground;
var bg;
var zombiegroup
var lives=3
var bullet,bulletGroup
var score=0;
var gameState="play"
var bulletImg;
var endbg;
var scrollbg;
var restart,restartImg;
var endbackground;
var zstanding
var mf
 



function preload()
{
  herorunning=loadAnimation("mr1.png","mr2.png","mr3.png","mr4.png","mr5.png","mr6.png")
  zrunning=loadAnimation("zr2.png","zr3.png","zr4.png","zr5.png","zr6.png","zr7.png","zr8.png","zr9.png","zr10.png")

  zstanding=loadAnimation("zr1.png")

 herosit=loadAnimation("ms3.png","ms4.png")

 zombieattacking=loadAnimation("za1.png","za2.png","za3.png","za4.png","za5.png","za6.png")
  
  bg=loadImage("bg.jpg")

  bulletImg=loadImage("bullet.png")

  endbg=loadImage("gameover.jpg")

  restartImg=loadImage("restart.png")

  mf=loadAnimation("mf.png")
}

function setup() 
{
  createCanvas(1500, 700);
  scrollbg=createSprite(750,350)
  scrollbg.addImage(bg)
  scrollbg.scale=3;
  scrollbg.velocityX=-3

  hero=createSprite(200,600,20,20);
  hero.addAnimation("running",herorunning)

  hero.addAnimation("sitting",herosit)
  hero.addAnimation("falling",mf)
  hero.changeAnimation("running")
  hero.scale=0.5

  restart = createSprite(750,50);
  restart.addImage(restartImg);

  endbackground=createSprite(750,350)
  endbackground.addImage(endbg)
  

  
  
  
  
  

  ground=createSprite(750,620,1500,10)
  ground.visible=false

  zombiegroup=new Group()
  bulletGroup=new Group()

}

function draw() 
{
   background(0)
  
  if(gameState==="play"){
    hero.y=600
    hero.scale=0.5
    hero.changeAnimation("running")
  
endbackground.visible=false

        if(scrollbg.x<100){
          scrollbg.x=1400
        }
  
          restart.visible=false
 
  
  

         zombies();

  
            hero.collide(ground)
  

          if(keyDown(DOWN_ARROW))
          {
            hero.changeAnimation("sitting")
          }
          if(keyDown(UP_ARROW))
          {
            hero.changeAnimation("running")
          }

 
            if(keyWentDown("space")){
            
            shootbullet()  
            }  

              for(var i=0;i<zombiegroup.length; i++){
                if(zombiegroup.get(i).isTouching(bulletGroup)){
                  zombiegroup.get(i).destroy()
                  bulletGroup.destroyEach()
                  score=score+1
                }
              }

              if(lives === 0){
                gameState="end"

                
              }
            }


if(gameState==="end"){
   endbackground.visible=true
restart.visible=true;
hero.scale=2
hero.y=650
hero.changeAnimation("falling")

 zombiegroup.setLifetimeEach(-1)
zombiegroup.setVelocityXEach(0)


scrollbg.velocityX=0



if(mousePressedOver(restart)) {
  reset();
 
}
 }
drawSprites();

  textSize(40)
  fill("yellow")
  text("SCORE : " +score,10,100)

  textSize(40)
  strokeWeight(10)
  fill("red")
  text("lives :"+lives,50,50)
}


function  zombies()
{
  if(frameCount%30 === 0)
  {
    
   zombie=createSprite(1500,550,20,20);
    
   zombie.addAnimation("running",zrunning)
   zombie.addAnimation("attacking",zombieattacking)
  

   zombie.changeAnimation("running")
   
   zombie.lifetime=300;

   
   zombie.velocityX=-(7+score*7/10)
   zombie.collide(ground) 

   zombiegroup.add(zombie)
  
   if(zombie.x <400){
   zombie.changeAnimation("attacking")
  }
  if (zombiegroup.isTouching(hero)){
    lives=lives-1
  }

  } 
}
function shootbullet(){


  bullet =createSprite(hero.x+80,hero.y,10,5)
  bullet.addImage(bulletImg)
  bullet.shapeColor="red"
  bullet.velocityX=7
  bulletGroup.add(bullet)
  bullet.scale=0.1


}
function reset(){
  gameState="play"
  //gameOver.visible= false 
  restart.visible= false
  lives=3
  zombiegroup.destroyEach()
  scrollbg.velocityX=-2
   
  score=0;
}


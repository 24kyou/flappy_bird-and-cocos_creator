window.__require=function e(t,c,i){function o(s,a){if(!c[s]){if(!t[s]){var r=s.split("/");if(r=r[r.length-1],!t[r]){var l="function"==typeof __require&&__require;if(!a&&l)return l(r,!0);if(n)return n(r,!0);throw new Error("Cannot find module '"+s+"'")}s=r}var h=c[s]={exports:{}};t[s][0].call(h.exports,function(e){return o(t[s][1][e]||e)},h,h.exports,e,t,c,i)}return c[s].exports}for(var n="function"==typeof __require&&__require,s=0;s<i.length;s++)o(i[s]);return o}({bird:[function(e,t){"use strict";cc._RF.push(t,"37291SXYrxLNIXy4twtYtLG","bird"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.time=0,this.fall=!0},onCollisionEnter:function(e){if(3!=land.gameType&&0==e.tag){console.log("\u78b0\u649e\u4e86"),land.gameType=3,this.node.stopAllActions();var t=(this.node.y-178)/650,c=cc.delayTime(.2),i=cc.moveTo(t,cc.v2(this.node.x,-255)),o=cc.rotateTo(t,-90),n=cc.spawn(i,o),s=cc.sequence(c,n);this.node.runAction(s),this.scheduleOnce(function(){land.gameOverOver()},.5)}},setRotation:function(e){if(this.node.stopActionByTag(1),"up"==e)this.node.angle=20;else if("down"==e){var t=cc.rotateTo(.6,-80);t.setTag(1),this.node.runAction(t)}},update:function(e){2==land.gameType&&0!=this.fall&&(this.time++,this.node.y=this.node.y-10*e-8*this.time*e,this.node.y<=178&&(land.gameType=3,this.scheduleOnce(function(){land.gameOverOver()},.5)),this.node.y>=720&&(land.gameType=3,this.scheduleOnce(function(){land.gameOverOver()},.5)))}}),cc._RF.pop()},{}],block:[function(e,t){"use strict";cc._RF.push(t,"1d217XE3gxI+4u0F/wrgSN3","block"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},isScore:function(){this.canScore=!0},update:function(){2==land.gameType&&(this.node.x=this.node.x-2,this.node.x<-650&&land.onBlockKilled(this.node))}}),cc._RF.pop()},{}],land:[function(e,t){"use strict";cc._RF.push(t,"d3017czlK9CDortt6417y2w","land"),cc.Class({extends:cc.Component,properties:{land_1:cc.Node,land_2:cc.Node,title:cc.Node,bird:cc.Node,bird_real:cc.Node,pre_block:cc.Prefab,score_play:cc.Label,score_gameover:cc.Label,best_score:cc.Label,gameBegin:cc.Node,gameReady:cc.Node,gameOver:cc.Node,touch_play:cc.Node,blockparent:cc.Node},onLoad:function(){window.land=this,this.land_1.x=0,this.land_2.x=this.land_1.x+this.land_1.width,this.moveAtile(),this.moveBird(),this.gameBegin.active=!0,this.gameReady.active=!1,this.gameOver.active=!1,this.bird_real.active=!1,this.setTouch(),this.gameType=0,this.numScore=0,this.score_play.string=0,this.blockPool=new cc.NodePool,this.betweenX=250,cc.director.getCollisionManager().enabled=!0},update:function(){this.runland(),2==this.gameType&&(this.pdCreateBlock(),this.addScore(),cc.log(this.node.children.length))},gameOverOver:function(){this.gameReady.active=!1,this.gameOver.active=!0,this.score_gameover.string=this.numScore;var e=cc.sys.localStorage.getItem("bestScore");null==e&&(e=0),e<this.numScore&&(e=this.numScore),this.best_score.string=e,cc.sys.localStorage.setItem("bestScore",e)},createBlock:function(e){var t=null;(t=this.blockPool.size()>0?this.blockPool.get():cc.instantiate(this.pre_block)).parent=this.blockparent,t.getComponent("block").isScore(),t.setPosition(e)},onBlockKilled:function(e){this.blockPool.put(e)},pdCreateBlock:function(){for(var e=this.blockparent.children,t=0,c=[],i=0;i<e.length;i++)e[i].getComponent("block")&&(t++,c.push(e[i].x));if(0==t){var o=330*Math.random()-440;this.createBlock(cc.v2(240,o))}if(t<5){var n=c[c.length-1]+this.betweenX;o=330*Math.random()-440,this.createBlock(cc.v2(n,o))}},AllBlockClean:function(){for(var e=this.blockparent.children,t=e.length-1;t>=0;t--)e[t].getComponent("block")&&this.onBlockKilled(e[t])},addScore:function(){for(var e=this.blockparent.children,t=e.length-1;t>=0;t--){var c=e[t].getComponent("block");c&&e[t].x<-470&&c.canScore&&(c.canScore=!1,this.numScore++,this.score_play.string=this.numScore)}},setTouch:function(){this.node.on("touchmove",function(){cc.log("touchstart ")},this),this.node.on("touchmove",function(){cc.log("touchmove")},this),this.node.on("touchend",function(){if(1==this.gameType){this.gameType=2,this.touch_play.active=!1;var e=330*Math.random()-440;this.createBlock(cc.v2(250,e))}if(2==this.gameType){this.bird_real.stopActionByTag(2);var t=this.bird_real.getComponent("bird");t.fall=!1,t.time=0,t.setRotation("up");var c=cc.moveBy(.3,cc.v2(0,50)).easing(cc.easeCubicActionOut()),i=cc.callFunc(function(){t.fall=!0,t.setRotation("down")}.bind(this)),o=cc.sequence(c,i);o.setTag(2),this.bird_real.runAction(o)}},this)},moveAtile:function(){var e=cc.moveBy(.4,cc.v2(0,10)),t=cc.moveBy(.8,cc.v2(0,-20)),c=cc.moveBy(.4,cc.v2(0,10)),i=cc.sequence(e,t,c),o=cc.repeatForever(i);this.title.runAction(o)},runland:function(){3!=this.gameType&&(this.land_1.x-=3,this.land_2.x-=3,this.land_1.x+this.land_1.width<=0&&(this.land_1.x=this.land_1.width+this.land_2.x),this.land_2.x+this.land_2.width<=0&&(this.land_2.x=this.land_2.width+this.land_1.x))},moveBird:function(){var e=cc.moveBy(.2,cc.v2(0,20)),t=cc.moveBy(.4,cc.v2(0,-40)),c=cc.moveBy(.2,cc.v2(0,20)),i=cc.sequence(e,t,c),o=cc.repeatForever(i);this.bird.runAction(o)},actBirdReal:function(){var e=cc.moveBy(.2,cc.v2(0,20)),t=cc.moveBy(.4,cc.v2(0,-40)),c=cc.moveBy(.2,cc.v2(0,20)),i=cc.sequence(e,t,c),o=cc.repeatForever(i);this.bird.runAction(o)},clickButton:function(e,t){cc.log("\u8f93\u51fa\u4e86\u6309\u94ae"),"Button_BeginGame"==t&&(this.bird_real.active=!0,this.gameType=1,this.gameBegin.active=!1,this.gameReady.active=!0,this.actBirdReal()),"btnOver"==t&&(this.AllBlockClean(),this.gameOver.active=!1,this.gameReady.active=!0,this.bird_real.stopAllActions(),this.bird_real.angle=0,this.bird_real.setPosition(cc.v2(28,320)),this.touch_play.active=!0,this.actBirdReal(),this.gameType=1,this.numScore=0,this.score_play.string=this.numScore)}}),cc._RF.pop()},{}]},{},["bird","block","land"]);
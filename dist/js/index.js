"use strict";function _defineProperty(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}var mySwiper=new Swiper(".swiper-container",_defineProperty({loop:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{},effect:"fade",fade:{crossFade:!1},autoplay:!0},"pagination",{el:".swiper-pagination",clickable:!0}));$(".swiper-pagination-bullet").hover(function(){$(this).click()});var menuTop=$(".menu-top")[0];function setScroll(e){document.body.scrollTop?document.body.scrollTop=e:document.documentElement.scrollTop=e}function getScroll(){return document.body.scrollTop+document.documentElement.scrollTop}function winAnimate(t){clearInterval(document.timer),document.timer=setInterval(function(){var e=getScroll(),i=(t-e)/10;(e+=i=0<i?Math.ceil(i):Math.floor(i))==t&&clearInterval(document.timer),setScroll(e)},10)}window.onscroll=function(){500<=getScroll()?menuTop.style.visibility="visible":menuTop.style.visibility="hidden"},menuTop.onclick=function(){winAnimate(0)},$(".slider-list-tab li").hover(function(){$(".slider-list").css({width:"716px"}),$(this).addClass("active"),$(".slider-list-content div").css({display:"none"}).eq($(this).index()).css({display:"block"}),console.log($(this).index())},function(){$(".slider-list").css({width:"200px"}),$(this).removeClass("active"),$(".slider-list-content div").css({display:"none"})});
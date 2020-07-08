var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
    //   el: '.swiper-scrollbar',
    },

    // 淡入淡出
    effect : 'fade',
    fade: {
        crossFade: false,
    },
    
  // 自动切换
    autoplay:true,//等同于以下设置
  /*autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
    },*/
    pagination :{
      el: '.swiper-pagination',
      clickable :true,
      }  
  })

  // 鼠标移入分页器切换轮播图
  $(".swiper-pagination-bullet").hover(function() {
    $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
  })



  // 楼层跳跃
  var menuTop = $('.menu-top')[0]
  window.onscroll = function(){
      if(getScroll()>=500){
        menuTop.style.visibility = "visible";
      }else{
        menuTop.style.visibility = "hidden";
      }
  }
  // 点击跳转到顶部
  menuTop.onclick = function(){
		winAnimate(0)
  }
  
  function setScroll(value){		
		if(document.body.scrollTop){
			document.body.scrollTop = value;
		}else{
			document.documentElement.scrollTop = value;
		}
	}

	function getScroll(){
		return document.body.scrollTop+document.documentElement.scrollTop;
  }
  
  function winAnimate(target){
		clearInterval(document.timer);
		document.timer = setInterval(function(){
			var current = getScroll();
			var speed = (target - current)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			current = current + speed;
			if(current==target){
				clearInterval(document.timer);
			}
			setScroll(current)
		},10)
  }
  
  // 选项卡功能

  // 鼠标移入 添加active 移出 取消
  $('.slider-list-tab li').hover(function () {
    $('.slider-list').css({width: '716px'})
    $(this).addClass('active')
    $('.slider-list-content div').css({display: 'none'}).eq($(this).index()).css({display: 'block'})
    console.log($(this).index())
  }, function () {
    $('.slider-list').css({width: '200px'})
    $(this).removeClass('active')
    $('.slider-list-content div').css({display: 'none'})
  })

  
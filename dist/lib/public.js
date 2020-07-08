//获取元素的样式:第一个参数是你要获取样式的dom节点,第二个参数是你要获取的样式名字(字符串)
function getStyle(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom)[attr]
    }else{
        return dom.currentStyle[attr]
    }
}


//根据id获取元素
function $id(id){
    return document.getElementById(id);
}


//封装好的运动函数直接调用
function move(dom,target){
    //要用定时器,先清定时器
    clearInterval(dom.timer);
    //每隔一段时间运动一段距离
    dom.timer = setInterval(function(){
        //1)获取元素当前位置
        var current = dom.offsetLeft;
        //2)设置速度
        var speed = target>current?5:-5;
        //3)计算元素下一个位置
        var next = current + speed;
        //4)有条件的定位元素
        //如果元素距离当前位置不足一步,直接到位
        if(Math.abs(target - next)<=5){
            dom.style.left = target+"px";
            clearInterval(dom.timer);
        }else{
            dom.style.left = next+"px";
        } 
        
    },1000/60)
}

//封装好的缓速运动函数直接调用
function animate(dom, target, fn) {
    clearInterval(dom.timer)
    dom.timer = setInterval(function() {
        var current = parseFloat(getStyle(dom, 'left'))
        var speed = (target - current) / 10
        var speed = target >current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10)
        current = current + speed
        if (current == target) {
            dom.style.left = target + 'px'
            clearInterval(dom.timer)
            fn && fn()
        } else {
            dom.style.left = current + 'px'
        }
    }, 1000/60)
}

// 新闻列表无缝滚动
function news(dom,target){
    //要用定时器,先清定时器
    clearInterval(dom.timer);
    //每隔一段时间运动一段距离
    dom.timer = setInterval(function(){
        var timer = null
        //1)获取元素当前位置
        var current = dom.offsetTop;
        //2)设置速度
        var speed = target>current?1:-1;
        //3)计算元素下一个位置
        var next = current + speed;
        //4)有条件的定位元素
        //如果元素距离当前位置不足一步,直接到位
        if(Math.abs(target - next)<=1){
            dom.style.top ="0px";
        }else{
            dom.style.top = next+"px";
        } 
    },1000/60)
}

// 透明度缓动 0 ~ 100
function opacityMove(dom,target,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        //1 获取元素当前透明度
        var current = parseInt(getStyle(dom,'opacity')*100);
        //2 设置速度
        var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)
        //3 计算元素下一次的透明度
        var next = current + speed;
        //4 有条件的设置透明度
        if(next==target){
            dom.style.opacity = target/100;
            dom.style.filter = "alpha(opacity="+target+")";
            clearInterval(dom.timer);
            //动画完成后执行函数fn
            fn&&fn()
        }else{
            dom.style.opacity = next/100;
            dom.style.filter = "alpha(opacity="+next+")";
        }
        
    },1000/60)
}

//缓冲--多物体
//obj  要操作的元素
//target  目标值
//attr  要操作的属性
function startMove(obj,target,attr){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current = 0;
		if( attr == "opacity" ){
			current = parseFloat( getStyle(obj,attr) ) * 100;
		}else{
			current =parseInt( getStyle(obj,attr) ) ;
		}
		var speed = (target-current)/10;
		speed = speed>0?Math.ceil(speed) : Math.floor(speed);
		if( current == target ){
			clearInterval(obj.timer);
		}else{
			if( attr == "opacity" ){
				
				obj.style[attr] = (current + speed) / 100;
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	},30)
}

//多属性同时缓动
function move4(dom,json,fn){            
    clearInterval(dom.timer)
    dom.timer = setInterval(function(){   
        var flag = true;
        for(var attr in json){
            var current = parseInt(getStyle(dom,attr));
            var target = json[attr];
            var speed = target - current>0?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            var next = current + speed;
            if(next==target){
                dom.style[attr] = target+"px";
            }else{
                dom.style[attr] = next+"px";
                flag = false;
            }
        }
        if(flag){
            clearInterval(dom.timer)
        }

        
    },1000/60)
}

function move5(dom,json,fn){            
    //要用定时器,先清定时器
    clearInterval(dom.timer)
    //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function(){   
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for(var attr in json){
            //attr.1 获取元素当前位置
            if(attr == "opacity"){
                var current = parseInt(getStyle(dom,'opacity')*100);
            }else{
                var current = parseInt(getStyle(dom,attr));
            }            
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current>0?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if(next==target){
                if(attr=="opacity"){
                    dom.style.opacity = target/100;
                    dom.style.filter = 'alpha(opacity='+target+')';
                }else{
                    dom.style[attr] = target+"px";
                }                
            }else{
                if(attr=="opacity"){
                    dom.style.opacity = next/100;
                    dom.style.filter = 'alpha(opacity='+next+')';
                }else{
                    dom.style[attr] = next+"px";
                }
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if(flag){
            clearInterval(dom.timer);
            fn&&fn();

        }

        
    },1000/60)
}

//完美版运动函数
//如果有的属性无需缓动,直接一步到位,需要你进行处理,比如zIndex
function animation(dom,json,fn){            
    //要用定时器,先清定时器
    clearInterval(dom.timer)
    //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function(){   
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for(var attr in json){
            //attr.1 获取元素当前位置
            if(attr == "opacity"){
                var current = parseInt(getStyle(dom,'opacity')*100);
            }
            else if(attr=='zIndex'){
                var current = json['zIndex'];//如果是zIndex,直接到位
            }
            else{
                var current = parseInt(getStyle(dom,attr));
            }            
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current>0?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if(next==target){
                if(attr=="opacity"){
                    dom.style.opacity = target/100;
                    dom.style.filter = 'alpha(opacity='+target+')';
                }
                else if(attr=='zIndex'){
                    dom.style.zIndex = target;
                }
                else{
                    dom.style[attr] = target+"px";
                }                
            }else{
                if(attr=="opacity"){
                    dom.style.opacity = next/100;
                    dom.style.filter = 'alpha(opacity='+next+')';
                }else{
                    dom.style[attr] = next+"px";
                }
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if(flag){
            clearInterval(dom.timer);
            fn&&fn();

        }

        
    },1000/60)
}
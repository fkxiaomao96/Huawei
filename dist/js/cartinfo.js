"use strict";$(".addCount").click(function(){$(".count").val($(".count").val()-0+1),$(".minusCount").css({color:"#777",cursor:"pointer"})}),$(".minusCount").click(function(){$(".count").val()<=1||($(".minusCount").css({color:"#777",cursor:"pointer"}),$(".count").val($(".count").val()-0-1),$(".count").val()<=1&&$(".minusCount").css({color:"#c4c4c4",cursor:"not-allowed"}))}),$(".addCart").click(function(){$.get("../interface/addwq.php",{id:12809,img:"../image/800_800_C5B3EEB31BA081CF605FE04A1118DEF332F4C3003CC60ECEmp.png",price:7988,name:"HUAWEI P40 Pro",count:$(".count").val()},function(n){1==JSON.parse(n).code?alert("添加商品成功"):alert("添加商品失败")})}),$(".count")[0].addEventListener("input",function(){/^[1-9]\d*$/.test(this.value)||(this.value=null)}),$(".enterCart").click(function(){location.href="../pages/cart.html"});
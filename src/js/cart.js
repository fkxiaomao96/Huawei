
// 进入后根据数据库修改数量
$(document).ready(function(){
    $.get('../interface/showlist.php',function(data){
        var json = JSON.parse(data);
        if(json.code==0){
            // alert('购物车里面空空的')
        }else{
            // alert('你买了的东西是'+JSON.stringify(json.data))
            $('.count').val(json.data[0]['product_num'])
            if($('.count').val() > 1 ) {
                $('.minusCount').css({
                    color: '#777',
                    cursor: 'pointer'
                })
            }
        }
    })

})

// 商品数量+1
$('.addCount').click(()=>{
    $('.count').val($('.count').val() - 0 + 1)
    $('.minusCount').css({
        color: '#777',
        cursor: 'pointer'
    })
    var piece = $('.piece')[0].innerText.split('.')[0].slice(1)
    $('.total').text('￥' + piece * $('.count').val() + '.00')
    if ($('.count').val() == 1 ) {
        $('.minusCount').css({
            color: '#c4c4c4',
            cursor: 'not-allowed'})
    }
    $.get('../interface/updatewq.php',{
        id: 12809,
        type:'add',
    },function(data){
        var json = JSON.parse(data);
        if(json.code==1){
            alert('商品数量增加成功')
        }
    })
})

// 商品数量-1
$('.minusCount').click(()=>{
    if($('.count').val() <= 1 ) {
        return
    }
    $('.minusCount').css({
        color: '#777',
        cursor: 'pointer'})
        $('.count').val($('.count').val() - 0 - 1)
        if($('.count').val() <= 1 ) {
            $('.minusCount').css({
                color: '#c4c4c4',
                cursor: 'not-allowed'
            })
        }
        var piece = $('.piece')[0].innerText.split('.')[0].slice(1)
        $('.total').text('￥' + piece * $('.count').val() + '.00')
        if($('.count').val() <= 0){
            //如果商品数量剪完以后小于等于0,说明想删除商品,调用删除接口:./interface/delwq.php?id=10000
        }else{
            $.get('../interface/updatewq.php?id=30000',{
                type:"cut"
            },function(data){
                var json = JSON.parse(data);
                if(json.code==1){
                    alert('商品数量减少成功')
                }
            })
        }      
})

// 计算小计内容
$('.count')[0].addEventListener('input', function () {
    var piece = $('.piece')[0].innerText.split('.')[0].slice(1)
    $('.total').text('￥' + piece * $('.count').val() + '.00')
})

// 删除商品
$('.removePro')[0].addEventListener('click', function () {
    $.get('../interface/delwq.php',{
        id: 12809
    },function(data){
        var json = JSON.parse(data);
        if(json.code==1){
            alert('商品删除成功')
            $('.product-list>div:nth-of-type(1)').remove()
        }
    })
})

// 限制表单内容
$('.count')[0].addEventListener('input', function () {
    var flag = false
    flag = /^[1-9]\d*$/.test(this.value)
    if (!flag) {
        this.value = null
    }
    // $.get('../interface/addwq.php', {
    //     id: 12809,
    //     img: "../image/800_800_C5B3EEB31BA081CF605FE04A1118DEF332F4C3003CC60ECEmp.png",
    //     price: 7988.00,
    //     name: "HUAWEI P40 Pro",
    //     count: $('.count').val()
    // }, function(data) {
    //     var json = JSON.parse(data);
    //     if (json.code ==1 ) {
    //         alert('添加商品成功')
    //     } else {
    //         alert('添加商品失败')
    //     }
    // })
})

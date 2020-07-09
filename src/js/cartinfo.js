
// 商品数量+1
$('.addCount').click(()=>{
    $('.count').val($('.count').val() - 0 + 1)
    $('.minusCount').css({
        color: '#777',
        cursor: 'pointer'
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
                cursor: 'not-allowed'})
                return
        }
})


// 提交购物车
    $('.addCart').click(function(){
    $.get('../interface/addwq.php', {
        id: 12809,
        img: "../image/800_800_C5B3EEB31BA081CF605FE04A1118DEF332F4C3003CC60ECEmp.png",
        price: 7988.00,
        name: "HUAWEI P40 Pro",
        count: $('.count').val()
    }, function(data) {
        var json = JSON.parse(data);
        if (json.code ==1 ) {
            alert('添加商品成功')
        } else {
            alert('添加商品失败')
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


// 点击进入购物车实现跳转
    $('.enterCart').click(function () {
        location.href = '../pages/cart.html'
    })


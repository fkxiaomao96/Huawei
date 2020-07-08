
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
    $('.minusCount').css({
        color: '#777',
        cursor: 'pointer'})
        $('.count').val($('.count').val() - 0 - 1)
        if($('.count').val() == 1 ) {
            $('.minusCount').css({
                color: '#c4c4c4',
                cursor: 'not-allowed'})
                return
        }
})

// 提交购物车
    $('.addCart').click(function(){
    console.log(1)
    $.get('../interface/addwq.php', {
        id: 30000,
        img: "./img/chabei.jpg",
        price: 7988,
        name: "茶具",
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


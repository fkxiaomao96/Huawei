<?php
    //处理中文乱码
    header('content-type:text/html;charset=utf-8');

    // 获取
    $name = $_POST['username'];
    $pw = $_POST['password']; 
    // 去数据库查询,是否有一个账号的用户名和密码与你传递过来的一致
    $link = mysqli_connect('localhost', 'root', 'root', 'shop');
    $sql = "SELECT * FROM `user` WHERE `username` = '$name' AND `password` = '$pw'";
    $res = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($res);
    // 判断
    if($row){
        setcookie('user', $name, 0, '/Task/Huawei/src');
        header('location:../pages/cart.html');
    }else{
        //5 如果没有,则登陆失败,重新注册
        header('location:../pages/register.html');
    }
    mysqli_close($link)   
?>
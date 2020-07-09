<?php
header("content-type:text/html;charset = utf-8");

// 打印前端传递过来的数据
print_r($_GET);
// 获取用户名和密码
$name = $_GET['username'];
$pw = $_GET['password'];
print_r($name);
print_r($pw);
// 把数据存到数据库里面
$link = mysqli_connect('localhost', 'root', 'root', 'shop');
//把用户名和密码插入到数据里面,增(INSERT)
$sql = "INSERT INTO `user` (`username`, `password`) VALUES ('$name','$pw')";
$res = mysqli_query($link, $sql);
// 把存储是否成功的结果返回给浏览器
if ($res) {
    header ('location:../pages/login.html');
} else {
    header ('location:./register.html');
}
mysqli_close($link)
?>
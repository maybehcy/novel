var pic = document.querySelector('.angel');
document.addEventListener('mousemove', function(e) {
    // 1. mousemove只要我们鼠标移动1px 就会触发这个事件
    // console.log(1);
    // 2.核心原理： 每次鼠标移动，我们都会获得最新的鼠标坐标， 把这个x和y坐标做为图片的top和left 值就可以移动图片
    var x = e.pageX;
    var y = e.pageY;
    console.log('x坐标是' + x, 'y坐标是' + y);
    //3 . 千万不要忘记给left 和top 添加px 单位
    pic.style.left = x + 1 + 'px';
    pic.style.top = y + 1 + 'px';
});
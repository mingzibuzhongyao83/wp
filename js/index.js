let $ = require('jquery');

$(function () {
    $('.getdata').on('click',function(){
        $.ajax({
            type:'get',
            url:'/pros',
            success(res){
                console.log('res==>',res)
            }
        })
    })
})
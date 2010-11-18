$(document).ready(function(){

    bindLinksClick();
    //menu    
    $(".menu_li").mouseover(function(){
        $(this).addClass('hover');
        var menu = $(this).find('.candy_menu');
        candy_menu_show(menu);
        
    }).mouseout(function(){
        $(this).removeClass('hover');
        var menu = $(this).find('.candy_menu');
        candy_menu_hide(menu);
    });

    addFancyBox('1');
    addCommentDelete();

});

function linksClick()
{
    for(var i=0,c=$(this);i<10&&c.attr('tagName') != undefined; c=c.parent(),i++)
    {
        if(c.attr('stat'))
        {
            set_cookie({fan_f:c.attr('stat')},1);
            return;
        }
    }
    set_cookie({fan_f:''},0);
}

function bindLinksClick()
{
    $("a").live('click',linksClick);
    $("area").live('click',linksClick);
}

function productEvent(id,t)
{
    $.get("/product/ajax/event.fan",{id:id,t:t});
}

function set_cookie(c,op){
    var t=new Date();
    if(op)
    {
        t.setTime(t.getTime()+(3*1000));
    }
    else
    {
        t.setTime(t.getTime()-1);
    }
    var b="; expires="+t.toGMTString();
    for(var d in c){
        document.cookie = d+"="+c[d]+b+"; path=/"
    }
}

function addCommentDelete() {
    $(".wall .list_message li").mouseover(function(){
        $(this).addClass('hover');
    }).mouseout(function(){
        $(this).removeClass('hover');
    });
}

function candy_menu_show(obj) {
    var img = obj.parent().find('img');
    img.attr('src', 'http://misc.fandongxi.com/img/arrow_default_hover.png');
    obj.parent().addClass('hoveron');
    obj.show();
}


function candy_menu_hide(obj) {
    var img =$(obj).parent().find('img');
    img.attr('src', 'http://misc.fandongxi.com/img/arrow_default.png');
    $(obj).parent().removeClass('hoveron');
    $(obj).hide();
}



function empty_input(obj, text) {
    $(obj).addClass('on');
    if ($(obj).val() == text) {
        $(obj).val('');
    }
}

function fill_input(obj, text) {
    $(obj).removeClass('on');
    if ($(obj).val() == '') {
        $(obj).val(text);
    }

}



function FormatItemList() {

    $('#imagebar li').mouseover(function(){
        var id = $(this).attr('bigimage');
        $('.image_all img').hide();
        $('#'+id).show();
        $('#imagebar li').removeClass('on');
        $(this).addClass('on');
    });
}


function addFancyBox() {

    $("a.fancybox").fancybox({
        'transitionIn'  :   'elastic',
        'transitionOut' :   'fade',
        'speedIn'       :   200,
        'speedOut'      :   200,
        'overlayShow'   :   true,
        'hideOnOverlayClick' : true,
        'scrolling'     :   'no',
        'centerOnScroll':   true
    });

}



/********************
 * 取窗口滚动条高度
******************/
function getScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

/********************
* 取窗口可视范围的高度
 *******************/
function getClientHeight()
{
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight)
    {
        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    else
    {
        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}

/********************
* 取文档内容实际高度
*******************/
function getScrollHeight()
{
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}

function testisbottom(){
    if (getScrollTop()+getClientHeight()==getScrollHeight()){
        return "1";
    }else{
        return "0";
    }
}



//*
//增加喜欢一个品牌
//*/

function addLoveBrand(id) {
    var html = '我喜欢<a href="javascript:void(0);" onclick="removeLoveBrand('+id+')" class="delete">x</a>';
    $.get('/brand/ajax/add.fan?id='+id,function(data){

        $('#lovebrand').html(html);
        var o = $('#numbers .fans .num').html();
        var newo = Number(o);
        newo += 1;
        $('#numbers .fans .num').html(newo);

        if(data.firsttime == 0) {
            $('body').append('<a id="bodyfancybox" href="#firsttimetip" style="display:none"></a><div style="display:none"><div id="firsttimetip" class="onetips"><h2>小贴示</h2><div class="content">“我喜欢”一个品牌后，该品牌将展示在“我的翻翻”中，你也会从“新鲜事”中获得关于该品牌的最新资讯<div class="bt"><button class="bs" onclick="$.fancybox.close();">知道啦</button></div></div></div>')
            $("a#bodyfancybox").fancybox({
                'transitionIn'  :   'fade',
                'transitionOut' :   'fade',
                'speedIn'       :   200,
                'speedOut'      :   200,
                'overlayShow'   :   true,
                'hideOnOverlayClick' : true,
                'scrolling'     :   'no',
                'centerOnScroll':   true
            });
            $("a#bodyfancybox").click();
        }else {

            location.reload();
        }
        
    },'json') ;
}


function removeLoveBrand(id) {
    var html = '<a class="buttonbs" href="javascript:void(0);" onclick="addLoveBrand('+id+');">我喜欢</a>';
    $.get('/brand/ajax/remove.fan?id='+id,function(data){
        $('#lovebrand').html(html);
        var o = $('#numbers .fans .num').html();
        var newo = Number(o);
        newo -= 1;
        $('#numbers .fans .num').html(newo);
        location.reload(); 
    }) ;
}

/*brand按照letter查询*/
function letter(obj) {
    $('.fashion_brand_all .content').hide();
    $('#azbrand').fadeIn();

    $(obj).parent().parent().find('li').removeClass('on');
    $(obj).parent().addClass('on');
    $(obj).blur();
    return false;
}
/*brand按照area查询*/
function area(obj) {
    $('.fashion_brand_all .content').hide();
    $('#areabrand').fadeIn();

    $(obj).parent().parent().find('li').removeClass('on');
    $(obj).parent().addClass('on');
    $(obj).blur();
    return false;
}



function searchbrand() {

    var makeonebrand = function (brandone) {
        link = '/brand/view.fan?id='+brandone.id;
        h = '';
        h += '<div class="brand_li"><div class="listone"><div class="block_img">';
        h += '<div class="image_box"><a href="'+link+'"><img alt="'+brandone.name+'" src="'+brandone.image['50']+'"></a></div>';
        h += '<div class="friend_text"><span class="name_text"><a href="'+link+'">'+brandone.name+'</a></span></div></div></div></div>';
        return h;
    }

    var　kw    = $('#search_brand_input').val();
    if (kw != "") {
        $('.fashion_brand_all .content').hide();
        $('#loading').show();
        $.post('/brand/ajax/search.fan', {
            'kw':kw
        }, function(data){
            if (data == '') {
                $('#search_brand').html('<div class="fdx_no">没有符合条件的品牌</div>');
                $('#loading').hide();
                $('#search_brand').show();
            }else {
                html = '';
                for (i in data) {
                    html += makeonebrand(data[i]);
                }
                $('#search_brand').html(html);
                $('#loading').hide();
                $('#search_brand').show();
            }
        }, 'json')
    }


}


function redirect(url) {
    window.location = url;
}

function ajaxlogin(callback) {

    var string = arguments[1] || '';
    var reflash = arguments[2] || '1';


    var username = $('#ajax_username').val();
    var password = $('#ajax_password').val();
    if($("#ajax_remember").attr('checked')) {
        var remember = 1;
    }else {
        var remember = 0;
    }

    if (username == "") {
        $('#ajax_username_error').html('用户名不能为空');
        return false;
    }

    if (password == "") {
        $('#ajax_password_error').html('密码不能为空');
        return false;
    }

    $.post('/user/ajaxlogin.fan',{
        'username':username,
        'password':password,
        'remember':remember
    },function(data){

        if(data.result == "error") {
            $('#ajax_password_error').html('用户名或密码不正确');
        }else if(data.result == "ok") {

   

            if (string != 'null' && callback != 'null') {
                var array = string.split("|");
                if (array.length == 3) {
                    callback(array[0],array[1],array[2]);
                }else if (array.length == 2) {
                    callback(array[0],array[1]);
                }else if (array.length == 1) {
                    callback(array[0]);
                }
            }

            $.fancybox.close();
            
            if (reflash == '1') {
                setTimeout(function(){
                    location.reload();
                },1000);
            }
        }
        
    },'json');

}


//*
//增加attention一个user
//*/

function attentionUser(id) {

    var html = '<span id="removeAttention">已关注<a href="javascript:void(0);" onclick="removeAttentionUser('+id+')" class="delete" id="removeAttentionUser">x</a></span>';
    $.get('/user/ajax/attention.fan?id='+id,function(data){
        $('#attentionUser').parent().prepend(html);
        $('#attentionUser').remove();
        location.reload();

    }) ;
}


function removeAttentionUser(id) {
    var html = '<a href="javascript:void(0);" class="buttonbs" onclick="attentionUser('+id+');" id="attentionUser">关注他</a>';
    $.get('/user/ajax/removeattention.fan?id='+id,function(data){
        $('#removeAttention').parent().prepend(html);
        $('#removeAttention').remove();
        location.reload();
    }) ;
}

function changeimg(url,obj) {
    $('.single_product .image img').attr('src',url);
    $(obj).parent().parent().find('li').removeClass('on');
    $(obj).parent().addClass('on');
}


function favproduct(id,type) {


    var from = arguments[2] || 'list';

    html = "";
    if (type == 'like') {
        html = '我喜欢';
    }else if (type == 'have') {
        html = '我有';
    }

    if (from == 'single') {
        if (type == 'like') {
            html1 = '<a href="javascript:void(0);" onclick="removeproduct('+id+',\'single\')" class="delete"><img src="http://misc.fandongxi.com/img/favproduct/like_big.png" /></a><a class="fancybox fl" href="/product/ajax/comment.fan?id='+id+'"><img src="http://misc.fandongxi.com/img/comment_big.gif"></a>';
        }else if (type == 'have') {
            html1 = '<a href="javascript:void(0);" onclick="removeproduct('+id+',\'single\')" class="delete"><img src="http://misc.fandongxi.com/img/favproduct/have_big.png" /></a><a class="fancybox fl" href="/product/ajax/comment.fan?id='+id+'"><img src="http://misc.fandongxi.com/img/comment_big.gif"></a>';
        }
        
        html2 = html + '<a href="javascript:void(0);" onclick="removeproduct('+id+')" class="delete">x</a>';
    }else {
        html += '<a href="javascript:void(0);" onclick="removeproduct('+id+')" class="delete">x</a>';
    }
    $.get('/product/ajax/'+type+'.fan?id='+id,function(data){

        if (from == 'single') {
            $('.ctrl').html(html1);
            $('#item'+id).find('.collection').html(html2);
        }else {
            $('#item'+id).find('.collection').html(html);
        }
        
        if(data.firsttime == 0 && from != 'reg') {
            $('body').append('<a id="bodyfancybox" href="#firsttimetip" style="display:none"></a><div style="display:none"><div id="firsttimetip" class="onetips"><h2>小贴示</h2><div class="content">点击“我想买”或“我有”后，该商品将出现在你的“鞋柜”中，翻东西将根据你的喜好为你推荐商品。<div class="bt"><button class="bs" onclick="$.fancybox.close();">知道啦</button></div></div></div>')
            $("a#bodyfancybox").fancybox({
                'transitionIn'  :   'fade',
                'transitionOut' :   'fade',
                'speedIn'       :   200,
                'speedOut'      :   200,
                'overlayShow'   :   true,
                'hideOnOverlayClick' : true,
                'scrolling'     :   'no',
                'centerOnScroll':   true
            });
            $("a#bodyfancybox").click();
        }

    },'json') ;
}

function removeproduct(id) {
    var from = arguments[1] || 'list';
    if (from == 'single') {
        html = '<a onclick="favproduct('+id+',\'have\',\'single\')" href="/product/fav.fan?id='+id+'&type=have"  class="fancybox"><img src="http://misc.fandongxi.com/img/have_big.gif"/></a><a onclick="favproduct('+id+',\'like\',\'single\')" href="javascript:void(0);"><img src="http://misc.fandongxi.com/img/like_big.gif"/></a><a class="fancybox fl" href="/product/ajax/comment.fan?id='+id+'"><img src="http://misc.fandongxi.com/img/comment_big.gif"></a>';
    }else {
        html = '<div class="collection"><a onclick="favproduct('+id+',\'like\')" href="javascript:void(0);"><img src="http://misc.fandongxi.com/img/like.gif"/></a><a onclick="favproduct('+id+',\'have\')"  href="/product/fav.fan?id='+id+'&type=have" class="fancybox"><img src="http://misc.fandongxi.com/img/have.gif"/></a></div>';
    }
    $.get('/product/ajax/remove.fan?id='+id,function(data){

        if (from == 'single') {
            $('.ctrl').html(html);
        }else {
            $('#item'+id).find('.collection').html(html);
        }

        addFancyBox(1);
    }) ;
}
/*载入更多FEED*/
function loadmorefeed(feedtype,stype) {
    var offset = Number($('#offset').val());
    var limit  = $('#limit').val();
    var url='/feed/html.fan?type=getfeed&offset='+offset+'&limit='+limit+'&feedtype='+feedtype+'&stype='+stype;

    offset += 20;
    $('#offset').val(offset);

    $.get(url,function(data){
        if (data != "") {
            $('#feedlist').append(data);
        }else {
            $('.pager').html('没有更多的新鲜事');
        }
        //addFancyBox('1');
    });
    
}

function openfeed(obj,id) {
    var feed_wapper  = $(obj).parent();
    var feed_loading = '<div class="loading"><img src="http://misc.fandongxi.com/img/loading.gif" /></div>';

    feed_wapper.html(feed_loading);
    
    $.get('/feed/ajax/expand.fan', {'id':id}, function(data) {
        feed_wapper.html(data.html);
    }, 'json')
    
}

function addfeedfav(id) {
    $('#feed'+id).find('.fav').addClass('on');
    $.get('/feed/ajax/addfav.fan?id='+id,function(data){
        if (data.result == 'ok') {
            var js = "removefeedfav("+id+")";
            var newclick = eval("(function(){"+js+"});");
            $('#feed'+id).find('.fav').unbind('click');
            $('#feed'+id).find('.fav').removeAttr('onclick').click(newclick);
            $('#feed'+id).find('.fav').blur();
        }
    },'json') ;
}

function removefeedfav(id) {
    $('#feed'+id).find('.fav').removeClass('on');
    $.get('/feed/ajax/removefav.fan?id='+id,function(data){
        if (data.result == 'ok') {
            var js = "addfeedfav("+id+")";
            var newclick = eval("(function(){"+js+"});");
            $('#feed'+id).find('.fav').unbind('click');
            $('#feed'+id).find('.fav').removeAttr('onclick').click(newclick);
            $('#feed'+id).find('.fav').blur();
        }
    },'json') ;
}


function close_rm(id) {
    $('#feed'+id).find('.closerm').hide();
    $('#feed'+id).find('.openrm').show();
    $('#feed'+id).find('.block_rm').slideUp();

}

function get_rm(id,count) {
    $('#feed'+id).find('.openrm').hide();
    $('#feed'+id).find('.closerm').show();
    $('#feed'+id).find('.block_rm').slideDown();
    var loading = $('#feed'+id).find('.block_rm .loading').html();
    if (loading != "" && loading != null) {

        if (count > 0) {
            $.get('/feed/ajax/getcommentlist.fan?id='+id+'&count='+count,function(data){
                var html = '';
                for(i in data['data']) {
                    html += singlefeedcomment(data['data'][i]);
                }
                $('#feed'+id).find('.block_rm .loading').remove();
                if(html != ""){
                    $('#feed'+id).find('.block_rm .commentlist').html(html);
                }

            },'json');
        }else {
            $('#feed'+id).find('.block_rm .loading').remove();

        }
    }
}

function load_rm(id,count) {
    var loadinghtml = '<dl class="loading"><img src="http://misc.fandongxi.com/img/loadingAnimation.gif" /></dl>';
    $('#feed'+id).find('.commentlist').html(loadinghtml);
    $.get('/feed/ajax/getcommentlist.fan?id='+id+'&count='+count+'&from=load',function(data){
        var html = '';
        for(i in data['data']) {
            html += singlefeedcomment(data['data'][i]);
        }
        $('#feed'+id).find('.block_rm .commentlist').after(html);
        $('.block_rm .commentlist').hide();

    },'json');
}


function send_rm(id) {
    var feedone = $('#feed'+id);
    var to_user_id = $('#feed'+id).find('.to_user_id').val();
    var message = $.trim($('#rmmessage'+id).val());
    if(message != "" && message != null) {
        $('#rmmessage'+id).addClass('lock');
        $.get('/feed/ajax/sendcomment.fan',{
            'id':id,
            'to_user_id':to_user_id,
            'message':message
        },function(data){
            var html = '';
            html = singlefeedcomment(data);
            $('#feed'+id).find('.block_rm .replybox').before(html);
            var comment_count = $('#feed'+id).find('#comment_count').html();
            comment_count = Number(comment_count) + 1;
            $('#feed'+id).find('#comment_count').html(comment_count);
            $('#rmmessage'+id).val('');
            $('#rmmessage'+id).removeClass('lock');
            $('#rmmessage'+id).blur();

            $('#feed'+id).find('.to_user_id').val('');
        },'json');
    }
}
function remove_rm(obj,id,feed_id) {
    if(id != "") {
        $.get('/feed/ajax/removerm.fan?rm_id='+id+'&id='+feed_id,function(data){
            $(obj).parent().parent().fadeOut();
            $(obj).parent().parent().remove();
            var comment_count = $('#feed'+feed_id).find('#comment_count').html();
            comment_count = Number(comment_count) - 1;
            $('#feed'+feed_id).find('#comment_count').html(comment_count);
        },'json');
    }
}

function remove_feed(id) {
    if(id != "") {
        $.get('/feed/ajax/removefeed.fan?id='+id,function(data){
            $('#feed'+id).fadeOut();
        },'json');
    }
}

function singlefeedcomment(dataone) {
    var htmlone = '';
    htmlone += '<dl class="clearfix"><dt>';
    htmlone += '<a href="'+dataone.user.url+'">'+dataone.user.nickname+'</a>';
    if (dataone.is_close == '1') {
        htmlone += '<em>'+dataone.time+'</em><a class="delete" href="javascript:void(0);" onclick="remove_rm(this,'+dataone.id+','+dataone.feed_id+');">X</a></dt>';
    }else{
        htmlone += '<em>'+dataone.time+'</em></dt>';
    }
    htmlone += '<dd>'+dataone.content;
    if (dataone.is_reply == '1') {
        htmlone += '<a onclick="set_to_user_id(this,'+dataone.user.user_id+',\''+dataone.user.nickname+'\');" class="replyman" href="javascript:void(0);">回复</a></dd>';
    }else {
        htmlone += '</dd>';
    }

    htmlone += '<dd class="pic"><a href="'+dataone.user.url+'"><img src="'+dataone.user.icon_50+'"/></a>';
    htmlone += '</dd></dl>';

    return htmlone;

}

function resend_feed() {
    var id = $('#resend_feed_id').val();
    var message = $('#resend_message').val();

    var success = '<div class="fancy_success"><div class="icon"></div><div class="content"><h1>推荐成功</h1><p>3秒钟后本窗口自动关闭。</p></div></div>';

    if(id != "") {
        $.get('/feed/ajax/resend.fan?id='+id+'&message='+message,function(data){
            $('#fancybox-inner').html(success);
            setTimeout("$.fancybox.close();",2000);

            var forward_count = $('#feed'+id).find('#forward_count').html();
            forward_count = Number(forward_count) + 1;
            $('#feed'+id).find('#forward_count').html(forward_count);

        },'json');
    }

}

function send_suggest() {
    var id = $('#id').val();
    var type = $('#type').val();
    var note = $('#note').val();

    if(note == '附上一句推荐语吧') {
        note = '';
    }

    var success = '<div class="fancy_success"><div class="icon"></div><div class="content"><h1>推荐成功</h1><p>3秒钟后本窗口自动关闭。</p></div></div>';

    if(id != "" && type != "") {
        $.post('/suggest/ajax/add.fan',{
            'id':id,
            'type':type,
            'note':note
        },function(data){
            $('#fancybox-inner').html(success);
            setTimeout("$.fancybox.close();",2000);

            if (data.update == 0) {
                var count = $('#suggestcount').html();
                count = Number(count) + 1;
                $('#suggestcount').html(count);
            }

        },'json');
    }

}

function send_favnote() {
    var id = $('#id').val();
    var type = $('#type').val();
    var note = $.trim($('#note').val());

    if (note == '说说你对它的评价或感觉') {
        note = '';
    }

    var success = '<div class="fancy_success"><div class="icon"></div><div class="content"><h1>收藏成功</h1><p>3秒钟后本窗口自动关闭。</p></div></div>';

    if(id != "" && type != "") {
        $.post('/product/ajax/addcomment.fan',{
            'id':id,
            'type':type,
            'message':note
        },function(data){
            $('#fancybox-inner').html(success);
             setTimeout('$.fancybox.close();',1000);
        },'json');
    }

}

function send_productcomnent() {
    var id = $('#id').val();
    var note = $.trim($('#note').val());

    if (note == '说说你对它的评价或感觉') {
        note = '';
    }

    var success = '<div class="fancy_success"><div class="icon"></div><div class="content"><h1>评论成功</h1><p>3秒钟后本窗口自动关闭。</p></div></div>';

    if(id && note) {
        $.post('/product/ajax/addcomment.fan',{
            'id':id,
            'note':note
        },function(data){
            $('#fancybox-inner').html(success);
             setTimeout('$.fancybox.close();',1000);
        },'json');
    }
}

function boardcount(number,begintime) {

    var endtime = Math.round(new Date().getTime()/1000);

    number     = Number(number);
    begintime  = Number(begintime);
    endtime    = Number(endtime);

    number += 3 * (endtime-begintime);

    var count = new Array();
    
    while (number > 10) {
        yu =  number % 10;
        number = (number-yu) / 10;
        count.push(yu);
    }
    count.push(number);
    count.reverse();


    html = "";
    for (i in count) {
        html += '<span class="n'+count[i]+'"><b>'+count[i]+'</b></span>';
    }
    $('#boardcount').html(html);

}

//清除提醒
function cleannotice(obj,type) {
    $.get('/notice/clean.fan?type='+type,function(data){
        if (data == 'ok') {
            $(obj).parent().fadeOut();
            var count = $('.block_notice li:visible').length;
            if (count == 1) {
                $('.block_notice').fadeOut();
            }

        }
    }) ;
}



function lastproductnext() {
    var number = $('.block_lastproduct ul li').length;
    var yu = number % 3;
    if (yu > 0) {
        var times  = (number-yu)/3 + 1;
    }else {
        var times  = (number-yu)/3;
    }

    currect = $('#lastproductdown').attr('currect');
    currect = Number(currect);
    if(currect != times) {

        currect += 1;
        $('#lastproductdown').attr('currect',currect);


        if (currect == times) {
            $('#lastproductdown').addClass('dis');
        }

        if (currect > 1) {
            $('#lastproductup').removeClass('dis');
        }

        var top =  0 - (currect-1)*480;
        $('.block_lastproduct .content ul').animate({
            marginTop:top+'px'
            },'slow');
    }
}


function lastproductprev() {
    var number = $('.block_lastproduct ul li').length;
    var yu = number % 3;
    if (yu > 0) {
        var times  = (number-yu)/3 + 1;
    }else {
        var times  = (number-yu)/3;
    }



    currect = $('#lastproductdown').attr('currect');
    currect = Number(currect);
    if(currect != 1) {

        currect -= 1;
        $('#lastproductdown').attr('currect',currect);


        if (currect == 1) {
            $('#lastproductup').addClass('dis');
        }

        if (currect < times) {
            $('#lastproductdown').removeClass('dis');
        }

        var top =  0 - (currect-1)*480;
        $('.block_lastproduct .content ul').animate({
            marginTop:top+'px'
            },'slow');
    }
}


function addAjaxLastProduct(id) {
    $.get('/product/ajax/addajaxlastproduct.fan?id='+id,function(data){
        if(data != '') {
            $('#ajaxlastproducts').html(data);
        }
    });
}

function feedController() {

    $('form.feed_reply_form').submit(function(){
        var feed_id = $(this).attr('feed_id');
        eval('send_rm('+feed_id+')');
        return false;
    });

    $('.comment_content').focus(function() {

        $(this).next().removeClass('hide');
        $(this).addClass('select');

        var obj = $(this);
        $(this).unbind('keypress');
        $(this).keypress(function(event){
            if(event.which == 13 && event.ctrlKey) {
                var feed_id = obj.parent().attr('feed_id');
                eval('send_rm('+feed_id+')');
            }
        });

    }).blur(function() {
        text = $(this).val();
        if (text == '添加回复' || text == "") {
            fill_input(this,'添加回复');
            $(this).removeClass('select');
            $(this).next().addClass('hide');
        }
    });
}

function messageController() {

    $('form.message_post').submit(function(){
        sendMessage();
        return false;
    });
    
    $('#postmessage_content').focus(function() {
        $(this).unbind('keypress');
        $(this).keypress(function(event){
            if(event.which == 13 && event.ctrlKey) {
                sendMessage();
            }
        });

    });
}

function setcomment_to_user_id(obj,id,username) {	
    var text = '回复'+username+':', j_content = $('#postmessage_content');

	$('#postmessage_to_user_id').val(id);
        j_content.val(text)
		.blur()
		.focus()
		.parents(".message_hidden_box")
		.show();
	setCaretTo(j_content[0],text.length);
	
    $.scrollTo($('.postmessage'),800);
}

function showMessageContent(){
    $.scrollTo($('.postmessage'),800);
    $('.message_hidden_box').show();
    $('#postmessage_content').val(' ');
    $('#postmessage_to_user_id').val('');
    setCaretTo($('#postmessage_content')[0],0);
}

/*
 * leave message
 *
 **/
function sendMessage() {
    
    var message = $('#postmessage_content').val();
    var type    = $('#postmessage_type').val();
    var id      = $('#postmessage_id').val();
    var url     = $('#postmessage_url').val();
    var posturl = $('#postmessage_posturl').val();
    var to_user_id    = $('#postmessage_to_user_id').val();
    var sort    = $('#postmessage_sort').val();

    var singleMessage = function (data) {
        var link = '/user/view.fan?id=' + data['user']['user_id'];
        var html = ['<li class="clearfix"><div class="image"><a href="',link,'"><img src="',
                    data['user']['icon_50'],
                    '"/></a></div><div class="username">',data['time'],' / <a href="',link,'">',
                    data['user']['nickname'],
                    '</a></div><div class="content">',
                    data['message'],
                    '<div class="controller"><a href="javascript:void(0);" class="delete" onclick="remove_message(\'',
                    data['remove'],'\',',data['id'],',this);">删除</a></div></div></li>'].join("");
        return html;
    }

    if(type == "user")
    {
        if(message.length > 250)
        {
            alert('留言字数不能超过250个字');
            return;
        }
    }
    if(message != "" && message != null) {
        $('#postmessage_content').addClass('lock');
        $.post(posturl,{
            'message':message,
            'id':id,
            'to_user_id':to_user_id
        },function(data){
            $('#postmessage_content').removeClass('lock');
            if (url) {
                window.location.href = url ;
            }else {
                $('#postmessage_content').val('');
                html = singleMessage(data);
                if (sort == 'ASC') {
                    $('.list_message').append(html);
                    $('.list_message li').last().yellowFade();
                }else {
                    $('.list_message').prepend(html);
                    $('.list_message li').first().yellowFade();
                }
                addCommentDelete();
            }

            $('#postmessage_to_user_id').val('');
        },'json');

    }

}


function remove_message(url,id,obj) {
    $.post(url,{
        'id':id
    },function(data){
        if(data.result == 'ok') {
            $(obj).parent().parent().parent().fadeOut();
        }
    },'json');
}

function gototop() {

    $('body').append('<div id="go_top"><img src="http://misc.fandongxi.com/img/goto_top.gif" /></div>');

    var obj=$("#go_top");
    var flag=false;
    var onlyOne=true;
    var clearTime=null;
    var layoutWidth=960;

    //alert( Math.floor(($(window).width()-layoutWidth)/2)+layoutWidth+5 );
    //var parentDiv = "frame_page_wrapper";
    //var parentLeft = $(document.body)[0].clientWidth-$('#'+parentDiv).offset().left-19;

    //layoutWidth = parentLeft;
    //alert( $(document.body)[0].clientWidth );

    obj.css("left",Math.floor(($(window).width()-layoutWidth)/2)+layoutWidth+5+"px");
    //obj.css("left",layoutWidth+"px");
    if($.browser.msie && $.browser.version=='6.0'){
        obj.css("position","absolute");
    }
    else{
        obj.css("top",$(window).height()-200+"px");
    }

    obj.click(function(){
        $(window).scrollTop(0);
    });
    $(window).scroll(function(){


        if($(window).scrollTop()==0){
            obj.fadeOut();
            flag=true;
        }else if(flag==true && $(window).scrollTop() > 200){
            flag=false;
            obj.fadeIn();
        }else if(onlyOne==true){
            obj.fadeIn();
            onlyOne=false;
        }
        if($.browser.msie && $.browser.version=='6.0'){
            obj.css('top',$(window).height()+$(window).scrollTop()-150+'px');
            if( clearTime!=null ) {
                clearTimeout(clearTime);
                obj.css("display","none");
            }
            if($(window).scrollTop()>0)
                clearTime=setTimeout("$('#go_top').fadeIn('10');",100);
        }
    });

}

function set_to_user_id(obj,id,username) {
    var wapper = $(obj).parent().parent().parent();
    var text = '回复'+username+':';
    wapper.find('.to_user_id').val(id);
    wapper.find('.comment_content').val(text);
    wapper.find('.comment_content').blur();
    wapper.find('.comment_content').focus();
    setCaretTo(wapper.find('.comment_content')[0],text.length);
}

function showmorechoose(obj) {
    $(obj).parent().parent().parent().find('.hidechoose').css('display','block');
    $(obj).parent().addClass('choosebthide');
    $(obj).parent().next().removeClass('choosebthide');
    $(obj).parent().next().addClass('choosebtshow');;
}

function hidemorechoose(obj) {
    $(obj).parent().parent().parent().find('.hidechoose').css('display','none');
    $(obj).parent().addClass('choosebthide');
    $(obj).parent().prev().removeClass('choosebthide');
    $(obj).parent().prev().addClass('choosebtshow');
}
function showmoreshopchoose(obj) {
    $('.shopless').css('display','none');
    $('.shopmore').css('display','block');
    $(obj).parent().addClass('choosebthide');
    $(obj).parent().next().removeClass('choosebthide');
    $(obj).parent().next().addClass('choosebtshow');;
}

function hidemoreshopchoose(obj) {
    $('.shopmore').css('display','none');
    $('.shopless').css('display','block');
    $(obj).parent().addClass('choosebthide');
    $(obj).parent().prev().removeClass('choosebthide');
    $(obj).parent().prev().addClass('choosebtshow');
}

function showmorebrand(obj) {
    $('#bestbrand').hide();
    $('#choosebrandall').show();
    $(obj).parent().addClass('choosebthide');
    $(obj).parent().next().removeClass('choosebthide');
    $(obj).parent().next().addClass('choosebtshow');;

}
function hidemorebrand(obj) {
    $('#choosebrandall').hide();
    $('#bestbrand').show();
    $(obj).parent().addClass('choosebthide');
    $(obj).parent().prev().removeClass('choosebthide');
    $(obj).parent().prev().addClass('choosebtshow');
}

function setCaretTo(obj, pos) {
    if(obj.createTextRange) {
        /* Create a TextRange, set the internal pointer to
           a specified position and show the cursor at this
           position
        */
        var range = obj.createTextRange();
        range.move("character", pos);
        range.select();
    } else if(obj.selectionStart) {
        /* Gecko is a little bit shorter on that. Simply
           focus the element and set the selection to a
           specified position
        */
        obj.focus();
        obj.setSelectionRange(pos, pos);
    }
}

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        for (var key2 in params[key]) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key+"["+key2+"]");
            hiddenField.setAttribute("value", params[key][key2]);

            //console.log(params[key][key2]);

            form.appendChild(hiddenField);

        }
    }

    document.body.appendChild(form);    // Not entirely sure if this is necessary
    form.submit();
}





var Photo = function(init) {

        this.photoId     = init.photoId;
        this.editMode    = init.editMode;
        this.tipMore     = init.tipMore;


        this.Tips        = Array();
        this.container   = $('#'+init.photoId+' .photo_container');
        this.tag_wapper  = $('#'+init.photoId+' .tag_wapper');
        this.tip_wapper  = $('#'+init.photoId+' .tip_wapper');
        this.notice      = $('#'+init.photoId+' .notice');
        this.image       = $('#'+init.photoId+' .photo_container img');


        this.height      = parseInt(this.image.css('height'));
        this.width       = parseInt(this.image.css('width'));
        this.left        = parseInt(this.image.css('left'));
        this.top         = parseInt(this.image.css('top'));

        this.container.css('width',this.width);

        var photoObj        = this;

        //初始化的监听事件
        if(this.editMode) {

            var photojqueryobj = $('#'+photoObj.photoId);
            //add click
            $('#'+photoObj.photoId+' img').click(function(e){
                mouse = getMousePosition(e,photojqueryobj);
                photoObj.add_tip({'x':mouse.x,'y':mouse.y});
                photoObj.format_tips();
                photoObj.show_tags();
            });

            $('#'+photoObj.photoId+' .edit_notice a').click(function(e){
                photoObj.add_tip({'x':80,'y':80});
                photoObj.format_tips();
                photoObj.show_tags();
            });

            //如果没有TIPS
            if (this.get_tipcount() == 0) {
                var photojqueryobj = $('#'+this.photoId);
                $('#'+this.photoId+' img').mouseover(function (e) {
                        mouse = getMousePosition(e,photojqueryobj);
                        photoObj.change_notice_position(mouse.x,mouse.y);
                        photoObj.show_notice();
                }).mousemove(function (e) {
                        mouse = getMousePosition(e,photojqueryobj);
                        photoObj.change_notice_position(mouse.x,mouse.y);
                }).mouseout(function (e) {
                        photoObj.hide_notice();
                });
            }

        }else {

            //add hover
            $('.photo_container').hover(
                function () {
                    photoObj.show_tags();
                },
                function () {
                    photoObj.hide_tags();
            });
        }

}

Photo.prototype = {
    'get_tipcount'  :   function()  {
        count = this.tag_wapper.children().length;
        return count;
    },


    'add_tip'   :   function(tipinit) {

        //如果不是在EDIT中被程序调用的点
        if (!tipinit.fromedit) {
            //检查是否之前的为空如果为空,删除以前的tip
            if (this.tip_wapper.find('.phototip:visible').length > 0) {
                var phototiplast = this.tip_wapper.find('.phototip:visible').last();
                if (snapTipEmpty(phototiplast)) {
                    //
                    phototiplast.find('a.photoremove').click();
                    return;
                }else {
                    phototiplast.hide();
                    return;
                }
            }
        }

        count = this.get_tipcount() + 1;
        tip = new PhotoTip({
            'tipMore' : this.tipMore,
            'editMode': this.editMode,
            'photoId' : this.photoId,
            'x'       : tipinit.x,
            'y'       : tipinit.y,
            'num'     : count,
            'realnum' : this.Tips.length
        });
        this.Tips.push(tip);
        tip.add_tag();

        if (this.editMode){
            tip.add_tip(tipinit);
            this.notice.hide();
            $('#'+this.photoId+' img').unbind("mouseover mousemove mouseout");
            tip.show_note(this.Tips.length-1);
        }
    },

    'listen'    :   function()  {

        var photoObj = this;

        if(this.editMode) {

               

         }else {

                //绑定TAG HOVER事件
                $('.phototag').hover(function(){
                    DomID = $(this).attr('dom_id');
                    $('.photoinfo').css('background','none');
                    $('#photoinfo'+DomID).css('background','yellow');
                },function(){
                    DomID = $(this).attr('dom_id');
                    $('.photoinfo').css('background','none');
                });

                //绑定info hover事件
                $('.photoinfo').hover(function(){
                    DomID = $(this).attr('dom_id');
                    $(this).css('background','yellow');
                    $('.phototag').hide();
                    $('#'+photoObj.photoId+'phototag'+DomID).show();
                },function(){
                    $(this).css('background','none');
                    DomID = $(this).attr('dom_id');
                    $('.phototag').hide();
                });


         }

    },

    'format_tips'  :   function() {


        var photoObj        =   this;

        if(this.editMode) {

                num =   this.get_tipcount();
                //console.log('num:'+num);

                if (num == 0) {
                    //当没有TAG的时候增加NOTICE的显示
                    //提示点击后可以增加TAG
                    var photojqueryobj = $('#'+this.photoId);
                    $('#'+this.photoId+' img').mouseover(function (e) {
                        mouse = getMousePosition(e,photojqueryobj);
                        photoObj.change_notice_position(mouse.x,mouse.y);
                        photoObj.show_notice();
                    }).mousemove(function (e) {
                        mouse = getMousePosition(e,photojqueryobj);
                        photoObj.change_notice_position(mouse.x,mouse.y);
                    }).mouseout(function (e) {
                        photoObj.hide_notice();
                    });
                }else {
                    //当TAG数量超过1个的时候,取消NOTICE的提示
                    this.notice.hide();
                    $('#'+this.photoId+' img').unbind("mouseover mousemove mouseout");
                }


         }else {

                //绑定TAG HOVER事件
                $('.phototag').hover(function(){
                    DomID = $(this).attr('dom_id');
                    $('.photoinfo').css('background','none');
                    $('#photoinfo'+DomID).css('background','yellow');
                },function(){
                    DomID = $(this).attr('dom_id');
                    $('.photoinfo').css('background','none');
                });

                //绑定info hover事件
                $('.photoinfo').hover(function(){
                    DomID = $(this).attr('dom_id');
                    $(this).css('background','yellow');
                    $('.phototag').hide();
                    $('#'+photoObj.photoId+'phototag'+DomID).show();
                },function(){
                    $(this).css('background','none');
                    DomID = $(this).attr('dom_id');
                    $('.phototag').hide();
                });


         }

    },


    'show_tags' : function() {
        $('.phototag').show();
    },

    'hide_tags' : function() {
        $('.phototag').hide();
    },

    'show_tag'  :   function(id)    {
        $('.phototag').hide();
        $('#'+this.photoId+'phototag'+id).fadeIn();
    },

    'remove_tip':   function(id)   {
        this.Tips[id]['close'] = true;
    },

    'update_tags':  function(id)    {
    },

    'show_notice':  function()   {
        this.notice.fadeIn('fast');
    },

    'change_notice_position':   function(x,y)   {
         x += 10;
         y += 10;
         this.notice.css('left',x).css('top',y);
    },

    'hide_notice':  function()   {
        this.notice.fadeOut('fast');
    }
};


var PhotoTip = function(init) {
    this.tipMore        = init.tipMore;
    this.photoId        = init.photoId;
    this.x              = init.x;
    this.y              = init.y;
    this.num            = init.num;
    this.realnum        = init.realnum;
    this.editMode       = init.editMode;
    this.tag_offset     = 15;
    this.tip_offset     = 10;
    this.close          = false;
    this.tag_wapper     = $('#'+init.photoId+' .tag_wapper');
    this.tip_wapper     = $('#'+init.photoId+' .tip_wapper');
    this.info_wapper    = $('#'+init.photoId+' .photoinfo_wapper');


    this.photoNum       = this.photoId.substr(4);
}
PhotoTip.prototype = {

    'add_tag'   :   function()  {

        //num是指这个tag的显示的序号
        //length是指这个TAG在数组中的位置
        x = Number(this.x) - this.tag_offset;
        y = Number(this.y) - this.tag_offset;

        var tag_html = '<div id="'+this.photoId+'phototag'+this.realnum+'" dom_id="'+this.realnum+'" class="phototag" style="left: '+x+'px; top: '+y+'px;">'+this.num+'</div>';
        this.tag_wapper.append(tag_html);
        this.tagElement = $('#'+this.photoId+'phototag'+this.realnum);

        if(this.editMode) {
            this.tagElement.show();
        }

    },
    'add_tip'   :   function()   {

        var init  = arguments[0] || null;

        //num是指这个tag的显示的序号
        //length是指这个TAG在数组中的位置
        x = Number(this.x) + this.tip_offset;
        y = Number(this.y) + this.tip_offset;

        var tip_html = this._getHtml(x, y, this.realnum);
        this.tip_wapper.append(tip_html);

        this.tipElement = $('#'+this.photoId+'phototip'+this.realnum);
        this.tipDeleteElement = $('#'+this.photoId+'remove'+this.realnum);
        this.brandInputElement = $('#'+this.photoId+'autoCompleteBrand'+this.realnum);
        this.shopInputElement = $('#'+this.photoId+'autoCompleteShop'+this.realnum);
        this.styleInputElement = $('#'+this.photoId+'autoCompleteStyle'+this.realnum);
        this.tagXElement = $('#'+this.photoId+'phototag'+this.realnum+'x');
        this.tagYElement = $('#'+this.photoId+'phototag'+this.realnum+'y');

        this.tip_event();

        if(this.editMode) {
            snapTipInit(this.photoId+'phototip'+this.realnum,init);
        }



    },
    'tip_event'  :   function()  {

        var tipObj  =   this;

        //增加MOUSE OVER事件
        this.tagElement.mouseover(function(){
             DomID = $(this).attr('dom_id');
             tipObj.show_note(DomID);
        });

        //增加鼠标拖动事件
        this.tagdrag();

        //增加删除事件绑定
        this.tipDeleteElement.click(function(){

             DomID = $(this).attr('dom_id');
             var id = Number(DomID)-1;

             tipObj.remove();

             tipObj.tipElement.fadeOut();
             tipObj.tipElement.remove();
             tipObj.tagElement.remove();

             tipObj.balance_tags();

        });

        //增加BRAND自动完成事件绑定
        var AutoCompleteBrandObj = new AutoComplete(this.brandInputElement,'brand');
        this.brandInputElement.keyup(function(e){
            AutoCompleteBrandObj.check(e);
            return false;
        });

        //增加Shop自动完成事件绑定
        var AutoCompleteShopObj = new AutoComplete(this.shopInputElement,'shop');
        this.shopInputElement.keyup(function(e){
            AutoCompleteShopObj.check(e);
            return false;
        });

        //增加Style自动完成事件绑定
        this.styleInputElement.click(function(e){
            autoCompleteTagShow(this);
        });
    },

    'tagdrag'   :   function()   {

        var draging     = false;
        var startLeft,startTop;
        var startX,startY;
        var number      = this.num;
        var tag         = this.tagElement;
        var tip         = this.tipElement;
        var img_wapper  = $('#'+this.photoId+' .photo_container')
        var img         = $('#'+this.photoId+' .photo_container img');
        var maxX        =   parseInt(img.css('width')) - 30;
        var maxY        =   parseInt(img.css('height'))- 30;
        var photoId     =   this.photoId;

        var tagxE       = this.tagXElement;
        var tagyE       = this.tagYElement;


        tag.css('cursor','move');
        tag.mousedown(function(event){
            var offset = $(this).offset();
            startLeft = offset.left;
            startTop = offset.top;
            startX = event.clientX;
            startY = event.clientY;

            var tipoffset = tip.offset();
            tipoffsetleft = tipoffset.left;
            tipoffsettop  = tipoffset.top;

            draging = true;
            tag.addClass('moving');

        }).mousemove(function(event){
            if (draging == false)return;
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

            var deltaX = event.clientX - startX;
            var deltaY = event.clientY - startY;
            var left = startLeft + deltaX;
            var top  = startTop + deltaY;

            var tipleft = tipoffsetleft + deltaX;
            var tiptop  = tipoffsettop  + deltaY;

            objleft  = Math.floor(img_wapper.offset().left);
            objtop   = Math.floor(img_wapper.offset().top);
            left    -= objleft;
            top     -= objtop;
            tipleft -= objleft;
            tiptop  -= objtop;
            

            if (left < 0) {
                left = 0;
                tipleft = 25;
            }else if( left >= maxX) {
                left = maxX;
                tipleft = maxX+25;
            }

            if (top < 0) {
                top = 0;
                tiptop = 25;
            }else if(top >= maxY) {
                top    = maxY;
                tiptop = maxY+25;
            }

            tag.css('left',left+'px').css('top',top+'px');
            tip.css('left',tipleft+'px').css('top',tiptop+'px');

            tagxE.val(left+15);
            tagyE.val(top+15);


        }).mouseup(function(event){
            draging = false;
            tag.removeClass('moving');
        });

    },
    '_getHtml'  :   function(x,y,length) {

        var categoryArray = {
            '衣服' : false,
            '长袖T恤' : true,
            '短袖T恤' : true,
            '衬衫/罩衫' : true,
            '开衫' : true,
            '毛衣' : true,
            '外套/夹克/大衣' : true,
            '羽绒服' : true,
            '连衣裙' : true,
            '半身裙' : true,
            '短裤(含七分、九分裤)' : true,
            '牛仔裤' : true,
            '长裤' : true,
            '吊带/内衣' : true,
            '鞋子': false,
            '单鞋' : true,
            '凉鞋' : true,
            '靴子' : true,
            '运动鞋' : true,
            '皮鞋' : true,
            '帆布鞋' : true,
            '休闲鞋' : true,
            '配饰': false,
            '包包' : true,
            '腰带' : true,
            '领带' : true,
            '手表' : true,
            '眼镜' : true,
            '袜子' : true,
            '帽子/手套/围巾' : true,
            '首饰' : true,
            '头饰' : true,
            '其他' : true
        }
        var ch = "",h = "";
        for (word in categoryArray) {
            if (categoryArray[word]) {
                h = '<option value="'+word+'">'+word+'</option>';
            }else {
                h = '<optgroup label="'+word+'"></optgroup>';
            }
            ch += h;
        }
        

        html = '<div id="'+this.photoId+'phototip'+length+'" class="phototip" style="left: '+x+'px; top: '+y+'px;">';
        html += '<input type="hidden" name="snap['+this.photoNum+'][tag]['+length+'][x]" value="'+x+'" id="'+this.photoId+'phototag'+length+'x">';
        html += '<input type="hidden" name="snap['+this.photoNum+'][tag]['+length+'][y]" value="'+y+'" id="'+this.photoId+'phototag'+length+'y">';
        html += '<div class="input_row"><select name="snap['+this.photoNum+'][tag]['+length+'][category]" autocomplete="off" class="category"><option value="">类别</option>'+ch+'</select><input value="品牌" name="snap['+this.photoNum+'][tag]['+length+'][brand]" onclick="empty_input(this,\'品牌\');" onblur="fill_input(this,\'品牌\')" class="bs brand" autoComplete="off" id="'+this.photoId+'autoCompleteBrand'+length+'"/></div>';
        if (this.tipMore) {
            html += '<div class="more_input"><div class="input_row"><input value="在哪买的(商城名称或宝贝网址)" name="snap['+this.photoNum+'][tag]['+length+'][shop]" onclick="empty_input(this,\'在哪买的(商城名称或宝贝网址)\');" onblur="fill_input(this,\'在哪买的(商城名称或宝贝网址)\')" class="bs shop" autoComplete="off" id="'+this.photoId+'autoCompleteShop'+length+'"/></div>';
        }else {
            html += '<div class="more_input" style="display:none;"><div class="input_row"><input value="在哪买的(商城名称或宝贝网址)" name="snap['+this.photoNum+'][tag]['+length+'][shop]" onclick="empty_input(this,\'在哪买的(商城名称或宝贝网址)\');" onblur="fill_input(this,\'在哪买的(商城名称或宝贝网址)\')" class="bs shop" autoComplete="off" id="'+this.photoId+'autoCompleteShop'+length+'"/></div>';
        }
        html += '<div class="input_row"><input value="价格" name="snap['+this.photoNum+'][tag]['+length+'][price]" onclick="empty_input(this,\'价格\');" onblur="fill_input(this,\'价格\')" class="bs price" /><input value="风格" name="snap['+this.photoNum+'][tag]['+length+'][style]" onclick="empty_input(this,\'风格\');" onblur="fill_input(this,\'风格\')" class="bs style" autoComplete="off" id="'+this.photoId+'autoCompleteStyle'+length+'" readonly=true/></div>';
        html += '<div class="input_row"><input value="说说你对它的评价或感觉吧" name="snap['+this.photoNum+'][tag]['+length+'][note]" onclick="empty_input(this,\'说说你对它的评价或感觉吧\');" onblur="fill_input(this,\'说说你对它的评价或感觉吧\')" class="bs note" /></div></div>';

        if (this.tipMore) {
            html += '<div class="ctrl"><a href="javascript:void(0);" onclick="snap_more(this);" class="fr more" style="display:none">展开▼</a><a href="javascript:void(0);" onclick="snap_less(this);" class="fr less" style="display:block">收起▲</a><a href="javascript:void(0);" onclick="$(this).parents(\'.phototip\').hide();" class="buttonbs">完成</a><a href="javascript:void(0);" class="photoremove" id="'+this.photoId+'remove'+length+'" dom_id="'+length+'">删除这个标签</a></div></div>';
        }else {
            html += '<div class="ctrl"><a href="javascript:void(0);" onclick="snap_more(this);" class="fr more" style="display:block">展开▼</a><a href="javascript:void(0);" onclick="snap_less(this);" class="fr less" style="display:none">收起▲</a><a href="javascript:void(0);" onclick="$(this).parents(\'.phototip\').hide();" class="buttonbs">完成</a><a href="javascript:void(0);" class="photoremove" id="'+this.photoId+'remove'+length+'" dom_id="'+length+'">删除这个标签</a></div></div>';
        }
        return html;
    },
    'completedrag'    :   function(number,left,top)  {
        this.x = left + this.tag_offset;
        this.y = top  + this.tag_offset;
    },

    'show_note' :   function(id)  {
        if ($('#'+this.photoId+'phototip'+id).is(":hidden")){
            $('.phototip').hide();
            $('#'+this.photoId+'phototip'+id).fadeIn('fast');
        }

    },

    'remove'    :   function () {
        this.close = true;
    },

    'balance_tags'  :   function() {
        $('#'+this.photoId+' .phototag').each(function(index) {
            $(this).html(index + 1);
        });
    }
}

function snapTipEmpty(wapper) {
  brand = $.trim(wapper.find('input.brand').val());
  if (brand == '品牌') {
      brand = "";
  }
  shop = $.trim(wapper.find('input.shop').val());
  if (shop == '在哪买的(商城名称或宝贝网址)') {
      shop = '';
  }
  price = $.trim(wapper.find('input.price').val());
  if (price == '价格') {
      price = '';
  }
  style = $.trim(wapper.find('input.style').val());
  if (style == '风格') {
      style = '';
  }
  note = $.trim(wapper.find('input.note').val());
  if (note == '说说你对它的评价或感觉吧') {
      note = '';
  }
  
  category = $.trim(wapper.find('.category').val());

  if (category == "" && brand == "" && shop == "" && price == "" && note == "" && style == "") {
    return true;
  }
  return false;
}

function snapinit(init) {
    eval('photo'+init.id+' = new Photo({"photoId":"snap'+init.id+'","editMode":'+init.editMode+',"tipMore":'+init.tipMore+'});');
}

function snapTipInit(id,init) {
    
    var brand = $('#'+id).find('input.brand');
    var shop = $('#'+id).find('input.shop');
    var price = $('#'+id).find('input.price');
    var style = $('#'+id).find('input.style');
    var note = $('#'+id).find('input.note');
    var category = $('#'+id).find('select.category');

    if (init.brand && init.brand != "") {
        brand.val(init.brand);
    }
    if (init.shop && init.shop != "") {
        shop.val(init.shop);
    }
    if (init.price && init.price != "") {
        price.val(init.price);
    }
    if (init.style && init.style != "") {
        style.val(init.style);
    }
    if (init.note && init.note != "") {
        note.val(init.note);
    }
    if (init.category && init.category != "") {
        category.attr('value',init.category);
    }

    $('#'+id).find('.more_input').show();
    $('#'+id).find('.less').show();
    $('#'+id).find('.more').hide();
    $('#'+id).hide();
}

function snap_more(obj) {
    $(obj).parent().parent().find('.more_input').show();
    $(obj).hide();
    $(obj).next().show();
}
function snap_less(obj) {
    $(obj).parent().parent().find('.more_input').hide();
    $(obj).hide();
    $(obj).prev().show();
}


function addPhotoCss()  {
    $('.photo_wapper img').each(function(){
        var offsetArray = Array();
        offsetArray['left']   = $(this).offset().left;
        offsetArray['top']    = $(this).offset().top;
        offsetArray['height'] =  $(this).height();
        offsetArray['width']  =  $(this).width();
        $(this).css('left',offsetArray['left']).css('top',offsetArray['top']).css('width',offsetArray['width']).css('height',offsetArray['height']);
    });
}

function getMousePosition(e) {

    //选填的obj,填写后得到的是鼠标位置相对于这个OBJ的偏移量
    var obj     = arguments[1] || null;
    var mouse   = Array();

    mouse.x = e.pageX;
    mouse.y = e.pageY;

    if (obj) {
        mouse.x   =   mouse.x - Math.floor(obj.offset().left);
        mouse.y   =   mouse.y - Math.floor(obj.offset().top);
    }
    return mouse;

}

function send_upload_message() {
    var message = $('#upload_m_input').val();
    var gethtml = function(info) {
        return'<div class="snap_success_notice">'+info+'</div>';
    }

    if (message == "" || message == "说说shopping那些事儿" || parseInt($('#charCount').html()) < 0) {
        return false;
    }

    send_upload_message.rmmessage = function() {
        $('.snap_success_notice').slideUp('fast');
        setTimeout("$('.snap_success_notice').remove();",500);
    }

    var success = function() {
        var success_message = '我说：'+message;
        var html = gethtml(success_message);
        $('div.snap_upload').after(html);
        $('.snap_success_notice').slideDown('fast');
        setTimeout("send_upload_message.rmmessage()",5000);
        $('#charCount').html('140').hide();
        $('#message_bt_after').hide();
        $('#message_bt_before').show();
        $('.upload_message').slideUp('fast');

    }

    $('#upload_m_input').addClass('lock');
    if (message && message != "" && message != "说说shopping那些事儿" && send_upload_message.lock != 1) {
        send_upload_message.lock = 1;
        $.post('/user/ajax/say.fan',{'content':message},function(data){
            success();
            $('#upload_m_input').val('说说shopping那些事儿');
            $('#upload_m_input').removeClass('lock');
            send_upload_message.lock = 0;
        },'json');
    }
};

/*
 * 圈宝贝的自动补全部分代码
 *
 **/
var AutoComplete = function (obj,type){

    this.type      = type;
    this.input     = $(obj);


    if (type == 'brand' && AutoComplete.brands == undefined) {
        $.getJSON("/tools/ajax/brand_json.fan",function(json){
            AutoComplete.brands = json;
         });
    }
    if (type == 'shop' && AutoComplete.shops == undefined) {
        $.getJSON("/tools/ajax/shop_json.fan",function(json){
            AutoComplete.shops = json
        });
    }
    var orgObj = this;
    //监听input的输入
    this.input.keyup(function(e){
        orgObj.processKey(e,orgObj);
    });

    
    this.input.blur(function(){
        setTimeout("$('.suggest_div').hide();",100);
    });

}


AutoComplete.prototype = {
    'check'    :  function(e) {
        var checklist = Array();
        if (this.type == 'brand') {
            var dictionary = AutoComplete.brands;
        }else if(this.type == 'shop') {
            var dictionary = AutoComplete.shops;
        }else {
            return;
        }

        checklist = this._check(dictionary);
        var position = this._getPostion();
        var orgObj = this;

        if (checklist.length > 0 && !/27$|38$|40$|32$|9$|13$/.test(e.keyCode)) {
            //找到了对应的提示
            this.input.next('.suggest_div').remove();
            var html = this._html(checklist,position);
            this.input.after(html);
            this.setResult();

            this.result.children('li')
            .mouseover(function() {
                orgObj.result.children('li').removeClass('on');
                $(this).addClass('on');
            }).click(function(){
                orgObj.input.val($(this).html());
                orgObj.removeAutoComplete();
            });

        }else if (!/27$|38$|40$|32$|9$|13$/.test(e.keyCode)) {
            //提示为空
            this.removeAutoComplete();
        }
    },
    'processKey'  :   function (e,comObj) {

        if (!comObj.result) {
            comObj.result = $(comObj.input).next('.suggest_div');
        }
        // handling up/down/escape requires results to be visible
        // handling enter/tab requires that AND a result to be selected
        if (/27$|38$|40$/.test(e.keyCode)) {
            switch(e.keyCode) {

                case 38: // up
                    comObj.prevResult();
                    break;

                case 40: // down
                    comObj.nextResult();
                    break;

                case 27: //	escape
                    comObj.result.hide();
                    break;

            }
            return false;

        }else if (/32$|9$|13$/.test(e.keyCode) && comObj.getCurrentResult()) {
            comObj.selectCurrentResult();
            return false;
        }
    },
    'setResult' :   function()  {
        this.result = this.input.next('.suggest_div');
    },
    'removeAutoComplete'    :   function()   {
        this.setResult();
        if (this.result) {
            this.result.remove();
        }
    },
    'selectCurrentResult'   :   function()  {
        var current = this.getCurrentResult();
        if (current.length > 0) {
            var value   = current.html();
            this.input.val(value);
            this.removeAutoComplete();
        }
    },
    'getCurrentResult'      :   function()  {
        this.setResult();
        if (this.result) {
            return this.result.children('li.on');
        }
    },
    'nextResult'            :   function() {
        var currentResult = this.getCurrentResult();
        if (currentResult.length > 0) {
            currentResult
            .removeClass('on')
            .next()
            .addClass('on');
        }else {
            this.result.children('li').first().addClass('on');
        }

    },
    'prevResult'            :   function() {
        var currentResult = this.getCurrentResult();
        if (currentResult.length > 0) {
            currentResult
            .removeClass('on')
            .prev()
            .addClass('on');
        }else {
            this.result.children('li').last().addClass('on');
        }
        return false;
    },
    '_check'    :   function(dictionary)   {
        
        var kw = this.input.val().toLowerCase();
        var list = Array();
        if (kw.length > 0) {
            for (i in dictionary) {
                name = dictionary[i].toLowerCase();
                num = name.indexOf(kw);
                if (num == 0) {//找到并且是开头字母
                    if (list.length < 10) {
                        list.push(dictionary[i]);
                    }
                }else if(num == -1) { //没有找到
                }else{
                }
            }
        }
        return list;
    },
    '_html'     :   function(list,position) {
        position.y += 28;
        var html = '<ul class="suggest_div" style="left:'+position.x+'px;top:'+position.y+'px;width:'+position.width+'px;">';
        for (i in list) {
            html += '<li>'+list[i]+'</li>';
        }
        html += '</ul>';
        return html;
    },
    '_getPostion'   :   function()  {
        var parent = this.input.parents('.phototip');
        var position = Array();
        var inputLeft = Math.floor(this.input.offset().left);
        var inputTop  = Math.floor(this.input.offset().top);
        var width     = Math.floor(this.input.width())+8;

        var tipLeft       = Math.floor(parent.offset().left);
        var tipTop        = Math.floor(parent.offset().top);

        position.x = inputLeft-tipLeft;
        position.y = inputTop-tipTop;
        position.width = width;
        return position;
    }
}

autoCompleteTagShow = function (obj)  {

    var defineword = {};
    var definewordobj = {};

    autoCompleteTagShow.remove = function(id) {
        $('#'+id).next('.suggest_tag').remove();
    }

    var _setDefineWord = function(list) {
        for (i in list) {
            var a = list[i].toLowerCase();
            defineword[a] = true;
        }
    }


    var _listen = function(obj) {
        var input_val = $.trim($(obj).val()).toLowerCase().split(" "),wordlist={};
        $.each(input_val,function(k,word){
           if(word!=""){
               if (defineword[word]) {
                   wordlist[word] = true;
               }
           }
       });
       display(obj,wordlist);
    }

    var display = function(obj,wordlist){
        $(obj).next('.suggest_tag').children('.suggest_tag_one').removeClass('dis');
        $(obj).next('.suggest_tag').children('.suggest_tag_one').each(function(j){
            var h=$(this).text().toLowerCase();
            if(wordlist[h]){
                $(this).addClass('dis');
            }
        });
        $(obj).focus();

        if (autoCompleteTagShow.timeMachine != undefined) {
            clearTimeout(autoCompleteTagShow.timeMachine);
        }
    };

    var _getAutoCompleteTagHtml = function (obj,styleList) {
        var position = getAutoCompleteTagPosition(obj);
        position.width -= 10;
        position.y += 28;
        var html = "<div class='suggest_div clearfix suggest_tag' style='left:"+position.x+"px;top:"+position.y+"px;width:"+position.width+"px;'>";
        for (i in styleList) {
            html += '<a class="suggest_tag_one" href="javascript:void(0);"><span>'+styleList[i]+'</span></a>';
        }
        html += "</div>";
        return html;
    }

    var getAutoCompleteTagPosition = function (obj) {
        var parent = $(obj).parents('.phototip');
        var position = Array();
        var inputLeft = Math.floor($(obj).offset().left);
        var inputTop  = Math.floor($(obj).offset().top);
        var width     = Math.floor($(obj).width())+8;
        var tipLeft       = Math.floor(parent.offset().left);
        var tipTop        = Math.floor(parent.offset().top);
        position.x = inputLeft-tipLeft;
        position.y = inputTop-tipTop;
        position.width = width;
        return position;
    }

    var _autoCompleteTagShow = function (obj,styleList) {
        html = _getAutoCompleteTagHtml(obj,styleList);
        if ($(obj).next('.suggest_div').length > 0) {
            $(obj).next('.suggest_div').remove();
        }
        $(obj).after(html).next('.suggest_div').hide().slideDown('fast');

        _setDefineWord(styleList);

        //取消上次绑定事件
        $(obj).next('.suggest_div').children('.suggest_tag_one').unbind('click');
        $(obj).next('.suggest_div').unbind('click')
        $(obj).unbind('keyup blur');

        $(obj).next('.suggest_div').children('.suggest_tag_one').click(function(){
            var c = $(this).find('span').html();
            if ($(obj).val() == '风格') {
                var v = c;
            }else if($(obj).val().indexOf(c) != -1){

                var k=$.trim($(obj).val()).split(" ");
                k = $.grep(k,function(q,p){
                    if(q.toLowerCase()==c){
                        return false;
                    }else {
                        return true;
                    }});
                var v = k.join(" ");

            }else {
                var v = $(obj).val()+' '+c;
            }
            $(obj).val(v);
            _listen(obj);
        });



        $(obj).keyup(function(e){
            _listen(obj);
        });

        $(obj).blur(function() {
            var id  = $(this).attr('id');
            autoCompleteTagShow.timeMachine = setTimeout("autoCompleteTagShow.remove('"+id+"');",200);
        });



    }


    if (AutoComplete.style == undefined) {
        $.getJSON("/tools/ajax/style_json.fan",function(json){
            AutoComplete.style = json;
            _autoCompleteTagShow(obj,AutoComplete.style);
        });
    }else {
        _autoCompleteTagShow(obj,AutoComplete.style);
    }
    
    _listen(obj);

    
}




charCountEvent = function (init)  {
    charCountObj  = {};
    charCountObj.inputElement = $('#'+init.input);
    charCountObj.countElement = $('#'+init.count);
    charCountObj.countMax     = init.max;

    charCountObj.count =   function() {
        
        var input = charCountObj.inputElement.val();

        //预期计数：中文2字节，英文1字节
        var inputLenth = 0;
        //循环计数
        var i = 0;

        for (i=0;i<input.length;i++){
            if (input.charCodeAt(i)>255){
                inputLenth+=1;
            }
            else{
                inputLenth+=0.5;
            }
        }

        inputLenth = Math.floor(inputLenth);

        var result     = charCountObj.countMax - inputLenth;

        if (result >= 0) {
            charCountObj.countElement.html(result).removeClass('warning');
        }else {
            charCountObj.countElement.html(result).addClass('warning');
        }
    }
    var _listen = function() {
        charCountObj.inputElement.keyup(function(){
            charCountObj.count();
        });
    }
    _listen();
}




function SaveSnap(){
    var post = $('#snap_form').serialize();

    var GetSnapNoticeHtml = function (info) {
        if (info.length == 1) {
            html = '<div class="snap_success_notice"><div class="ct_img clearfix"><p id="snap_success_one"><img src="http://misc.fandongxi.com/img/snap_upload_success.png" /><span><a href="/user/show.fan?id='+info['0']['user_id']+'" class="fanfanshow">>去我的哇晒</a></span></p>';
        }else {
            html = '<div class="snap_success_notice"><p>上传'+info.length+'张照片成功!<span>(<a href="/user/show.fan?id='+info['0']['user_id']+'" class="fanfanshow">>去我的哇晒</a>)</span></p><div class="ct_img clearfix">';
        }
        for (i in info) {
            html += '<a href="/show/single.fan?id='+info[i]['id']+'"><img src="'+info[i]['image']['s2']+'" /></a>';
        }
        html += '</div></div>';
        return html;
    }

    SaveSnap.rmmessage = function() {
        $('.snap_success_notice').slideUp('fast');
        setTimeout("$('.snap_success_notice').remove();",500);
    }

    $.ajax({
        url: '/show/ajax/save.fan?rand=' + Math.random(),
        type:'POST',
        data: post,
        dataType: 'json',
        success: function(info){
            html = GetSnapNoticeHtml(info);
            $('div.snap_upload').after(html);
            $('.snap_success_notice').slideDown();
            CancelSnapPost();
            setTimeout("SaveSnap.rmmessage();",5000);
        },
        error:function(info){
            alert('网络错误,请重试');
        }
    });
}

function GetSnapNotice(){
    $.getJSON("/url/1.html", {id: "1,2,3,4"},function(info){
        html = GetSnapNoticeHtml(info);
        $('div.snap_upload').after(html);
        $('.snap_success_notice').slideDown('fast');
        CancelSnapPost();
        setTimeout("$('.snap_success_notice').slideUp('fast');",5000);
    });
}

/*导航栏*/
function snapNav(init) {

    snapNav_init = {};
    snapNav_init.num = 7; //显示个数
    snapNav_init.picwidth = 54;
    snapNav_init.picmargin = 12;
    snapNav_init.changenum = 7;
    snapNav_init.user_id = init.user_id;
    snapNav_init.topic_id = init.topic_id;
    snapNav_snapcount = $('.nav_content ul li').length;
    snapNav_content   = $('.nav_content');
    snapNav_content_ul   = $('.nav_content ul');



    var leftbutton  = $('.nav_left a');
    var rightbutton = $('.nav_right a');
    var leftdisbutton  = $('.nav_left span');
    var rightdisbutton  = $('.nav_right span');
    var half = Math.floor(snapNav_init.num / 2) + 1;

    var _leftdisable = function() {
        leftbutton.hide();
        leftdisbutton.css('display','block');
    }
    var _leftable = function() {
        leftdisbutton.hide();
        leftbutton.css('display','block');
    }
    var _rightdisable = function() {
        rightbutton.hide();
        rightdisbutton.css('display','block');
    }
    var _rightable = function() {
        rightbutton.css('display','block');
        rightdisbutton.hide();
    }

    var _listen = function() {

        leftbutton.click(function(){
            leftbutton.unbind('click');
            rightbutton.unbind('click');
            snapNav_content_ul.stop();
            var left_margin = parseInt(snapNav_content_ul.css('left'));
            var left_max    = -((snapNav_init.picwidth+snapNav_init.picmargin) * snapNav_init.changenum);
            if (left_margin < left_max) {
                var left_animate = -(left_max);
            }else {
                var left_animate = -left_margin;
            }
            snapNav_content_ul.animate({'left':'+='+left_animate+'px'},'slow',function() {
                    _checkprevajax();
                    _listen();
            });
        });

        rightbutton.click(function(){
            leftbutton.unbind('click');
            rightbutton.unbind('click');
            snapNav_content_ul.stop();
            var left_margin = parseInt(snapNav_content_ul.css('left'));
            var li_count      = snapNav_content_ul.find('li').length;
            var right_margin  = (li_count-snapNav_init.num) * (snapNav_init.picwidth + snapNav_init.picmargin) + left_margin;
            var right_max    = (snapNav_init.picwidth + snapNav_init.picmargin) * snapNav_init.changenum;
            if (right_margin > right_max) {
                var right_animate = right_max;
            }else {
                var right_animate = right_margin;
            }
            snapNav_content_ul.animate({'left':'-='+right_animate+'px'},'slow',function() {
                    _checknextajax();
                    _listen();
            });
            
        });
        
    }


    var _display    =   function()  {
        var c_width = snapNav_init.num * snapNav_init.picwidth + (snapNav_init.num - 1) * snapNav_init.picmargin + 20;
        //设置显示宽度
        snapNav_content.css('width',c_width);
        snapNav_content.parent().css('width',c_width);
        //把当前放在中间
        if (snapNav_snapcount > snapNav_init.num) {
            $.each(snapNav_content_ul.find('li'),function(i,n){
                if ($(n).attr('class') == 'currect') {
                    snapNav_currect_num = i + 1;
                }
            });
            _setCurrectPosition(snapNav_currect_num);
        }

    }
    var _displaybutton = function() {
         var left_margin = parseInt(snapNav_content_ul.css('left'));
         //alert(snapNav_content_ul.css('left'));
         if (left_margin == '0') {
             _leftdisable();
         }else {
             _leftable();
         }
         var li_count      = snapNav_content_ul.find('li').length;
         var right_margin  = (li_count-snapNav_init.num) * (snapNav_init.picwidth + snapNav_init.picmargin) + left_margin;
         if (right_margin > 0) {
             _rightable();
         }else {
             _rightdisable();
         }
    }

    var _setCurrectPosition = function(i) {
        if ((i - half) > 0) {
            var left = - (i - half) * (snapNav_init.picwidth+snapNav_init.picmargin);
            snapNav_content_ul.css('left',left);
        }else {
            snapNav_content_ul.css('left','0px');
        }
    }

    var ajaxdata = function(id,type) {
        $.get('/show/ajax/slide.fan', {'id':id,'user_id':snapNav_init.user_id,'topic_id':snapNav_init.topic_id,'type':type,'num':snapNav_init.num}, function(data) {
            var vhtml = '';
            for (i in data) {
                vhtml += _html(data[i]);
            }
            if (type == 'prev') {
                snapNav_content_ul.prepend(vhtml);
                var vleft = parseInt(snapNav_content_ul.css('left'));
                var margin = (data.length) * (snapNav_init.picwidth+snapNav_init.picmargin);
                vleft -= margin;
                snapNav_content_ul.css('left',vleft+'px');
            }else{
                snapNav_content_ul.append(vhtml);
            }
            _displaybutton();
        }, 'json')
    }

    var _checkprevajax = function() {
        var vleft = parseInt(snapNav_content_ul.css('left'));
        var minleft = (snapNav_init.picwidth+snapNav_init.picmargin) * snapNav_init.num
        if ( minleft + vleft >= 0) {
            var photo_id = snapNav_content_ul.find('li').first().attr('id');
            ajaxdata(photo_id,'prev');
        }else {
            _displaybutton();
        }
    }

    var _checknextajax = function() {
        var vleft = parseInt(snapNav_content_ul.css('left'));
        var lilength = snapNav_content_ul.find('li').length;
        var minright = (snapNav_init.picwidth+snapNav_init.picmargin) * (lilength - snapNav_init.num);

        if (minright + vleft <= (snapNav_init.picwidth+snapNav_init.picmargin)*snapNav_init.num ) {
            var photo_id = snapNav_content_ul.find('li').last().attr('id');
            ajaxdata(photo_id,'next');
        }else{
            _displaybutton();
        }
    }


    var _html = function(one) {
        var html = "";
        if (one['id']) {
            html = '<li id="'+one['id']+'"><a href="/show/single.fan?id='+one['id']+'"><img src="'+one['image']['s5']+'"></a></li>';
        }
        return html;
    }

    _display();
    _listen();
    _displaybutton();

    
}


function del_sure(){
    var con=confirm("你确定要删除吗?");
    if (con==true){
        return true;
    }else{
        return false;
    }
}


/*修改签名档*/
function userSign() {

    var _getCurSign = function() {
        return $("#sign_display").html();
    }

    var _displayEditModel = function () {
        $("#sign_display").hide();
        $("#sign_edit").hide();
        $("#sign_form").css('display','inline');
        $("#sign_error").html("");

        $("#signature").focus();
    }

    var _displayNormalModel = function() {
        $("#sign_form").hide();
        $("#sign_display").css('display','inline');
        $("#sign_edit").show();
        $("#sign_error").html("");
        $("#sign_error").hide();
    }

    _signSubmit = function() {
            var curSign = jQuery.trim($("#sign_display").html());
            var signature = jQuery.trim($("#signature").val());
            
            if(signature == curSign)
            {
                _displayNormalModel();
                if(signature=='')
                    $("#sign_edit a").html("添加签名");
                else
                    $("#sign_edit a").html("编辑");
                return false;
            }

            var datastring = 'signature='+ signature;
            
            $.ajax({
                type: "POST",
                url: "/user/ajax/signature.fan",
                data: datastring,
                dataType:'json',
                success: function(json) {
                    if(json.result=="ok"){
                        $("#sign_display").html(signature);
                        _displayNormalModel();
                        if(signature=='')
                            $("#sign_edit a").html("添加签名");
                        else
                            $("#sign_edit a").html("编辑");
                    }
                    if(json.result=="error"){
                        $("#sign_error").html(json.msg);
                        $("#sign_error").show();
                    }
                },
                error: function(){
                    alert("网络出错");
                }
            });
            return false;
    }

    var _listen = function() {
        $("#sign_form").submit(function() {
            _signSubmit();
        });

        $("#sign_edit a").click(function(){
            var curSign = _getCurSign();
            $("#signature").attr("value",curSign);
            _displayEditModel();
        });

        $("#sign_cancel").click(function(){
            if (signTimeOut != undefined) {
                clearTimeout(signTimeOut);
            }
            _displayNormalModel();
        });

        $("#signature").blur(function(){
            signTimeOut = setTimeout('_signSubmit();',200);
        });

        $("#sign_save").click(function(){
            _signSubmit();
            return false;
        });
    }
    
    _listen();
}

/*scrollNav*/
function scrollNav(init) {

    scrollNav_init = {};
    scrollNav_init.num        = init.num; //显示个数
    scrollNav_init.picwidth   = init.picwidth;
    scrollNav_init.picmargin  = init.picmargin;
    scrollNav_init.changenum  = init.changenum;
    scrollNav_init.wapper     = $('.'+init.wapper);
    
    scrollNav_scrollcount     = scrollNav_init.wapper.find('li').length;
    scrollNav_content         = scrollNav_init.wapper
    scrollNav_content_ul      = scrollNav_init.wapper.find('ul');
    
    var leftbutton  = $('.'+init.leftbutton);
    var rightbutton = $('.'+init.rightbutton);

    var _leftdisable = function() {
        leftbutton.addClass('a_left_dis');
    }
    var _leftable = function() {
        leftbutton.removeClass('a_left_dis');
    }
    var _rightdisable = function() {
        rightbutton.addClass('a_right_dis');
    }
    var _rightable = function() {
        rightbutton.removeClass('a_right_dis');
    }

    var _setpageon = function(pagecount) {
        var onpage = scrollNav_pagescount - pagecount;
        if (onpage >= 0) {
            $('.a_page').removeClass('on');
            $('.a_page').eq(onpage).addClass('on');
        }
    }

    var _listen = function() {

        leftbutton.click(function(){
            leftbutton.unbind('click');
            rightbutton.unbind('click');
            
            scrollNav_content_ul.stop();
            
            var left_margin = parseInt(scrollNav_content_ul.css('left'));
            var left_max    = -((scrollNav_init.picwidth+scrollNav_init.picmargin) * scrollNav_init.changenum);
            
            if (left_margin < left_max) {
                var left_animate = -(left_max);
            }else {
                var left_animate = -left_margin;
            }
            scrollNav_content_ul.animate({'left':'+='+left_animate+'px'},'slow',function() {
                 _displaybutton();
                 _listen();
            });
            $(this).blur();
        });

        rightbutton.click(function(){
            leftbutton.unbind('click');
            rightbutton.unbind('click');
            scrollNav_content_ul.stop();
            
            var left_margin = parseInt(scrollNav_content_ul.css('left'));
            if (!left_margin) {
                left_margin = 0;
            }
            var right_margin  = (scrollNav_scrollcount-scrollNav_init.num) * (scrollNav_init.picwidth + scrollNav_init.picmargin) + left_margin;
            var right_max    = (scrollNav_init.picwidth + scrollNav_init.picmargin) * scrollNav_init.changenum;

            if (right_margin > right_max) {
                var right_animate = right_max;
            }else {
                var right_animate = right_margin;
            }
            scrollNav_content_ul.animate({'left':'-='+right_animate+'px'},'slow',function() {
                _displaybutton();
                _listen();
                    
            });
            $(this).blur();

        });

        $('a.a_page').unbind('click');
        $('a.a_page').each(function(i,obj){
            //console.log(i);
            if (!$(obj).hasClass('on')) {
               $(obj).click(function(){
                   var scpage  = $(this).attr('page');
                   var left_margin = -scpage*scrollNav_init.num*(scrollNav_init.picwidth + scrollNav_init.picmargin);
                   scrollNav_content_ul.animate({'left':left_margin+'px'},'slow',function() {
                       _displaybutton();
                       _listen();
                   });
                   $(this).blur();
               });
            }
        });
            
        

    }


    var _display    =   function()  {
        var c_width = scrollNav_init.num * scrollNav_init.picwidth + (scrollNav_init.num - 1) * scrollNav_init.picmargin;

        //设置显示宽度
        scrollNav_content.css('width',c_width);
    }
    
    var _displaybutton = function() {
         var left_margin = parseInt(scrollNav_content_ul.css('left'));
         //alert(scrollNav_content_ul.css('left'));
         if (!left_margin) {
            left_margin = 0;
         }
         if (left_margin == '0') {
             _leftdisable();
         }else {
             _leftable();
         }
         var right_margin  = (scrollNav_scrollcount-scrollNav_init.num) * (scrollNav_init.picwidth + scrollNav_init.picmargin) + left_margin;
         if (right_margin > 0) {
             _rightable();
         }else {
             _rightdisable();
         }

         var leftcount = (-left_margin)/(scrollNav_init.picwidth + scrollNav_init.picmargin);
         var leftpage  = leftcount/scrollNav_init.changenum;
         _setpageon(leftpage+1);
    }

    var _formatbutton = function() {

        scrollNav_pagescount = scrollNav_scrollcount/scrollNav_init.changenum;
        if(scrollNav_pagescount != parseInt(scrollNav_pagescount)) {
            scrollNav_pagescount = parseInt(scrollNav_pagescount) + 1;
        }

        if (scrollNav_pagescount <= 1) {
            $('.relation_nav a').hide();
        }else {
            var pagehtml = "";
            for (var i = 1; i <= scrollNav_pagescount; i++){
                pagehtml += _htmlpage(i,scrollNav_pagescount);
            }
            rightbutton.after(pagehtml);
        }
    }
    var _htmlpage = function(count,pagescount) {
        return '<a href="javascript:void(0);" class="a_page pngfix" page="'+(pagescount-count)+'"><span></span></a>'
    }

    _formatbutton();
    _displaybutton();
    
    _display();
    _listen();
}

//单个页面FAV_PRODUCT
function favproduct_view(id,type) {

    html = "";
    if (type == 'like') {
        html = '我想买';
    }else if (type == 'have') {
        html = '我拥有';
    }
    html = '<li class="fav"><span>'+html + '</span><a href="javascript:void(0);" onclick="removeproduct_view('+id+')" class="delete">x</a></li>';

    $.get('/product/ajax/'+type+'.fan?id='+id,function(data){
        sayhtml =   '<li class="say last"><a href="javascript:void(0);" onclick="sayproduct_view()"><span>说两句</span></a></li>';
        html    +=  sayhtml;
        $('.pro_controller').html(html);

        if(data.firsttime == 0) {
            $('body').append('<a id="bodyfancybox" href="#firsttimetip" style="display:none"></a><div style="display:none"><div id="firsttimetip" class="onetips"><h2>小贴示</h2><div class="content">点击“我想买”或“我有”后，该商品将出现在你的“鞋柜”中，翻东西将根据你的喜好为你推荐商品。<div class="bt"><button class="bs" onclick="$.fancybox.close();">知道啦</button></div></div></div>')
            $("a#bodyfancybox").fancybox({
                'transitionIn'  :   'fade',
                'transitionOut' :   'fade',
                'speedIn'       :   200,
                'speedOut'      :   200,
                'overlayShow'   :   true,
                'hideOnOverlayClick' : true,
                'scrolling'     :   'no',
                'centerOnScroll':   true
            });
            $("a#bodyfancybox").click();
        }
    },'json') ;
}

function removeproduct_view(id) {
    html = ['<li class="love"><a class="pngfix" href="javascript:void(0);" onclick="favproduct_view('+id+',\'like\')"><span>想买</span></a></li>',
            '<li class="have"><a class="fancybox pngfix" href="/product/fav.fan?id='+id+'&type=have" onclick="favproduct_view('+id+',\'have\')"><span>我有</span></a></li>',
            '<li class="say last"><a class="pngfix" href="javascript:void(0);" onclick="sayproduct_view()"><span>说两句</span></a></li>'].join("");
    $.get('/product/ajax/remove.fan?id='+id,function(data){
        $('.pro_controller').html(html);
        addFancyBox(1);
        
    }) ;

}

function sayproduct_view() {
    $.scrollTo( $('#product_wall'), 800 );
    $('#postmessage_content').focus();
}


/*yellow fade*/
(function($) {
    $.fn.yellowFade = function() {
        return (this.css({
            backgroundColor: "#ffcc00"
        }).animate({
            backgroundColor: "#ffffff"
        }, 1500));
    }
})(jQuery);


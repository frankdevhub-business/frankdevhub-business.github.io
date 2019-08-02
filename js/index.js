// index.js


$(function(){
	var len=$(".main_banner li").length;
	var index_2=0;
	var timer=800;
	var intervaltimer=0;
	var isMoving=false;
	
	function slide(slideMode){//轮播方法		
		if (isMoving==false){
			isMoving=true;
			var prev; var next; var hidden;
			var curr=$("#imgCard"+index_2);//当前正中显示
			
			if(index_2==0){								//当前正中显示的是第0张时 prev为最后一张
				prev=$("#imgCard"+(len-1));					
			}else{												//否则  序列号-1
				prev=$("#imgCard"+(index_2-1)); 		
			}
			if(index_2==(len-1)){					//当前正中显示的是最后一张时 next为第0张
				next=$("#imgCard0");
			}else{											//否则  序列号+1
				next=$("#imgCard"+(index_2+1));
			}
	
			if(slideMode){			//slideMode为1(true)，执行slide(1)，上一张
				if(index_2-2>=0){									//index_2						2		3		4
					hidden=$("#imgCard"+(index_2-2));//									0		1		2
				}else{													//index_2		0		1
					hidden=$("#imgCard"+(len+index_2-2));//			3		4
				}
				prev.css("z-index","5");			//点击prev按钮  让prev位置上的这张图片 层级最高 显示
				next.css("z-index","1");
				curr.css("z-index","2");			
				hidden.css("z-index","1");
				//当index_2自减，各图片往右运动效果
				hidden.css({width:"450px",height:"180px",top:"60px","left":"0px","opacity":0});
				hidden.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"0px",opacity:1},timer);
				curr.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"600px",opacity:1},timer);
				next.stop(true,true).animate({width:"450px",height:"180px",top:"60px","left":"730px","opacity":0},timer,function(){next.find("span").css("opacity",0); isMoving = false;});
				//prev  -->  curr     prev中的图片li轮换到curr的位置      其他一次轮换
				prev.find("span").css("opacity",0);
				$(".main_banner_box li").find("p").css({"bottom":"-50px"});//所有标题隐藏
				prev.stop(true,true).animate({width:"670px",height:"280px",left:"255px",top:0,opacity:1},timer,function(){
					$(this).find("p").animate({"bottom":"0px"});	//当前这张图片的标题运动出来
				});
				index_2--;
			}else{			//执行next 操作
				if(index_2+2>=len){								//index_2								3		4	
					hidden=$("#imgCard"+(index_2+2-len));//										0		1
				}else{													//index_2		0		1		2
					hidden=$("#imgCard"+(index_2+2));//						2		3		4
				}
				prev.css("z-index","1");
				next.css("z-index","5");			//点击next按钮  让next位置上的这张图片 层级最高 显示
				curr.css("z-index","2");
				hidden.css("z-index","1");
				//当index_2自增，各图片往左运动效果
				hidden.css({width:"450px",height:"180px",top:"60px","left":"730px","opacity":0});
				hidden.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"600px",opacity:1},timer);							
				curr.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"0px",opacity:1},timer);
				//next  -->  curr     next中的图片li轮换到curr的位置      其他一次轮换
				next.find("span").css("opacity",0);
				$(".main_banner_box li").find("p").css({"bottom":"-50px"});//所有标题隐藏
				next.stop(true,true).animate({width:"670px",height:"280px",left:"255px",top:0,opacity:1},timer,function(){
					$(this).find("p").animate({"bottom":"0px"});	//当前这张图片的标题运动出来
				});
				prev.stop(true,true).animate({width:"450px",height:"180px",left:"0px",top:"60px",opacity:0},timer,function(){
					isMoving = false;
				}); 
				index_2++;	
			}//if else
	
			hidden.find("span").css("opacity",0.5);
			curr.find("span").css("opacity",0.5);
	
			if(index_2==len) index_2=0;
			if(index_2<0) index_2=len+index_2;			//限制index_2的范围
			$(".btn_list span").removeClass('curr').eq(index_2).addClass('curr');//给序列号按钮添加、移除样式
		}
	}//slide()


	if(len>3){
		//序列号按钮 跳序切换 方法
		$(".btn_list span").click(function(event){
			
			if (isMoving ) return;
			var oIndex=$(this).index();
	
			if(oIndex==index_2) return;//点击按钮的序列号与当前图片的序列号一致，return
			clearInterval(intervaltimer)
			intervaltimer=null;
	
			var flag=false;
			//当前显示图片的序列号  和  被点击按钮的序列号  间隔超过1且不是首尾两个的时候
			if(Math.abs(index_2-oIndex)>1&&Math.abs(len-Math.abs(index_2-oIndex))!=1){
				//统一样式
				$(".main_banner_box li").css({width:"300px",height:"120px",left:"600px",top:"60px",opacity:0});
				//如果当前的序列号   比    被点击按钮序列号     大     而且     不相邻、不是首尾  
				if(index_2>oIndex&&len-Math.abs(index_2-oIndex)!=1){
					flag=true;
					index_2=oIndex+1;		//oIndex+1    通过slide()  运动回上一张    oIndex
				}else{//比   小     而且     不相邻、不是首尾
					index_2=oIndex-1;		//oIndex-1     通过slide()  运动到下一张    oIndex
					if(index_2<0) index_2=len-1;
				}
			}else{//当前 比 被点击  大	且   相邻									//从0    跳到     4		要执行上一张方法
				if((index_2>oIndex&&len-(index_2-oIndex)!=1)||(index_2<oIndex&&len+(index_2-oIndex)==1)){
					flag=true;			//执行上一张
				}
			}
			slide(flag);
			intervaltimer=setInterval(slide,3000);//自动轮播
			
		});
	
		$(".main_banner_box li").on("mousemove",function(){
			if($(this).css("width")=="670px"){//鼠标移入为当前正中显示的图片li，则清除定时器
				clearInterval(intervaltimer);
				intervaltimer=null;
			}
		}).on("mouseout",function(){//鼠标移除重新滚动
				clearInterval(intervaltimer);
				intervaltimer=null;
				intervaltimer=setInterval(slide,3000);
		});
		
		$(".js_pre").click(function(event){//上一张
			if (isMoving ) return;
			clearInterval(intervaltimer);
			intervaltimer=null;
			slide(1);
			intervaltimer=setInterval(slide,3000);
		});
	
		$(".js_next").click(function(event){//下一张
			if (isMoving ) return;
			clearInterval(intervaltimer);
			intervaltimer=null;
			slide();
			intervaltimer=setInterval(slide,3000);        
		});
		
		intervaltimer=setInterval(slide,3000);
		
	}else{
		
		$(".js_pre").hide();
		$(".js_next").hide();
		
	}//if else
	

	
//六、在线首发-----------------------------------------------------------------------------------
	var len_2=$(".new_songs ul").length;
	var now_2=0;
	$("#albumPrev").click(function(){		//上一组
		if(now_2>=0){
			now_2--;
			if(now_2==-1){now_2=len_2-1;}
			$(".new_songs ul").eq(now_2).addClass("show").siblings().removeClass("show");
			$(".new_songs em.pageNum").html(now_2+1);
		}
	});
	$("#albumNext").click(function(){		//下一组
		if(now_2<=len_2){
			now_2++;
			if(now_2==len_2){now_2=0;}
			$(".new_songs ul").eq(now_2).addClass("show").siblings().removeClass("show");
			$(".new_songs em.pageNum").html(now_2+1);
		}
	});
	

	var _html2=$(".new_songs ul.show li.albumBox").eq(2).find("p").html();
	var _html3=$(".new_songs ul.show li.albumBox").eq(3).find("p").html();
	_html2+="<font>HOT</font>";
	_html3+="<font>HOT</font>";
	$(".new_songs ul.show li.albumBox").eq(2).find("p").html(_html2);
	$(".new_songs ul.show li.albumBox").eq(3).find("p").html(_html3);

	
	
//七、MV首播-----------------------------------------------------------------------------------
	var index_3=0;					//MV首播按钮序列号
	var index_33=0;				//首发MV按钮序列号（MV页面）
	var index_333=0;				//热门MV按钮序列号（MV页面）
	var cont_1=$(".index_mv_body .mvList");
	var cont_2=$(".shoufa_mv_body .mvList");
	var cont_3=$(".hot_mv_body .mvList");
	
	//MV首播 (首页)-------------------------------------
	$(".index_mv_title ul li").click(function(){	//选项卡
		index_3=$(this).index();
		mvSlide($(this),index_3,cont_1);
	});
	
	//首发MV (MV页面)--------------------------------
	$(".shoufa_mv_title ul li").click(function(){	//选项卡
		index_33=$(this).index();
		mvSlide($(this),index_33,cont_2);
	});
	
	//热门MV（MV页面）------------------------------------
	$(".hot_mv_title ul li").click(function(){	//选项卡
		index_333=$(this).index();
		mvSlide($(this),index_333,cont_3);
	});
	
	//封装MV列表切换效果，共用
	function mvSlide(btn,n,cont){
		btn.find("a").addClass("cur").parent().siblings().find("a").removeClass("cur");
		cont.eq(n).fadeIn().siblings("div").fadeOut();	
		cont.eq(n).addClass("curShow").siblings().removeClass("curShow");	
	}

	var iHtml = "<b></b>";
	$(".index_mv_body .mvList ul.sb li").eq(0).append(iHtml);
	$(".index_mv_body .mvList ul.sb li").eq(1).append(iHtml);
	$(".shoufa_mv_body .mvList ul.sb li").eq(0).append(iHtml);
	$(".shoufa_mv_body .mvList ul.sb li").eq(1).append(iHtml);
	


	


	//排行榜-----------------

	$("#rank li").eq(0).find("a.musicName").prepend("<i class='first_place'>1</i>");
	$("#rank li").eq(1).find("a.musicName").prepend("<i class='second_place'>2</i>");
	$("#rank li").eq(2).find("a.musicName").prepend("<i class='third_place'>3</i>");
	for(var r=3;r<9;r++){
		$("#rank li").eq(r).find("a.musicName").prepend("<i>"+(r+1)+"</i>");
	}



	
//九、精选集-------------------------------------------------------------------------------
	var oList_omnibus=document.getElementById("omnibus_list");
	var oI=oList_omnibus.getElementsByTagName("i")[0];
	var aSpan=oList_omnibus.getElementsByTagName("span");
	$("#omnibus_list .post_big a").hover(function(){
		$(this).find("i").stop(true,true).animate({left:"0px"},300);
	},function(){
		$(this).find("i").stop(true,true).animate({left:"305px"},300,function(){
			oI.style.left="-305px";
		});
	});
	$("#omnibus_list .post_small a").hover(function(){
		$(this).find("span").stop(true,true).animate({left:"0px"},300);
	},function(){
		$(this).find("span").stop(true,true).animate({left:"130px"},300,function(){
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.left="-130px";
			}
		});
		
	});
	
	
	
	

});//$(function(){});        window.onload



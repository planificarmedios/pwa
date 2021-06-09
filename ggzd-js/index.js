$(document).on('scroll',function(){
    document.scrollingElement.scrollTop
    
    scrollAnimationsActives();
})

function scrollAnimationsActives(){
    let tops = document.scrollingElement.scrollTop + (window.innerHeight / 2)+100;
    $(".fadeAnimate").each((i,element) => {
        if(element.offsetTop <= tops){
            element.classList.add('active');
        }else{
            element.classList.remove('active');
        }
    });
}
scrollAnimationsActives();
$(document).ready(function(){
    $("[href]").click(evt=>{
		let tarel = $(evt.currentTarget).attr('href');
		console.log($(tarel).offset());
        if(tarel.startsWith("#")){
			evt.preventDefault();
			$(".menu-line").removeClass("active");
			$(".menuItem").removeClass("active");
			menuAnimation();
			$("html,body").animate({
				scrollTop:$(tarel).offset().top-$(".nav").outerHeight(true)
			},1500);
		}
	})
	
	$(".menu-line").click(_ => {
		$(".menu-line").toggleClass("active");
		$(".menuItem").toggleClass("active")
		
		menuAnimation();
	})
	if(window.innerWidth > 500){
		$(".video-container").css({
			marginTop:$(".nav").outerHeight(true),
			height:`calc(100vh - ${$(".nav").outerHeight(true)}px)`
		});
	}else{
		$(".video-container").css({
			marginTop:$(".nav").outerHeight(true)
		});
	}
	$("form").on('submit',onSubmit);
	$("#contacts form").find("input[type='text'],select,textarea").each((i,e)=>{
		$(e).on('change keyup',validForm);
	})
	setInterval(() => {
		$(".imageFate").each(function(i,e){
			let next = false;
			let img = $(e).find("img.active");
			if(!img.next().length){
				$(e).find("img:first").addClass("active");
			}else{
				img.next().addClass("active")
			}
			img.removeClass("active");
			
		})
	}, 8000);
})

function menuAnimation(){
	if(!$(".menu-line").is(":VISIBLE")){
		return;
	}
	$(".menuItem").css({
		top:$(".nav").outerHeight(true),
		height: (window.innerHeight - $(".nav").outerHeight(true))
	})
	if ($(".menuItem").hasClass("active")) {
		$(".menuItem").animate({
			width: "100%"
		}, {
			queue:false,
			duration:200
		})
	} else {
		$(".menuItem").animate({
			width: 0
		}, {
			queue:false,
			duration:200,
		})
	}
}

function validForm(){
	let valid = true;
	$("#contacts form").find("input[type='text'],select,textarea").each((i,e)=>{
		
		if(!$(e).val()){
			valid = false;
		}
	})
	if(valid){
		$("#button1").val("Enviar");
	}
}

function onSubmit(evt){
	evt.preventDefault();
	evt.stopPropagation();

	if(!$("form")[0].reportValidity() || $("#contacts form #button2").prop('disabled')){
		return;
	}

	$("#contacts form #button1").prop("disabled",true)
	$("#button1").val("Enviando...");

	let data = {
		["g-recaptcha-response"]:grecaptcha.getResponse()
	};

	$("#contacts form").find("input,select,textarea").each((i,e)=>{
		data[$(e).attr("name")] = $(e).val();
	})
	
	$.ajax({
		url:"sendMessage.php",
		method:"post",
		data,
		dataType:"json",
	})
	.then(r=>{
		if(r.success){
			swal("Exitoso!", "Consulta enviada con exito", "success");
			
			$('#button1').click(function() {
				window.location='http://www.fortressargentina.com/Grenn	';
			  });
		}else{
			swal("Error!", r.message, "error");
			$("#contacts form #button1").prop("disabled",false);
			$("#button1").val("Enviar");
		}
	});

}
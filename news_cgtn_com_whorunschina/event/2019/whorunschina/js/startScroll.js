/*
 * @Author: @jdk137 
 * @Date: 2019-03-21 16:23:55 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-04-01 16:28:51
 */


$(".bds_copy").attr("data-clipboard-text", window.location.href);
var clipboard = new ClipboardJS('.bds_copy');

//复制成功执行的回调，可选
clipboard.on('success', function (e) {
	$(".bds_copy p").html("Copied").css("width", "55px");
	setTimeout(function () {
		$(".bds_copy p").hide().html("Copy to clipboard").css("width", "150px");
	}, 2000)
});

$(".bds_copy").on({
	"mouseover": function () {
		$(".bds_copy p").show();
	},
	"mouseout": function () {
		$(".bds_copy p").hide().html("Copy to clipboard").css("width", "150px");
	}
})

//复制失败执行的回调，可选
clipboard.on('error', function (e) {});

var startScroll = function () {
	
	// initialize the scrollama
	var scroller = scrollama();

	// scrollama event handlers
	function handleStepEnter(response) {
		$(".bd_weixin_popup").hide();
		
		var stage = $(response.element).data('step');

		fsm.trans(stage);

		if (stage === 'svgWordMove' || stage === 'svgWordShake') {
			$('#searchButtons').hide();
		} else {
			$('#searchButtons').show();
		}

		if (stage === 'svgWordMove') {
			$(".title-red").hide();
			$(".arrow-red").hide();
			$(".arrow-white").show();
			$('body').addClass('homepage');
			$("#main .logo").show();
		} else {
			$('body').removeClass('homepage');
			$("#main .logo").hide();
			$(".arrow-white").hide();
		}

		if (stage === "all") {
			$("[data-step=all] .allNum").show();
		} else {
			$("[data-step=all] .allNum").hide();
		}

		if (stage === "gender") {
			$('#scaleContainer').addClass('gender');
			// $(".sex").show();
		} else {
			$('#scaleContainer').removeClass('gender');
			// $(".sex").hide();
		}

		if (stage === 'age') {
			$('#scaleContainer').addClass('age');
		} else {
			$('#scaleContainer').removeClass('age');
		}

		if (stage === 'treemap') {
			$('#scaleContainer').addClass('treemap');
		} else {
			$('#scaleContainer').removeClass('treemap');
		}

		if (stage === 'edu') {
			$('#scaleContainer').addClass('edu');
		} else {
			$('#scaleContainer').removeClass('edu');
		}

		if (stage === 'major') {
			$('#scaleContainer').addClass('major');
		} else {
			$('#scaleContainer').removeClass('major');
		}

		if (stage === 'party') {
			$('#scaleContainer').addClass('party');
			$('body').removeClass('red-body');
		} else {
			$('#scaleContainer').removeClass('party');
		}

		if (stage === 'end') {
			$('#myCanvas').removeClass('hide');
			$("#scaleContainer .allNum").show(500);
			$('#scaleContainer .endDes').show(500);

			$('#mrb_foreground').addClass('none');
			$('#diagram2').addClass('none');
			$('#diagram2').find('g').remove();
		} else {
			$("#scaleContainer .allNum").hide(500);
			$('#scaleContainer .endDes').hide(500);
		}

		if (stage !== "ethnicity") {
			$('#personalWrap .hanPanel').remove();
		}

		$('#personalTag').hide();

		// Mrb
		if (stage === 'title3' || stage === 'title2') {
			$('#myCanvas').removeClass('hide');
			$('body').addClass('red-body');
			$('#mrb_foreground').addClass('none');
			// $('#diagram3').addClass('none');
			// $('#diagram3').find('svg').empty();
		}else{
			// $('#myCanvas').addClass('hide');
			$('body').removeClass('red-body');
		}
		
		if(stage === 'diagram3'){
			// $('body').removeClass('red-body');
			$('#myCanvas').addClass('hide');

			$('#mrb_foreground').removeClass('none');
			$('#diagram3').removeClass('none');

			// $('#diagram4').addClass('none');
			// $('#diagram4').find('svg').empty();
		}else{
			$('#diagram3').find('svg').empty();
			$('#diagram3').addClass('none');
		}

		if(stage === 'diagram4'){
			// $('#diagram3').addClass('none');
			// $('#diagram3').find('svg').empty();
			$('#myCanvas').addClass('hide');

			$('#mrb_foreground').removeClass('none');
			$('#diagram4').removeClass('none');

			// $('#diagram5').addClass('none');
			// $('#diagram5').find('svg').empty();
		}else{
			$('#diagram4').addClass('none');
			$('#diagram4').find('svg').empty();
		}

		if(stage === 'diagram5'){
			// $('#diagram4').addClass('none');
			// $('#diagram4').find('svg').empty();
			$('#myCanvas').addClass('hide');

			$('#mrb_foreground').removeClass('none');
			$('#diagram5').removeClass('none');
			mrb_diagram_5.curr_year = null;
			mrb_diagram_5.init = 0;
			$('#diagram5').find('svg').empty();
			mrb_diagram_5.draw();

			// $('body').removeClass('red-body');
			// $('#myCanvas').addClass('hide');
		}else{
			$('#diagram5').addClass('none');
			$('#diagram5').find('svg').empty();
		}

		// if(stage === 'title2'){
		// 	$('#diagram5').addClass('none');
		// 	$('#diagram5').find('svg').empty();

		// 	$('body').addClass('red-body');
		// 	$('#myCanvas').removeClass('hide');

		// 	$('#diagram1').addClass('none');
		// 	$('#diagram1').find('g').remove();
		// }

		if(stage === 'diagram1'){
			// $('body').removeClass('red-body');
			$('#myCanvas').addClass('hide');

			$('#mrb_foreground').removeClass('none');
			$('#diagram1').removeClass('none');

			// $('#diagram2').addClass('none');
			// $('#diagram2').find('svg').empty();
		}else{
			$('#diagram1').addClass('none');
			$('#diagram1').find('g').remove();
			mrb_diagram_1.stopAnimate();
		}

		if(stage === 'diagram2'){
			// $('#diagram1').addClass('none');
			// $('#diagram1').find('g').remove();
			$('#myCanvas').addClass('hide');

			$('#mrb_foreground').removeClass('none');
			$('#diagram2').removeClass('none');

		}else{
			$('#diagram2').addClass('none');
			$('#diagram2').find('g').remove();
		}

		// end: Mrb

	}

	function handleStepExit(response) {
		// remove color from current step
		response.element.classList.remove('is-active');
		if (response.index == 16) {
			if (response.direction === "down") {
				// $("#myCanvas").fadeOut();
				fsm.trans('random');
				$(".allNum,#scaleContainer .endDes").hide(300);
			} else {
				fsm.trans('end');
				// $("#myCanvas").fadeIn();
				//$("[data-step=end] .allNum,[data-step=end] .endDes").show();
			}
		}
	}

	function handleStepProgress(res) {
		$('#mysvg').attr('class', '');
		$('#foreground').attr('class', '');
		var stage = $(res.element).data('step');
		// console.log('res.progress', res.progress)
		if (stage === 'ethnicity') {
			$('#foreground .node.border').removeClass('border');
			/* $('#foreground .node[data-ethnicity="Han"] .hanPanel').remove(); */
			if (res.progress < 0.4) {

			} 
			else if (res.progress < 0.7) {
				$('#foreground .node[data-ethnicity="Han"]').addClass('border');
				// showEthnicity('Han');
				// add 标签
			} else {
				// 移除 标签
				// $('#foreground .node[data-ethnicity="Gaoshan"]').addClass('border');
				$('#foreground .node[data-ethnicity="Tatar"]').addClass('border');
			}
		} else if (stage === 'age') {
			if (res.progress > 0.55 && res.progress < 0.75) {
				$('#foreground').addClass('agecover');
			} else {
				$('#foreground').removeClass('agecover');
			}
		} else if (stage === 'edu') {
			if (res.progress > 0.3 && res.progress < 0.55) {
				$('#mysvg').addClass('edu1960');
			} else {
				$('#mysvg').removeClass('edu1960');
			}
			if (res.progress >= 0.55 && res.progress < 0.8) {
				$('#mysvg').addClass('edu1980');
			} else {
				$('#mysvg').removeClass('edu1980');
			}
		} else if (stage === 'major') {
			// console.log(res.progress);
			if (res.progress > 0.3 && res.progress < 0.52) {
				$('#mysvg').addClass('social');
			} else {
				$('#mysvg').removeClass('social');
			}
			if (res.progress >= 0.52 && res.progress < 0.85) {
				$('#mysvg').addClass('manage');
			} else {
				$('#mysvg').removeClass('manage');
			}
			if (res.progress >= 0.85) {
				$('#mysvg').addClass('abroad');
			} else {
				$('#mysvg').removeClass('abroad');
			}
		} else if (stage === 'party') {
			// console.log(res.progress);
			// if (res.progress > 0.7) {
			// 	$('.sankey').addClass('party');
			// } else {
			// 	$('.sankey').removeClass('party');
			// }
		} else if (stage === 'diagram5') {
			if(res.progress > 0 && res.progress < 0.33){
				mrb_diagram_5.drawYearData('1954');
			}else if(res.progress >= 0.33 && res.progress < 0.66){
				mrb_diagram_5.drawYearData('1993');
			}else if(res.progress >= 0.66 && res.progress < 1){
				mrb_diagram_5.drawYearData('2018');
			}
		} else if (stage === 'diagram1') {
			if(res.progress > 0.7){
				mrb_diagram_1.focusRuleLaw();
			}else{
				mrb_diagram_1.deFocusRuleLaw();
			}
		} else if (stage === 'diagram2') {
			if(res.progress <= 0.15){
				mrb_diagram_2.deFocusSPC();
			}

			if(res.progress > 0.15 && res.progress <=0.4){
				mrb_diagram_2.focusSPC();
			}

			if(res.progress > 0.4){
				mrb_diagram_2.focusSPP();
			}
		}
	}

	function init() {
		// set random padding for different step heights (not required)
		$('#scroll .step').each(function () {
			// var v = 100 + Math.floor(Math.random() * window.innerHeight / 4);
			$(this)[0].style.minHeight = window.innerHeight + 'px';
		});
		$(".tag").show();
		// 1. setup the scroller with the bare-bones options
		// this will also initialize trigger observations
		// 3. bind scrollama event handlers (this can be chained like below)
		scroller.setup({
				step: '.scroll__text .step',
				progress: true,
				debug: false,
			})
			.onStepEnter(handleStepEnter)
			.onStepExit(handleStepExit)
			.onStepProgress(handleStepProgress);

		// setup resize event
		if (!isMobile.any) {
			window.addEventListener('resize', scroller.resize);
		}
	}

	// kick things off
	init();

};

 * jQuery SuperBox! 0.9.1
 * Copyright (c) 2009 Pierre Bertet (pierrebertet.net)
 * Licensed under the MIT (MIT-LICENSE.txt)
 *
 * TODO :
 * - Document.load if init is before </body> against IE crash.
 * - Animations
 * - Image / Gallery mode : display a legend
*/
;(function($){
	
	
	var $overlay, $wrapper, $container, $superbox, $closeBtn, $loading, $nextprev, $nextBtn, $prevBtn, settings,
	
	
	defaultSettings = {
		boxId: "superbox",
		boxClasses: "",
		overlayOpacity: .8,
		boxWidth: "600",
		boxHeight: "400",
		loadTxt: "Loading...",
		closeTxt: "Close",
		prevTxt: "Previous",
		nextTxt: "Next",
		beforeShow: function(){}
	},
	
	galleryGroups = {},
	galleryMode = false,
	hideElts = $([]);
	
	
	$.superbox = function(){
		
		
		settings = $.extend({}, defaultSettings, $.superbox.settings);
		
		
		if ($.browser.msie && $.browser.version < 7){
			hideElts = hideElts.add("select");
		}
		
		
		createElements();
		
		
		dispatch();
	};
	
	
	function dispatch(){
		
		
		$("a[rel^=superbox],area[rel^=superbox]").each(function(){
			
			
			var $this = $(this),
			relAttr = $this.attr("rel"),
			
			
			type = relAttr.match(/^superbox\[([^#\.\]]+)/)[1],
			
			
			boxCurrentAttrs = relAttr.replace("superbox", "").match(/([#\.][^#\.\]]+)/g) || [],
			
			
			newBoxId = settings.boxId,
			newBoxClasses = settings.boxClasses;
			
			this._relSettings = relAttr.replace("superbox["+ type + boxCurrentAttrs.join("") +"]", "");
            
			
			$.each(boxCurrentAttrs, function(i, val){ 
					newBoxId = val.substr(1);
				}
				else if (val.substr(0,1) == "."){
					newBoxClasses += " " + val.substr(1);
				}
			});
			
			
			if (type.search(/^image|gallery|iframe|content|ajax$/) != -1) {
				$this.superbox(type, {boxId: newBoxId, boxClasses: newBoxClasses});
			}
		});
	};
	
	
	$.fn.superbox = function(type, curSettings){
		curSettings = $.extend({}, settings, curSettings);
		$.superbox[type](this, curSettings);
	};
	

	$.extend($.superbox, {
		
		
		image: function($elt, curSettings, type){
			
			var relSettings = getRelSettings($elt.get(0)),
			dimensions = false;
			
			if (relSettings && type == "gallery")
				dimensions = relSettings[1];
			else if (relSettings)
				dimensions = relSettings[0];
			
			
			$elt.click(function(e){
				e.preventDefault();
				
				prepareBox();
				
				
				if (type == "gallery")
					nextPrev($elt, relSettings[0]);
				
				
				initLoading(function(){
					
				
					var dims = false,
					
					
					$curImg;
					
					if (dimensions) {
						dims = dimensions.split("x");
					}
					
					
					$curImg = $('<img src="'+ $elt.attr("href") +'" title="'+ ($elt.attr("title") || $elt.text()) +'" />');
					
					
					$curImg.load(function(){
						
						
						resizeImageBox($curImg, dims);
						
						
						setBoxAttrs({boxClasses: "image " + curSettings.boxClasses, boxId: curSettings.boxId});
						
					
						showBox();
						
					}).appendTo($innerbox);
					
				});
				
			});
		},
		
		
		gallery: function($elt, curSettings){
			
			
			var extraSettings = getRelSettings($elt.get(0));
			
			
			if(!galleryGroups[extraSettings[0]]) {
			    galleryGroups[extraSettings[0]] = [];
			}
			
			
			galleryGroups[extraSettings[0]].push($elt);
			
			$elt.get(0)._superboxGroupKey = (galleryGroups[extraSettings[0]].length - 1);
			
			
			$.superbox["image"]($elt, curSettings, "gallery");
		},
		
		
		iframe: function($elt, curSettings){
			
			
			var extraSettings = getRelSettings($elt.get(0));
			
			
			$elt.click(function(e){
				e.preventDefault();
				
				prepareBox();
				
				
				initLoading(function(){
					
					
					var dims = false,
					
					
					$iframe;
					
					if (extraSettings) {
						dims = extraSettings[0].split("x");
					}
					
					curSettings = $.extend({}, curSettings, {
						boxWidth: dims[0] || curSettings.boxWidth,
						boxHeight: dims[1] || curSettings.boxHeight
					});
					
					
					$iframe = $('<iframe src="'+ $elt.attr("href") +'" name="'+ $elt.attr("href") +'" frameborder="0" scrolling="auto" hspace="0" width="'+ curSettings.boxWidth +'" height="'+ curSettings.boxHeight +'"></iframe>');
					
					
					$iframe.load(function(){
						
						
						$superbox.width( curSettings.boxWidth+"px" );
						$innerbox.height( curSettings.boxHeight+"px" );
						
						
						setBoxAttrs({boxClasses: "iframe " + curSettings.boxClasses, boxId: curSettings.boxId});
						
						
						showBox();
						
					}).appendTo($innerbox);
				});
				
			});
		},
		
		
		content: function($elt, curSettings){
			
			var extraSettings = getRelSettings($elt.get(0));
			
			
			$elt.click(function(e){
				e.preventDefault();
				
				prepareBox();
				
				initLoading(function(){
					
					
					if (extraSettings)
						dims = extraSettings[0].split("x");
					
					curSettings = $.extend({}, curSettings, {
						boxWidth: dims[0] || curSettings.boxWidth,
						boxHeight: dims[1] || curSettings.boxHeight
					});
					
				
					$superbox.width( curSettings.boxWidth+"px" );
					$innerbox.height( curSettings.boxHeight+"px" );
					
					$($elt.attr('href')).clone().appendTo($innerbox).show();
					
					
					setBoxAttrs({boxClasses: "content " + curSettings.boxClasses, boxId: curSettings.boxId});
					
					
					showBox();
				});
				
			});
		},
		
		
		ajax: function($elt, curSettings){
			
			
			var extraSettings = getRelSettings($elt.get(0));
			
			
			$elt.click(function(e){
				e.preventDefault();
				
				prepareBox();
				
				
				initLoading(function(){
					
					
					var dims = false;
					if (extraSettings && extraSettings[3]) {
						dims = extraSettings[3].split("x");
					}
					
					
					curSettings = $.extend({}, curSettings, {
						boxWidth: dims[0] || curSettings.boxWidth,
						boxHeight: dims[1] || curSettings.boxHeight
					});
					
					
					$superbox.width( curSettings.boxWidth+"px" );
					$innerbox.height( curSettings.boxHeight+"px" );
					
					$.get( extraSettings[2], function(data){
						$(data).appendTo($innerbox);
					});
					
					
					setBoxAttrs({boxClasses: "ajax " + curSettings.boxClasses, boxId: curSettings.boxId});
					
					
					showBox();
				});
			});
		}
	});
	
	
	
	function getRelSettings(elt){
		return elt._relSettings.match(/([^\[\]]+)/g);
	};
	
	
	function resizeImageBox($curImg, dims){
		
		
		$superbox.width($curImg.width() + ($innerbox.css("paddingLeft").slice(0,-2)-0) + ($innerbox.css("paddingRight").slice(0,-2)-0)); // Padding ajouté, pour corriger le problème de définition padding sur $innerbox
		$innerbox.height($curImg.height());
		
		
		if (dims && dims[0] != "") {
			$superbox.width(dims[0] + "px");
		}
		if (dims && dims[1] != "" && dims[1] > $curImg.height()) {
			$innerbox.height(dims[1] + "px");
		}
	};
	
	
	function nextPrev($elt, group){
		$nextprev.show();
		
		galleryMode = true;
		
		var nextKey = $elt.get(0)._superboxGroupKey + 1,
		    prevKey = nextKey - 2;
		
		
		if (galleryGroups[group][nextKey]){
			$nextBtn.removeClass("disabled").unbind("click").bind("click", function(){
				galleryGroups[group][nextKey].click();
			});
		}
		else
			$nextBtn.addClass("disabled").unbind("click");
		
		
		if (galleryGroups[group][prevKey]){
			$prevBtn.removeClass("disabled").unbind("click").bind("click", function(){
				galleryGroups[group][prevKey].click();
			});
		}
		else
			$prevBtn.addClass("disabled").unbind("click");
	};
	
	
	function setBoxAttrs(attrs){
		$superbox.attr("id", attrs.boxId).attr("class", attrs.boxClasses);
	};
	
	
	function hideBox(){
		$(document).unbind("keydown");
		$loading.hide();
		$nextprev.hide();
		$wrapper.hide().css({position: "fixed", top: 0});
		$innerbox.empty();
	};
	
	function hideAll(callback){
		hideBox();
		$overlay.fadeOut(300, function(){

			hideElts.show();
		});
		galleryMode = false;
	};
	
	function initLoading(callback){
		
		var loading = function(){
			
			
			if($.browser.msie && $.browser.version < 7){
				$wrapper.css({position: "absolute", top:"50%"});
			}
			
			
			hideElts.hide();
			
			$loading.show();
			callback();
		};
		
		if (galleryMode){
			$overlay.css("opacity", settings.overlayOpacity).show();
			loading();
		}
		else {
			$overlay.css("opacity", 0).show().fadeTo(300, settings.overlayOpacity, loading);
		}
	};
	
	
	function prepareBox(){
		$wrapper.show();
		$innerbox.empty();
		$superbox.css({position: "absolute", top: "-99999px"});
	};
	

	function showBox(curSettings, $elt){
	
		$loading.hide();
		
		
		$(document).unbind("keydown").bind("keydown",function(e){
			
			if (e.keyCode == 27)
				hideAll();
			
			if (e.keyCode == 39 && $nextBtn.is(":visible"))
				$nextBtn.click();
			if (e.keyCode == 37 && $prevBtn.is(":visible"))
				$prevBtn.click();
		});
		
	
		$superbox.css({position: "static", top: 0, opacity: 0});
		
		
		if ($.browser.msie && $.browser.version < 8){
			$superbox.css({position: "relative", top:"-50%"});
	
		if ($.browser.msie && $.browser.version < 7)
			$wrapper.css({position: "absolute", top:"50%"});
		}
		
		if ( $(window).height() < $wrapper.height() ){
			$wrapper.css({position: "absolute", top: ($wrapper.offset().top + 10) + "px"});
		}
		
		settings.beforeShow();
		
		$superbox.fadeTo(300,1);
		
	};
	
	
	function createElements(){
		if (!$.superbox.elementsReady){
		    
			
			$overlay = $('<div id="superbox-overlay"></div>').appendTo("body").hide();
			
			
			$wrapper = $('<div id="superbox-wrapper"></div>').appendTo("body").hide();
			
			
			$container = $('<div id="superbox-container"></div>').appendTo($wrapper);
			
			
			$superbox = $('<div id="superbox"></div>').appendTo($container);
			
		
			$innerbox = $('<div id="superbox-innerbox"></div>').appendTo($superbox);
			
			
			$nextprev = $('<p class="nextprev"></p>').appendTo($superbox).hide();
			$prevBtn = $('<a class="prev"><strong><span>'+ settings.prevTxt +'</span></strong></a>').appendTo($nextprev);
			$nextBtn = $('<a class="next"><strong><span>'+ settings.nextTxt +'</span></strong></a>').appendTo($nextprev);
			
			$closeBtn = $('<p class="close"><a><strong><span>'+ settings.closeTxt +'</span></strong></a></p>').prependTo($superbox).find("a");
			
			$loading = $('<p class="loading">'+ settings.loadTxt +'</p>').appendTo($container).hide();
			
			
			$overlay.add($wrapper).add($closeBtn).click(function(){
				hideAll();
			});
			
			
			$superbox.click(function(e){
				e.stopPropagation();
			});
			
			
			$.superbox.elementsReady = true;
		}
	};
	
})(jQuery);
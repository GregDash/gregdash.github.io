var id = "me";

function mobileAndTabletcheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function fbShare(){
		 FB.ui(
          {
            method: 'share',
            href: window.location.href,
            picture : window.location.hostname + "/share.jpg"
          },
          // callback
          function(response) {
            if (response && !response.error_message) {
                ga("send",{hitType:"event",eventCategory:"share",eventAction:"fb",eventLabel:"share-fb"});
            } else {
            }
          }
        );
}

function twitterShare(){
        var msg = encodeURIComponent(twitterCopy);
        popupwindow("https://twitter.com/intent/tweet?text=" + msg, "tweet", 650, 250);
}

$(document).ready(function(){/* off-canvas sidebar toggle */
$('[data-toggle=offcanvas]').click(function() {
  	$(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});

$(document).on("click", ".fb-share", function(){
	fbShare();
});

$(document).on("click", ".twitter-share", function(e){
	twitterShare();
});


$(document).on("click", ".link", function(e){
	if($(e.currentTarget).data('fbshare')){
		 fbShare();
		 return;
	}
	else if($(e.currentTarget).data('twittershare')){	
		 twitterShare();
		 return;
	}
	var url = $(e.currentTarget).data('url');
	ga("send",{hitType:"event",eventCategory:"link",eventAction:"click",eventLabel: url});
	var opt = $("#options").find(".var");
	var sync = true;
	for(var i = 0; i < opt.length; i++){
		var name = $(opt[i]).data('name');
		var value = $(opt[i]).val();
		url = url.replace("{" + name +"}", value);
		if($(e.currentTarget).data('subject')){
			url = url.replaceAll("{subject}", $(e.currentTarget).data('subject'));
		}
		if($(e.currentTarget).data('suffix')){
			url = url.replaceAll("{suffix}", $(e.currentTarget).data('suffix'));
		}
	}
	url = url.replace(/([^:]\/)\/+/g, "$1");
	if(url.indexOf('{friend}') > -1){ 
		var friend = $(e.currentTarget).closest(".table").find(".friend-input").val();
		$.ajax({
		  type: "POST",
		  url: '/get-fb-id.php',
		  data: {
		  	url : friend
		  },
		  success: function(res){
		  	var data = JSON.parse(res);
		  	window.open(url.replaceAll("{friend}", data.id).replaceAll("{id}", id));
		  }
		});

		sync = false;
	}
	if(sync)
		window.open(url.replaceAll("{id}", id));
});
$(document).on("change", ".var", function(e){
	var option = ($(e.target).closest(".option"));
	var toggle = $(option).find(".var").find(":selected").data("toggle");
	var cImg = $(option).find(".var").find(":selected").data("img");
	console.log($(option).find(".var").find(":selected").data("default"));
	if($(option).find(".var").find(":selected").data("default") == undefined){
		option.addClass("inuse");
	}
	else{
		option.removeClass("inuse");
	}
	if(cImg){
		option.find(".option-icon").attr("src", cImg);
	}
	else{
		option.find(".option-icon").attr("src", $(option).data('img'));
	}
	$(option).find(".toggle").hide();
		$(option).find(".var").css("width", "100%");
	if(toggle){
		$(option).find(".var").css("width", "25%");
		$(option).find(".toggle." + toggle).show();
	}
});

$(document).on("mouseover", "table", function(e){
	var id = ($(e.currentTarget).attr("id"));
	$(".no-" + id).addClass("disabled");
});
$(document).on("mouseleave", "table", function(e){
	var id = ($(e.currentTarget).attr("id"));
	$(".no-" + id).removeClass("disabled");
});

$("#searchbar").submit(function(e){
	$("body").addClass("loading");
	ga("send",{hitType:"event",eventCategory:"search",eventAction:"submit",eventLabel:"search-submit"});
	e.preventDefault();
	var data = {
		url : $("#searchbar-value").val()
	}
	$.ajax({
	  type: "POST",
	  url: '/get-fb-id.php',
	  data: data,
	  success: function(res){
	  	ga("send",{hitType:"event",eventCategory:"search",eventAction:"success",eventLabel:"search-subbess"});
	  	var data = JSON.parse(res);
	  	if(data.error){
	  		$(".target-error").show();
	  	}
	  	else{
	  		$(".target-error").hide();
		  	id = data.id;
		  	$(".target-notloaded").hide();
		  	$(".target-loaded").show();
		  	if(id != "me"){
		  		$("#target-id").html("<a target='_blank' href='https://facebook.com/profile.php?id=" + id + "'>#" + id + "</a>" );	  		
		  	}
		  	else{
		  		$("#target-id").html(""); 
		  	}
		  	$("body").addClass("app");
		  	$("body").removeClass("loading");
	  	}
	  }
	});

});
/*if(mobileAndTabletcheck()){
	$("#desktop-content").hide();
	$("#mobile-content").show();
	ga("send",{hitType:"event",eventCategory:"mobile",eventAction:"denied",eventLabel:"mobile-denied"});
}*/
});


    function popupwindow(url, title, w, h) {
          var left = (screen.width/2)-(w/2);
          var top = (screen.height/2)-(h/2);
          return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    }


/*
 * BlockAdBlock 3.2.1
 * Copyright (c) 2015 Valentin Allaire <valentin.allaire@sitexw.fr>
 * Released under the MIT license
 * https://github.com/sitexw/BlockAdBlock
 */

(function(window) {
	var BlockAdBlock = function(options) {
		this._options = {
			checkOnLoad:		false,
			resetOnEnd:			false,
			loopCheckTime:		50,
			loopMaxNumber:		5,
			baitClass:			'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
			baitStyle:			'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;',
			debug:				false
		};
		this._var = {
			version:			'3.2.1',
			bait:				null,
			checking:			false,
			loop:				null,
			loopNumber:			0,
			event:				{ detected: [], notDetected: [] }
		};
		if(options !== undefined) {
			this.setOption(options);
		}
		var self = this;
		var eventCallback = function() {
			setTimeout(function() {
				if(self._options.checkOnLoad === true) {
					if(self._options.debug === true) {
						self._log('onload->eventCallback', 'A check loading is launched');
					}
					if(self._var.bait === null) {
						self._creatBait();
					}
					setTimeout(function() {
						self.check();
					}, 1);
				}
			}, 1);
		};
		if(window.addEventListener !== undefined) {
			window.addEventListener('load', eventCallback, false);
		} else {
			window.attachEvent('onload', eventCallback);
		}
	};
	BlockAdBlock.prototype._options = null;
	BlockAdBlock.prototype._var = null;
	BlockAdBlock.prototype._bait = null;
	
	BlockAdBlock.prototype._log = function(method, message) {
		console.log('[BlockAdBlock]['+method+'] '+message);
	};
	
	BlockAdBlock.prototype.setOption = function(options, value) {
		if(value !== undefined) {
			var key = options;
			options = {};
			options[key] = value;
		}
		for(var option in options) {
			this._options[option] = options[option];
			if(this._options.debug === true) {
				this._log('setOption', 'The option "'+option+'" he was assigned to "'+options[option]+'"');
			}
		}
		return this;
	};
	
	BlockAdBlock.prototype._creatBait = function() {
		var bait = document.createElement('div');
			bait.setAttribute('class', this._options.baitClass);
			bait.setAttribute('style', this._options.baitStyle);
		this._var.bait = window.document.body.appendChild(bait);
		
		this._var.bait.offsetParent;
		this._var.bait.offsetHeight;
		this._var.bait.offsetLeft;
		this._var.bait.offsetTop;
		this._var.bait.offsetWidth;
		this._var.bait.clientHeight;
		this._var.bait.clientWidth;
		
		if(this._options.debug === true) {
			this._log('_creatBait', 'Bait has been created');
		}
	};
	BlockAdBlock.prototype._destroyBait = function() {
		window.document.body.removeChild(this._var.bait);
		this._var.bait = null;
		
		if(this._options.debug === true) {
			this._log('_destroyBait', 'Bait has been removed');
		}
	};
	
	BlockAdBlock.prototype.check = function(loop) {
		if(loop === undefined) {
			loop = true;
		}
		
		if(this._options.debug === true) {
			this._log('check', 'An audit was requested '+(loop===true?'with a':'without')+' loop');
		}
		
		if(this._var.checking === true) {
			if(this._options.debug === true) {
				this._log('check', 'A check was canceled because there is already an ongoing');
			}
			return false;
		}
		this._var.checking = true;
		
		if(this._var.bait === null) {
			this._creatBait();
		}
		
		var self = this;
		this._var.loopNumber = 0;
		if(loop === true) {
			this._var.loop = setInterval(function() {
				self._checkBait(loop);
			}, this._options.loopCheckTime);
		}
		setTimeout(function() {
			self._checkBait(loop);
		}, 1);
		if(this._options.debug === true) {
			this._log('check', 'A check is in progress ...');
		}
		
		return true;
	};
	BlockAdBlock.prototype._checkBait = function(loop) {
		var detected = false;
		
		if(this._var.bait === null) {
			this._creatBait();
		}
		
		if(window.document.body.getAttribute('abp') !== null
		|| this._var.bait.offsetParent === null
		|| this._var.bait.offsetHeight == 0
		|| this._var.bait.offsetLeft == 0
		|| this._var.bait.offsetTop == 0
		|| this._var.bait.offsetWidth == 0
		|| this._var.bait.clientHeight == 0
		|| this._var.bait.clientWidth == 0) {
			detected = true;
		}
		if(window.getComputedStyle !== undefined) {
			var baitTemp = window.getComputedStyle(this._var.bait, null);
			if(baitTemp && (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden')) {
				detected = true;
			}
		}
		
		if(this._options.debug === true) {
			this._log('_checkBait', 'A check ('+(this._var.loopNumber+1)+'/'+this._options.loopMaxNumber+' ~'+(1+this._var.loopNumber*this._options.loopCheckTime)+'ms) was conducted and detection is '+(detected===true?'positive':'negative'));
		}
		
		if(loop === true) {
			this._var.loopNumber++;
			if(this._var.loopNumber >= this._options.loopMaxNumber) {
				this._stopLoop();
			}
		}
		
		if(detected === true) {
			this._stopLoop();
			this._destroyBait();
			this.emitEvent(true);
			if(loop === true) {
				this._var.checking = false;
			}
		} else if(this._var.loop === null || loop === false) {
			this._destroyBait();
			this.emitEvent(false);
			if(loop === true) {
				this._var.checking = false;
			}
		}
	};
	BlockAdBlock.prototype._stopLoop = function(detected) {
		clearInterval(this._var.loop);
		this._var.loop = null;
		this._var.loopNumber = 0;
		
		if(this._options.debug === true) {
			this._log('_stopLoop', 'A loop has been stopped');
		}
	};
	
	BlockAdBlock.prototype.emitEvent = function(detected) {
		if(this._options.debug === true) {
			this._log('emitEvent', 'An event with a '+(detected===true?'positive':'negative')+' detection was called');
		}
		
		var fns = this._var.event[(detected===true?'detected':'notDetected')];
		for(var i in fns) {
			if(this._options.debug === true) {
				this._log('emitEvent', 'Call function '+(parseInt(i)+1)+'/'+fns.length);
			}
			if(fns.hasOwnProperty(i)) {
				fns[i]();
			}
		}
		if(this._options.resetOnEnd === true) {
			this.clearEvent();
		}
		return this;
	};
	BlockAdBlock.prototype.clearEvent = function() {
		this._var.event.detected = [];
		this._var.event.notDetected = [];
		
		if(this._options.debug === true) {
			this._log('clearEvent', 'The event list has been cleared');
		}
	};
	
	BlockAdBlock.prototype.on = function(detected, fn) {
		this._var.event[(detected===true?'detected':'notDetected')].push(fn);
		if(this._options.debug === true) {
			this._log('on', 'A type of event "'+(detected===true?'detected':'notDetected')+'" was added');
		}
		
		return this;
	};
	BlockAdBlock.prototype.onDetected = function(fn) {
		return this.on(true, fn);
	};
	BlockAdBlock.prototype.onNotDetected = function(fn) {
		return this.on(false, fn);
	};
	
	window.BlockAdBlock = BlockAdBlock;
	
	if(window.blockAdBlock === undefined) {
		window.blockAdBlock = new BlockAdBlock({
			checkOnLoad: true,
			resetOnEnd: true
		});
	}
})(window);




// Function called if AdBlock is not detected
function adBlockNotDetected() {
}
// Function called if AdBlock is detected
function adBlockDetected() {
 //ga("send",{hitType:"adblock-detected",eventCategory:"adblock",eventAction:"detected",eventLabel: "adblock-detected"});
 if(localStorage.getItem('nodonate') != "true"){
  document.getElementById("ab-only").style.display = "block";
 }
}


// Recommended audit because AdBlock lock the file 'blockadblock.js' 
// If the file is not called, the variable does not exist 'blockAdBlock'
// This means that AdBlock is present
if(typeof blockAdBlock === 'undefined') {
    adBlockDetected();
} else {
    blockAdBlock.onDetected(adBlockDetected);
    blockAdBlock.onNotDetected(adBlockNotDetected);
    // and|or
    blockAdBlock.on(true, adBlockDetected);
    blockAdBlock.on(false, adBlockNotDetected);
    // and|or
    blockAdBlock.on(true, adBlockDetected).onNotDetected(adBlockNotDetected);
}

// Change the options
blockAdBlock.setOption('checkOnLoad', false);
// and|or
blockAdBlock.setOption({
    debug: true,
    checkOnLoad: false,
    resetOnEnd: false
});

window.onload = function(){
 blockAdBlock.check();
}

function noDonate(){
	ga("send",{hitType:"donate-no",eventCategory:"donate",eventAction:"no",eventLabel: "donate-no"});
 localStorage.setItem('nodonate', true);
  document.getElementById("ab-only").style.display = "none";
}
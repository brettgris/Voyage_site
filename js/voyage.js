var Voyage = Voyage || {};

(function ($, Voyage) {
	var PROJECT = false;
	var $marquee;
	
	Voyage.Init = ( function(){
		/***************
		INIT
		****************/
		function init(){
			if ( Modernizr.touch ) $('.project-item-list').addClass("project-item-touch");
			else $('.project-item-list').addClass("project-item-over");

			Voyage.Menu.init();
			Voyage.Marquee.init();
			Voyage.Projects.init();
            Voyage.ProjectView.init();
			Voyage.Contact.init();
		}		
						
		/***************
		PUBLIC
		****************/
		return {
			init:init 	
		}
	})();
	
	Voyage.Menu = ( function(){
		/***************
		INIT
		****************/
		function init(){
			$('.mobile-menu a').click( toggleMobileMenu );
			
			
		   
			$('.nav-bar a').click( gotoPage );
			$('.mobile-link').click( gotoPage )
			$('.logo').click( gotoPage );
          
			$('.mobile-link').click(hideMobileMenu);
			
		}
		
		/***************
		GOTOPAGE
		****************/
		function gotoPage(){
			var p = $(this).attr('path');
			
			if ( !PROJECT ) {
				$(window).scrollTo( p, 250 );
			} else {
				Voyage.ProjectView.hideProject( p );
			}
		}
		
		
		/***************
		TOGGLE MOBILE MENU
		****************/
		function toggleMobileMenu(){
			if ( $('.mobile-container').css('display')=="none" ) showMobileMenu();
			else hideMobileMenu();
		}
		
		/***************
		SHOW MOBILE MENU
		****************/
		function showMobileMenu(){
			TweenLite.to( $('.header-bar'), .25, {
				'top':180
			});
			
			$('#header').height(250);
			
			$('.mobile-container').show();
			$('.mobile-menu a div').hide();
			$('.mobile-menu a').addClass('mobileclose');
			TweenLite.to( $('.mobile-container'), .25, {
				'top':0
			});
		}
		
		/***************
		HIDE MOBILE MENU
		****************/
		function hideMobileMenu(){
			TweenLite.to( $('.header-bar'), .25, {
				'top':0
			});
			
			$('.mobile-menu a div').show();
			$('.mobile-menu a').removeClass('mobileclose');
			TweenLite.to( $('.mobile-container'), .25, {
				'top':-180,
				onComplete:function(){
					$('.mobile-container').hide();
					$('#header').height(70);
				}
			});

		}
		
		/***************
		PUBLIC
		****************/
		return {
			init:init 	
		}
	})();
	
	Voyage.Projects = ( function(){
		var filterlinks, projects, link, tl, types, f;
		var SPEED = .2;
		
		/***************
		INIT
		****************/
		function init(){
			setUpFilters();
			setUpProjects();
			
			tl = new TimelineLite();
		}
		
		/***************
		SETUP FILTERS
		****************/
		function setUpFilters(){
			types=['artdirection', 'development', 'design', 'web', 'tablet', 'mobile', 'flash', 'game', 'social', 'banners'];
		
			filterlinks = $('.work-filter-types a');
			filterlinks.click(filterProjects);
			
			f = [];
			filterlinks.each(function(i){
				$(this).attr('type', types[i] );
				f.push ( {t:$(this),n:0} );
			});
			
			
		}
		
		/***************
		SETUP PROJECTS
		****************/
		function setUpProjects(){
			projects = $('.project-item-list');
			
			projects.each(function(i){
				var t = $(this);
				t.attr("num", i);
				
				for ( var i=0;i<types.length;i++) {
					if (t.attr(types[i])=="true") f[i].n++;
				}
			});
			
			$('.project-item-over').hover(function(){
				TweenLite.to ( $(this), .2, {
					'height':'450px',
					'margin-top':'-50px'
				});
			}, function(){
				TweenLite.to ( $(this), .2, {
					'height':'350px',
					'margin-top':'0px'
				});
			});
			
			//HIDE USED FILTERS
			filterlinks.each(function(i){
				if (f[i].n==0) f[i].t.hide();
			});
		}
		
		/***************
		FILTER
		****************/
		function filterProjects(){
			link= $(this);
			
			if ( !link.hasClass('selected') ){
				filterlinks.removeClass( 'selected' );
				link.addClass( 'selected' );
				
				tl.pause();
				tl = new TimelineLite();
				
				for ( var i=projects.length-1;i>=0;i--){
					if ( projects.eq(i).css('display') == "block" ) {
						tl.add( TweenLite.to ( projects.eq(i),SPEED,{ height:'0px',ease:Quad.easeOut, onComplete:function(){
							this.target.hide()
						}}) );
					}
				}
				
				tl.call( bringIn );
			} else {
				link.removeClass('selected');
				
				tl.pause();
				tl = new TimelineLite();
				
				for ( var i=projects.length-1;i>=0;i--){
					if ( projects.eq(i).css('display') == "block" ) {
						tl.add( TweenLite.to ( projects.eq(i),SPEED,{ height:'0px',ease:Quad.easeOut, onComplete:function(){
							this.target.hide()
						}}) );
					}
				}
				
				tl.call( allIn );
			}
		}
		
		/***************
		PROJECTS IN
		****************/
		function bringIn(){
			for ( var i=0;i<projects.length;i++){
				if ( $(projects[i]).attr(link.attr('type'))=="true") {
					
					projects.eq(i).css( 'height', '0px' ).show();
					tl.add( TweenLite.to ( projects.eq(i),SPEED,{ height:'350px',ease:Quad.easeOut, onComplete:function(){
						this.target.css('height', '');
					}}) );
				}
			}
		}
		
		/***************
		SHOW ALL
		****************/
		function allIn(){
			for ( var i=0;i<projects.length;i++){
				projects.eq(i).css( 'height', '0px' ).show();
				tl.add( TweenLite.to ( projects.eq(i),SPEED,{ height:'350px',ease:Quad.easeOut}) );
			}
		}
						
		/***************
		PUBLIC
		****************/
		return {
			init:init 	
		}
	})();
	
    Voyage.ProjectView = ( function(){
    	var target, projects, notviewed = [], viewed = [], all = [];
    
    	/***************
		INIT
		****************/
    	function init(){
	    	$('.project-view').hide();
	    	$('.view-project-btn').click(showProject);
	    	clicks();
    	}
    	
    	function clicks(){
	    	$('.close-project-btn').click(function(){
		    	hideProject('#work');
	    	});
	    	
	    	$('.projview-next .view-project-btn').click(switchProject);
    	}
    	
    	/***************
		SHOW PROJECT
		****************/
    	function showProject(){
    		PROJECT = true;
			Voyage.Marquee.stop();
				
			setupProject( $(this), $('.project-view') );	
			
				
    		$(window).scrollTo(0,300, function(){
	    		TweenMax.to($('.container'), .3, {scaleX:.7, scaleY:.7, opacity:0, transformOrigin:"center top", delay:.1, onComplete:function(){
		    		$('.container').hide();
		    		$('.project-view').css("top","100%").show();
		    		TweenMax.to($('.project-view'), .3, {top:"0%", onComplete:function(){
			    		clicks();
		    		}});
	    		}});
    		});
    	}
    	
    	/***************
		HIDE PROJECT
		****************/
    	function hideProject(p){
    		target = p;
    	
    		$(window).scrollTo(0,300, function(){
    			TweenMax.to($('.project-view'), .3, {top:"100%", delay:.1, onComplete:function(){
	    			$('.project-view').hide();
	    			$('.container').show();
		    		TweenMax.to($('.container'), .3, {scaleX:1, scaleY:1, opacity:1, transformOrigin:"center top", onComplete:function(){
			    		PROJECT = false;
			    		
			    		$('.container').attr("style","");
			    		
			    		Voyage.Marquee.start();
			    		setTimeout(delayScroll, 250 );
		    		}});
    			}});
    		});
    	}
    	
    	/***************
		SETUP PROJECT
		****************/
    	function setupProject(t,p){
    		var c = $('#'+t.attr("t"));
    		c.attr('viewed', 'true');
    	
			p.find(".project-marquee").css( 'background-image', c.find('.project-item-list').css( 'background-image' ) );
			p.find(".projview-copy").html( c.find('.project-content').html() );
			p.find(".projview-ta").css( 'background-image', c.find('.project-ta').css( 'background-image' ) );
			p.find(".projview-title").text( c.find('.project-title').text() );
			p.find(".pj-left p").html( c.find(".project-features").html() );
			
			if ( c.find('.project-item-list').attr("mobile")!="true" ) p.find(".notmobile").addClass("shownotmobile");
			else p.find(".notmobile").removeClass("shownotmobile");
			
			if ( c.find('.project-item-list').attr("tablet")!="true" ) p.find(".nottablet").addClass("shownottablet");
			else p.find(".nottablet").removeClass("shownottablet");
    		
    		var lk = c.find('.project-link').text();
    		if (lk=="") {
	    		$('.pj-right').hide();
    		} else {
	    		p.find(".pj-right a").attr( 'href', lk );
	    		$('.pj-right').show();
    		}
    		
    		p.find('.paging-scroll').html("");
    		
    		//RANDOM PROJECTS - SWITCH FROM JUST 
    		notviewed = [];
    		viewed = [];
    		projects = $('.project-item')
    		projects.each(function(i){ 
	    		var t = $(this);
	    		if( t.attr("viewed")!="true" ) notviewed.push(t);
	    		else viewed.push(t);
    		});
    		
    		randomizeArray(notviewed);
    		randomizeArray(viewed);
    		
    		for (var i in notviewed) nextProject(notviewed[i],p,t.attr("t"), "not");
    		for (var i in viewed) nextProject(viewed[i],p,t.attr("t"), "viewed");
    	}
    	
    	/***************
		SET NEXT PROJECT BTN
		****************/
    	function nextProject(t,p,c, v){
    		var nextbtn = '<div class="projview-next" href="javascript:void(0);">';
    		nextbtn += '<div class="projbtn-copy">';
    		nextbtn += '<div class="projbtn-ta"></div>';
			nextbtn += '<div class="projbtn-title"></div>';
			nextbtn += '<a href="javascript:void(0);" class="view-project-btn" t="">';
			nextbtn += 'VIEW PROJECT';
			nextbtn += '<span class="view-project-over">VIEW PROJECT</span>';
	        nextbtn += '</a>';
			nextbtn += '</div>';
			nextbtn += '</div>';
			
			var pj = $('#'+t.attr("id"));
			console.log( t.attr('id'), v, pj.find('.project-title').text() );
			
			if ( t.attr('id') != c ) {
				var nb = $(nextbtn).appendTo( p.find('.paging-scroll') );
				nb.css( 'background-image', pj.find('.project-item-list').css( 'background-image' ) );
				
				nb.find('.projbtn-ta').css( 'background-image', pj.find('.project-ta').css( 'background-image' ) );
				nb.find(".projbtn-title").text( pj.find('.project-title').text() );
				nb.find('.view-project-btn').attr('t',t.attr('id'));
			}
    	}
    	
    	function randomizeArray(arr){
    		var na = [];
    		for ( var i in arr ) {
	    		na[i] = {o:arr[i],i:Math.random()*10000};
    		}
    		
    		na.sort(function(a, b){return a.i-b.i});
    		
    		for ( var i in na ) {
    			arr[i] = na[i].o;
    		}
    		
    	}
    	
    	/***************
		SETUP PROJECT
		****************/
		function switchProject(){
			var t = $(this);
			
			var fp = $('.project-view');
			var np = fp.clone();
			
			np.insertAfter ( $('#header') );
			setupProject(t,np)
			
			np.css('left','100%');
			
			$(window).scrollTo(0,300, function(){
				TweenMax.to(fp, .3, {scaleX:.7, scaleY:.7, opacity:0, transformOrigin:"left 15%", delay:.1, onComplete:function(){
					fp.remove();
					TweenMax.to(np, .3, {left:"0%", onComplete:function(){
						clicks();
					}});
				}});
			});
		}
    	
    	/***************
		DELAY SCROLL
		****************/
    	function delayScroll(){
	    	$(window).scrollTo( target, 300 );
    	}	
    						
		/***************
		PUBLIC
		****************/
		return {
			init:init,
			hideProject: hideProject 	
		}
	})();
    
	Voyage.Contact = ( function(){
		var name, email, message;
		
		/***************
		INIT
		****************/
		function init(){
			$('.contact-submit').click( sendMessage );
			spamFix( $('.contact-p div') );
			spamFix( $('.contact-e a') );
		}
		
		function spamFix(div){
			var s = div.text();
			s = s.split("/").join("");
			div.text(s);
			
			s = div.attr('href');
			if (s!=undefined){
				s = s.split("/").join("");
				div.attr("href", s);
			}
			
		}	
		
		function sendMessage(){
			if ( validate() ) {
				$('.contact-wrapper').hide();
			
				var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
				$.ajax({
		            type: "POST",
		            url: "http://voyagecreative.com/wp-content/themes/voyage/data/mail.php",
		            data: dataString,
		            success: function(data){
		            	$('.send-success').fadeIn("fast");
		            }
		        });	
			}
		}
		
		function validate(){
			
			name = document.forms["contactform"]["contactname"].value;
			email = document.forms["contactform"]["contactemail"].value;
			message = document.forms["contactform"]["contactmessage"].value;
			
			if ( name.length < 1 ) {
				$('.errormessage').text( "* Please enter a valid name" ).show()
				return false; 
			} 
			
			var atpos=email.indexOf("@");
			var dotpos=email.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
			  $('.errormessage').text( "* Please enter a valid email address" ).show()
			  return false;
			}
			
			if ( message.length < 1 ) {
				$('.errormessage').text( "* Please enter a valid message" ).show()
				return false; 
			}
			
			$('.errormessage').hide();
			
			return true;
		}	
						
		/***************
		PUBLIC
		****************/
		return {
			init:init 	
		}
	})();
	
	Voyage.Marquee = (function(){
		var time= 7000,
	    	speed= 500,
			space= 14,
			$headline, $type, $voyage, $copy, $items, to, $b;
			current = 0, mobile = false;
		
		/***************
		INIT
		****************/	
		function init(){
			current = 0;
			
			$headline= $(".voyage-headline");
			$type= $(".voyage-type");
			$voyage= $(".voyage-voyage");
			$copy= $(".voyage-copy");
			$items= $(".marquee-item");
			$b = $('#marquee .view-project-btn');
			
			positionHeadline();
			if( $items.length>1 ) startTime();
		}
		
		/*****************
		positionHeadline
		******************/
		function positionHeadline(){
			$copy.text( $items.eq( current ).attr("copy") );
    		$type.html( $items.eq( current ).attr("title").toUpperCase()+"&nbsp;" );
    		$b.attr('t', $items.eq( current ).attr("t") );
		}
		
		/*****************
		START IF POSSIBLE
		******************/
		function startIfPossible(){
			if( $items.length>1 ) startTime();
		}
		
		/*****************
		START TIMER
		******************/
		function startTime() {
			to = setTimeout(function(){
				changeItem();
			}, time );
		}
		
		/*****************
		START TIMER
		******************/
		function stopTime() {
			clearTimeout( to );
		}
		
		/*****************
		CHANGE ITEM
		******************/
		function changeItem() {
			if ( $(window).width()*.64 < $type.width()+$voyage.width() ) {
				$type.fadeOut( speed, function(){
					$copy.slideUp("fast", function(){
						$items.eq(current).fadeOut("fast", function(){
							nextItem();
						});
					});
				} );
			} else {
				$type.animate( {width: '0px'}, speed, function(){
					$type.height( 0 );
					$copy.slideUp("fast", function(){
						$items.eq(current).fadeOut("fast", function(){
							nextItem();
						});
					});
				} );
			}
					
		}
		
		/*****************
		NEXT ITEM
		******************/
		function nextItem() {
			current++;
			if (current==$items.length) current=0;
			$copy.text( $items.eq( current ).attr("copy") );
			$type.html( $items.eq( current ).attr("title").toUpperCase()+"&nbsp;" );
			$b.attr('t', $items.eq( current ).attr("t") );
			
			$type.css( {'height': 'auto', 'width':'auto'}  );
			
			if ( $(window).width()*.64 < $type.width()+$voyage.width() ) {
				$items.eq(current).fadeIn("fast", function(){
					$copy.slideDown("fast", function(){
						$type.css( {'height': 'auto', 'width':'auto'}  );
						$type.fadeIn( "fast", function(){
							startTime();
						});
					});
				});
			} else {
				$type.css( {'width':'0px'}  );
				$items.eq(current).fadeIn("fast", function(){
					$copy.slideDown("fast", function(){
						$type.show();
						$type.css( {'height': 'auto', 'width':'auto'}  );
						var w = $type.width();
						$type.css( {'width':'0px'}  );
						$type.animate( {width: w+'px'}, speed, function(){
							$type.css( {'width':'auto'}  );
							startTime();
						});;
					});
				});
			}
		}
		
		/***************
		RESIZE
		****************/
		function resized(){
			if (!mobile) {
				if ( $(window).width()<960 ){
					mobile = true;
					clearTimeout( to );
					$type.text()
				}
			} else {
				if ( $(window).width()>960 ){
					mobile = false;
				}
			}
		}

		
		/***************
		PUBLIC
		****************/
		return {
			init:init,
			start: startIfPossible,
			stop: stopTime	
		}
	})();
	
	$(document).ready(function(){
		Voyage.Init.init();
	});
})(jQuery,Voyage);

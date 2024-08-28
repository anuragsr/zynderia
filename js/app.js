var app = angular.module('fpApp', []);

app.controller('fpCtrl', function($rootScope, $scope, $filter, $http, $compile) {  
  
  // Private properties and methods
  var el;
  var elLeft;
  var elRight;
  var sliderArr;
  var slideWidth;
  var slideHeight;
  var fullSliders;
  var slideContWidth;
  var slideContHeight;
  var animating = false;
  var animatingFull = false;
  
  // For Info section
  var keyCount = 1;
  var scrollCount = 1;
  var scrollDist = 0;
  var scrollDir = "down";
  var $target = $(".info-ctn-inner");

  function onResize(e){
    setTimeout(function(){
      $(".nano").nanoScroller();

      sliderArr = [
        $(".slider1"), // Main Image Slider 
        $(".slider2"), // Floorplan Slider 
        $(".slider3")  // Map Slider
      ];

      sliderArr.forEach(function(slider){
        slideContWidth = slider.width();
        slideContHeight = slider.height();

        slider.find('img').css({ 
          height: slideContHeight,
          width: "auto"
        });

        slideWidth = $(slider.find('img')[1]).width();    
        slideHeight = $(slider.find('img')[1]).height();    

        if(slideContWidth < slideWidth){
          slider.find('img').css({ 
            width: slideContWidth,
            height: "auto"
          });

          slideWidth = $(slider.find('img')[1]).width();
          slideHeight = $(slider.find('img')[1]).height();
        }

        // var sliderUlWidth = 0;
        // slider.find('img').toArray().forEach(function(obj){
        //   sliderUlWidth+= $(obj).width() + 20;
        // })

        slider.find('.slides-ctn').css({ 
          width: 100000//sliderUlWidth
        });

        slider.find('.slides-ctn').css({
            left: slideContWidth/2 - (slideWidth/2 + 10 + $(slider.find('img')[0]).width())
        });

        slider.find('a.control_prev, a.control_next').css({
            top: slideHeight/2 - slider.find('a.control_prev').height()/2
        });
      })      

      fullSliders = [
        { arr: $scope.options.mainImg, item: $(".fs1 .fs-ctn"), fullIdx: 0},
        { arr: $scope.options.fpImg, item: $(".fs2 .fs-ctn"), fullIdx: 0},
        { arr: $scope.options.mapImg, item: $(".fs3 .fs-ctn"), fullIdx: 0},
        { arr: $scope.options.mainImg, item: $(".fst1 .fs-ctn"), fullIdx: 0}
      ]

    }, 500)
  }

  $scope.options = {
    title: "Zynderia / Locations / Los Angeles / Creative Compound / The Banks",
    titleArr: [
      "Zynderia",
      "Locations",
      "Los Angeles",
      "Creative Compound"
    ],
    locations: [
      {id: "D", value: "Stage D: The Hangar", img:"img/pre1.png"},
      {id: "A", value: "Stage A: Stage A", img:"img/pre2.png"},
      {id: "B", value: "Stage B: Stage B", img:"img/pre3.png"},
      {id: "C", value: "Stage C: Stage C", img:"img/pre4.png"}
    ],
    properties: [
      {id:1, value:"The Banks"}
    ],
    bookNowForm:{
      prodType:[
        "Media Production",
        "Fashion Agency",
        "Production Type 3",
        "Production Type 4"
      ],
      prodTypeSel:"",
      dayLength:[
        "2 Hours",
        "5 Hours",
        "12 Hours",
        "24 Hours"
      ],
      dayLengthSel:"",
      noPeople:[
        "0 - 15 People",
        "15 - 30 People",
        "31 - 45 People",
        "> 45"
      ],
      noPeopleSel:"",
      from: new Date,
      to: new Date
    },
    showBookNow: false,
    showFilter: false,
    showThumbnails: false,
    showImgFull: false,
    showImgMainFull: false,
    showIframe: false,
    showSelectOpts: false,
    showIns: false,
    allImg:[
      {val: "img/zynderia-stage-g-01.jpg", type:''},
      {val: "img/zynderia-stage-g-02.jpg", type:''},
      {val: "img/zynderia-stage-g-03.jpg", type:''},
      {val: "img/zynderia-stage-g-04.jpg", type:''},
      {val: "img/zynderia-stage-g-05.jpg", type:''},
      {val: "img/zynderia-stage-g-06.jpg", type:''},
      {val: "img/zynderia-stage-g-07.jpg", type:''},
      {val: "img/zynderia-stage-g-08.jpg", type:''},
      {val: "img/zynderia-stage-g-09.jpg", type:''},
      {val: "img/zynderia-stage-g-10.jpg", type:''},
      {val: "img/zynderia-stage-g-11.jpg", type:''},
      {val: "img/zynderia-stage-g-12.jpg", type:''},
      {val: "img/zynderia-stage-g-13.jpg", type:''},
      {val: "img/zynderia-stage-g-14.jpg", type:''},
      {val: "img/zynderia-stage-g-15.jpg", type:''},
      {val: "img/zynderia-stage-g-16.jpg", type:'stair'},
      {val: "img/zynderia-stage-g-17.jpg", type:'stair'},
      {val: "img/zynderia-stage-g-18.jpg", type:''},
      {val: "img/zynderia-stage-g-19.jpg", type:''},
      {val: "img/zynderia-stage-g-20.jpg", type:'stair'},
      {val: "img/zynderia-stage-g-21.jpg", type:''},
      {val: "img/zynderia-stage-g-22.jpg", type:''},
      {val: "img/zynderia-stage-g-23.jpg", type:''},
      {val: "img/zynderia-stage-g-24.jpg", type:''}
    ],
    fpImg:[
      {val:"img/zynderia-stage-g-floorplan-01.jpg"},
      {val:"img/zynderia-stage-g-02.jpg"},
      {val:"img/zynderia-stage-g-03.jpg"},
      {val:"img/zynderia-stage-g-04.jpg"},
      {val:"img/zynderia-stage-g-05.jpg"},
      {val:"img/zynderia-stage-g-06.jpg"},
      {val:"img/zynderia-stage-g-07.jpg"},
      {val:"img/zynderia-stage-g-08.jpg"},
      {val:"img/zynderia-stage-g-09.jpg"},
      {val:"img/zynderia-stage-g-10.jpg"},
      {val:"img/zynderia-stage-g-11.jpg"},
      {val:"img/zynderia-stage-g-12.jpg"}
    ],
    mapImg:[
      {val:"img/map-01.jpg"},
      {val:"img/map-02.jpg"},
      {val:"img/zynderia-stage-g-03.jpg"},
      {val:"img/zynderia-stage-g-04.jpg"},
      {val:"img/zynderia-stage-g-05.jpg"},
      {val:"img/zynderia-stage-g-06.jpg"},
      {val:"img/zynderia-stage-g-07.jpg"},
      {val:"img/zynderia-stage-g-08.jpg"},
      {val:"img/zynderia-stage-g-09.jpg"},
      {val:"img/zynderia-stage-g-10.jpg"},
      {val:"img/zynderia-stage-g-11.jpg"},
      {val:"img/zynderia-stage-g-12.jpg"}
    ],
    bgMain: "img/bg1.jpg"
  }

  $scope.options.fpImgFull = angular.copy($scope.options.fpImg);
  $scope.options.mapImgFull = angular.copy($scope.options.mapImg);

  rightShift($scope.options.fpImg);
  rightShift($scope.options.mapImg);

  $scope.options.currLocation = $scope.options.locations[0];
  $scope.options.previewImg = $scope.options.locations[0].img;

  $scope.options.currProperty = $scope.options.properties[0];

  function moveLeft(parent, arr) {
    if(!animating){        
      animating = true;

      $scope.$apply(function(){
        rightShift(arr);
      });

      slideWidth = $(parent.find('img')[0]).width();
      parent.find('.slides-ctn').css({
        left:parseInt(parent.find('.slides-ctn').css('left')) - slideWidth - 10
      });
      
      // This element Depends on Angular and jQuery scope. rightShift executes later with Angular
      slideWidth = $(parent.find('img')[1]).width();
      
      parent.find('.slides-ctn').animate({
        left: slideContWidth/2 - (slideWidth/2 + 20 + $(parent.find('img')[0]).width())
      }, 500, function () {
        animating = false;
      });
    }
  }

  function moveRight(parent, arr) {
    if(!animating){
      animating = true;        
      slideWidth = $(parent.find('img')[1]).width();
      parent.find('.slides-ctn').animate({
        left:parseInt(parent.find('.slides-ctn').css('left')) - (slideWidth/2 + $(parent.find('img')[2]).width()/2 + 10)
      }, 500, function () {
        $scope.$apply(function(){
          leftShift(arr);
        });
        var len = parent.find('img').length - 1;
        slideWidth = $(parent.find('img')[len]).width();
        parent.find('.slides-ctn').css({
          left:parseInt(parent.find('.slides-ctn').css('left')) + slideWidth + 10
        });
        animating = false;
      });
    }   
  }

  function leftShift(arr){
    var temp = arr[0];
    arr.shift();
    arr.push(temp);
  }

  function rightShift(arr){
    arr.unshift(arr[arr.length - 1]);
    arr.pop();
  }

  function onKeyDown(e){
    // console.log(e.originalEvent)    
    switch(e.originalEvent.keyCode){
      case 27: // Escape
        $scope.$apply(function(){       
          if($scope.options.showThumbnails){
            if($scope.options.showImgFull){
              $scope.backToGallery();
            }else{
              $scope.toggleThumbGallery();
            }
          }
          
          if($scope.options.showImgMainFull){
            $scope.backToImagesMain();
          }

          if($scope.options.showIframe){
            $scope.toggleIframe();
          }

          if($scope.options.showBookNow){
            $scope.toggleBookNow();
          }
        })
      break;

      case 38: // Up Arrow 
        console.log("Up")
        switch($(".fp-section.active").attr("id")){
          case "section0":
            if(scrollDist <= 0){
              scrollDist=0;
            }
            else{
              keyCount = 1;              
              scrollDist-=50;
            }

            if(scrollDist == 0){
              $("i.fa-chevron-down").show();
              $("i.fa-chevron-up").hide();
              $(".more-info-btn").fadeIn();
            }else{
              $(".cont-btn").fadeOut();
              $(".more-info-btn").fadeOut();      
            }

            $target.scrollTop(scrollDist);
          break;

          case "section1":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){
              fullpage_api.moveTo("info")
            }
          break;

          case "section2":
            if(!$scope.options.showIframe){
              fullpage_api.moveTo("images")
            }
          break;

          case "section3":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("3dvr")
            }
          break;

          case "section4":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("floorplan")
            }
          break;

          case "section5":
            fullpage_api.moveTo("maps")
          break;
        }
      break;

      case 40: // Down Arrow
        console.log("Down")
        switch($(".fp-section.active").attr("id")){
          case "section0":

            if($target.scrollTop() + $target.innerHeight() <= $target[0].scrollHeight - 1){
              $(".more-info-btn").fadeOut();
              scrollDist+=50;
            }else{
              $(".more-info-btn").hide();
              $(".cont-btn").show();
              
              $(".cont-btn").css({
                opacity: 0.2*keyCount
              });

              $(".cont-btn h3").css({                
                fontSize: keyCount*0.5 + "rem"
              });

              keyCount++;
            }

            if(keyCount > 6){
              fullpage_api.moveTo('images');
              setTimeout(function(){
                $("i.fa-chevron-up").show();    
                $("i.fa-chevron-down").hide();
                $(".more-info-btn").show();        
                $(".cont-btn").hide();
                keyCount = 1;
              }, 500)
            }

            $target.scrollTop(scrollDist);
          break;
  
          case "section1":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){
              fullpage_api.moveTo("3dvr")
            }
          break;

          case "section2":
            if(!$scope.options.showIframe){
              fullpage_api.moveTo("floorplan")
            }
          break;

          case "section3":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("maps")
            }
          break;

          case "section4":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("services")
            }
          break;
        }
      break;

      case 37: // Left Arrow
        switch($(".fp-section.active").attr("id")){
          case "section1":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.mainImgFull, 0);
              })
            }else if($scope.options.showImgFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.thumbImgFull, 3);
              })
            }else{
              moveLeft($(".slider1"), $scope.options.mainImg);
            }
          break;

          case "section3":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.fpImgFull, 1);
              })
            }else{
              moveLeft($(".slider2"), $scope.options.fpImg);
            }
          break;              

          case "section4":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.mapImgFull, 2);
              })
            }else{
              moveLeft($(".slider3"), $scope.options.mapImg);
            }
          break;          
        }
      break;

      case 39: // Right Arrow
        switch($(".fp-section.active").attr("id")){       
          case "section1":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.mainImgFull, 0);
              })
            }else if($scope.options.showImgFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.thumbImgFull, 3);
              })
            }else{
              moveRight($(".slider1"), $scope.options.mainImg);
            }
          break;

          case "section3":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.fpImgFull, 1);
              })
            }else{
              moveRight($(".slider2"), $scope.options.fpImg);
            }
          break;          

          case "section4":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.mapImgFull, 2);
              })
            }else{
              moveRight($(".slider3"), $scope.options.mapImg);
            }
          break;
        }
      break;
    }
  }

  function setFullSlider(no){
    var slider = fullSliders[no];

    slider.item.css({      
      zIndex:0,
      left: -window.innerWidth
    })
    
    el = slider.item[slider.fullIdx];

    if(slider.fullIdx == 0){
      elLeft = slider.item[slider.item.length - 1];
    }else{
      elLeft = slider.item[slider.fullIdx - 1];      
    }

    if(slider.fullIdx == slider.item.length - 1){
      elRight = slider.item[0];       
    }else{    
      elRight = slider.item[slider.fullIdx + 1];
    }

    $(el).css({
      left: 0,
      zIndex: 1
    })

    $(elLeft).css({
      left: -window.innerWidth,
      zIndex: 1
    })

    $(elRight).css({
      left: window.innerWidth,
      zIndex: 1
    })
  }
  
  // Public properties and methods

  $scope.viewSelectOpts = function(){
    $scope.options.showSelectOpts = true;
  }  

  $scope.hoverOption = function(l){
    $scope.options.previewImg = l.img;
  } 

  $scope.selectLocation = function(l){
    $scope.options.currLocation = l;
    $scope.options.showSelectOpts = false;
  }  

  $scope.filterImages = function(val, fullSlIdx){
    $scope.options.currFilter = val;
    $(".fst1, .fs1").hide();
    $("img.spinner-img").show();
    if(val != 'all'){
      var filtered = $filter('filter')($scope.options.allImg, {type:val});
      $scope.options.mainImg = angular.copy(filtered);
      $scope.options.mainImgFull = angular.copy(filtered);
    }else{
      $scope.options.mainImg = angular.copy($scope.options.allImg);
      $scope.options.mainImgFull = angular.copy($scope.options.allImg);
    }
    $scope.options.thumbImg = angular.copy($scope.options.mainImg);
    $scope.options.thumbImgFull = angular.copy($scope.options.mainImg);
    // $scope.options.showFilter = false;
    rightShift($scope.options.mainImg);
    onResize();
    setTimeout(function(){
      setFullSlider(fullSlIdx);
      $("img.spinner-img").hide();
      $(".fst1, .fs1").show();
    }, 501)
  }

  $scope.filterImages('all', 0);  

  $scope.hideFilter = function(e){
    var clickedOnFilter = $(e.target).hasClass("badge-filter") || $(e.target).hasClass("filter-btn") || $(e.target).hasClass("fa-sliders");
    if(!clickedOnFilter){
      $scope.options.showFilter = false;
      $scope.options.showFilterFS = false;
    }
  }

  $scope.showMoreInfo = function(){
    // console.log(scrollDir)
    if(scrollDir == "up"){
      $('.info-ctn-inner').scrollTop(0);      
      $("i.fa-chevron-down").show();
      $("i.fa-chevron-up").hide();
      scrollDir = "down";
    }else{
      $("i.fa-chevron-up").show();
      $("i.fa-chevron-down").hide();
      $('.info-ctn-inner').scrollTop($('.info-ctn-inner')[0].scrollHeight);      
      scrollDir = "up";
    }
  } 

  $scope.goToImages = function(){
    fullpage_api.moveTo('images');      
  }

  $scope.backToImagesMain = function(){
    onResize();
    $scope.options.showImgMainFull = false;
    $("a.base_arrows").show();  
    $(".menu").css({
      zIndex:1
    })
  }

  $scope.showFullScreen = function(s, no, arr){
    $(".menu").css({
      zIndex:0
    })
    
    $scope.options.showImgMainFull = true;
    var slider = fullSliders[no];
    var val = $filter('filter')(arr, {val:s.val})[0];
    slider.fullIdx = arr.indexOf(val);
    setFullSlider(no);

    $(".fst1, .fs1").show();
    $("img.spinner-img").hide();    
    $("a.base_arrows").hide();
  }

  $scope.fullImgMove = function(dir, arr, no){
    if(!animatingFull){
      animatingFull = true;
      var slider = fullSliders[no];
      if(dir == 'right'){
        
        leftShift(slider.arr)

        if(slider.fullIdx < slider.item.length - 1)
          slider.fullIdx++;
        else
          slider.fullIdx = 0;

        $(el).animate({
          left: -window.innerWidth
        }, 500)

        $(elRight).animate({
          left: 0
        }, 500, function(){
          animatingFull = false;
          setFullSlider(no);
        })
      }else{

        rightShift(slider.arr)

        if(slider.fullIdx > 0)
          slider.fullIdx--;
        else
          slider.fullIdx = slider.item.length - 1;

        $(elLeft).animate({
          left: 0
        }, 500)

        $(el).animate({
          left: window.innerWidth
        }, 500, function(){
          animatingFull = false;
          setFullSlider(no);
        })
      }
    }
  }

  $scope.backToGallery = function(){
    $scope.options.showImgFull = false;
    $(".menu").css({
      zIndex:1
    })
  } 

  $scope.showFullScreenThumb = function(s, no, arr){
    // fullpage_api.setKeyboardScrolling(false);
    $(".menu").css({
      zIndex:0
    })
    $scope.options.showImgFull = true;
    var slider = fullSliders[no];
    var val = $filter('filter')(arr, {val:s.val})[0];
    slider.fullIdx = arr.indexOf(val);
    setFullSlider(no);
    $("img.spinner-img").hide();    
    $(".fst1, .fs1").show();
  }

  $scope.toggleThumbGallery = function(){
    if(!$scope.options.showThumbnails){      
      $scope.options.showThumbnails = true;
    }else{
      $scope.options.showThumbnails = false;
    }

  }

  $scope.showIframe = function(){
    $(".ins-ctn").animate({
      opacity:0
    }, function(){
      $(".ins-ctn").hide();
      $(".ins-ptr").show();
      $(".ins-ptr").animate({
        top: "15vh",
        opacity: 1
      }, 1500, function(){
        $(".ifr-outer").fadeOut(2000);
        $(".ifr-ctn").css("z-index", 0);
        if($scope.options.showIns)
          sessionStorage.setItem("showIns", $scope.options.showIns);
      });
    });
  }
 
  $scope.toggleBookNow = function(){
    if(!$scope.options.showBookNow){
      $scope.options.showBookNow = true;
      $("#book-now-ctn").animate({
        left: 0
      }, 200);
    }else{
      $scope.options.showBookNow = false;
      $("#book-now-ctn").animate({
        left: "-35%"
      }, 200);
    }
  }

  $scope.submitForm = function(){
    console.log($scope.options.bookNowForm)
  }

  // Jquery related functions
  $(function(){

    var myFullpage = new fullpage('#fullpage', {
        anchors: ['info', 'images', '3dvr', 'floorplan', 'maps', 'services'],
        menu: '.menu',
        lockAnchors:true,
        verticalCentered:false,
        animateAnchor:false,
        // scrollBar: true,
        normalScrollElements: ".menu, .badge-pill, #section0, .thumb-ctn, .img-overlay-ctn, .fs-ctn, .control_prev, .control_next",
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        onLeave: function(origin, destination, direction){
          // console.log(origin, destination, direction)
          if(destination.index == 2){
            // Menu Colors
            $(".menu").css({
              color: "#fff"
            })
            $(".pull-down-ctn").css({
              borderColor: "#fff"
            })
            $(".btn-ctn").css({
              color: "#000"
            })

            // Top Nav Link Colors
            $(".header .nav-link, .loc-ctn .nav-link").css({
              color: "#fff"
            })
            $(".header .nav-link, .loc-ctn .nav-link").mouseenter(function() {
              $(this).css("color","#007bff")
            });

            $(".header .nav-link, .loc-ctn .nav-link").mouseleave(function() {
              $(this).css("color","#fff")
            });

            //Animate content box
            $(".ins-ctn").delay(500).animate({left: 0, opacity:1}, 1000, function(){
              $(".note").addClass("anim-note");
            });
          }else{
            // Menu Colors
            $(".menu").css({
              color: "#000"
            })
            $(".pull-down-ctn").css({
              borderColor: "#000"
            })

            // Top Nav Link Colors
            $(".header .nav-link, .loc-ctn .nav-link").css({
              color: "#000"
            })
            $(".header .nav-link, .loc-ctn .nav-link").mouseenter(function() {
              $(this).css("color","#007bff")
            });

            $(".header .nav-link, .loc-ctn .nav-link").mouseleave(function() {
              $(this).css("color","#000")
            });
          }
          onResize();   
        },
        afterRender: function(){
          fullpage_api.setKeyboardScrolling(false);
          if(sessionStorage.getItem("showIns") != null){
            $(".ifr-outer").hide();
            $(".ifr-ctn").css("z-index", 0);
          }
          setTimeout(function(){
            onResize();
          }, 2000)

          setTimeout(function(){
            // console.log($(".fp-section.active").attr("id"))
            $("#loader").fadeOut();
          }, 3000)
        }
    })

    $('.menu .btn-ctn a').not(".bookNowBtn").click(function(){
      var newSlide = $(this).parent().data("menuanchor");
      fullpage_api.moveTo(newSlide);
      if(newSlide != "images"){
        setTimeout(function(){
          $scope.$apply(function(){
            $scope.options.showThumbnails = false;
          })
        }, 500)
      }   
    });

    /* Custom Slider Code*/

    window.addEventListener("resize", onResize, false);      

    $(document).keydown(onKeyDown);
    
    $('.slider1 a.control_prev').click(function () {
        moveLeft($(".slider1"), $scope.options.mainImg);
    });

    $('.slider1 a.control_next').click(function () {
        moveRight($(".slider1"), $scope.options.mainImg);
    });

    $('.slider2 a.control_prev').click(function () {
        moveLeft($(".slider2"), $scope.options.fpImg);
    });

    $('.slider2 a.control_next').click(function () {
        moveRight($(".slider2"), $scope.options.fpImg);
    });

    $('.slider3 a.control_prev').click(function () {
        moveLeft($(".slider3"), $scope.options.mapImg);
    });

    $('.slider3 a.control_next').click(function () {
        moveRight($(".slider3"), $scope.options.mapImg);
    });
    
    $("i.fa-chevron-up").hide();
    // $(".cont-btn").hide();
    $(".cont-btn").css("opacity", 0);

    $("#section0").mousewheel(function(event, delta) {
      event.preventDefault();
      var dist = $target.scrollTop() - (delta * 50);
      $target.scrollTop(dist);
      
      if($target.scrollTop() + $target.innerHeight() >= $target[0].scrollHeight - 1){        
        scrollDir = "up";
        scrollCount++;
        $(".more-info-btn").hide();
        $(".cont-btn").show();
        $("i.fa-chevron-down").show();        
        $(".cont-btn").css("opacity", 0.05*scrollCount);
        $(".cont-btn h3").css({                
          fontSize: scrollCount*0.12 + "rem"
        });
      }else if(dist >= 0){
        scrollDir = "up";
        scrollCount = 1;
        $(".cont-btn").fadeOut();
        $(".cont-btn").css("opacity", 0);
        $(".more-info-btn").fadeOut();
      }else if(dist == -50){
        scrollDir = "down";
        $(".cont-btn").hide();
        $("i.fa-chevron-down").show();
        $("i.fa-chevron-up").hide();
        $(".more-info-btn").fadeIn();
      } 

      if(scrollCount > 20){
        fullpage_api.moveTo('images');
        setTimeout(function(){
          $("i.fa-chevron-up").show();         
          $("i.fa-chevron-down").hide();
          $(".more-info-btn").show();        
          $(".cont-btn").hide();
          scrollCount = 1;
        }, 500)
      }
    });

    $(".img-overlay-ctn").css("opacity", 1);

    $(".slider, .img-overlay-ctn").swipe( {
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        switch(direction){
          case 'right':
            switch($(".fp-section.active").attr("id")){
              case "section1":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('left', $scope.options.mainImgFull, 0);
                  })
                }else if($scope.options.showImgFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('left', $scope.options.thumbImgFull, 3);
                  })
                }else{
                  moveLeft($(".slider1"), $scope.options.mainImg);
                }
              break;

              case "section3":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('left', $scope.options.fpImgFull, 1);
                  })
                }else{
                  moveLeft($(".slider2"), $scope.options.fpImg);
                }
              break;              

              case "section4":
                if(!$scope.options.showImgMainFull){
                  moveLeft($(".slider3"), $scope.options.mapImg);
                }
              break;          
            }
          break;
          
          case 'left':
            switch($(".fp-section.active").attr("id")){       
              case "section1":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('right', $scope.options.mainImgFull, 0);
                  })
                }else if($scope.options.showImgFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('right', $scope.options.thumbImgFull, 3);
                  })
                }else{
                  moveRight($(".slider1"), $scope.options.mainImg);
                }
              break;

              case "section3":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('right', $scope.options.fpImgFull, 1);
                  })
                }else{
                  moveRight($(".slider2"), $scope.options.fpImg);
                }
              break;          

              case "section4":
                if(!$scope.options.showImgMainFull){
                  moveRight($(".slider3"), $scope.options.mapImg);
                }
              break;
            }
          break;
        }
      }
    })
  })

})
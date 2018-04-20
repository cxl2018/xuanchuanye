/**
 * Created by Invoker on 2018/1/2.
 */

$(function(){
    //一开始掉插件的全屏方法
    $("#fullpage").fullpage({
        //设置是否循环滚动
        //continuousVertical: true,
        //显示右边导航
        navigation : true,
        //回调函数，当某一屏被滚动到的时候触发
        afterLoad : function(link,index){
            //把想要在某一屏滚动到的时候做的事情写在这里面即可
            //如果是从第一屏滚动到第二屏
            if(index == 2){
                /**
                 *  动画效果：
                 *      1  从右边出现一个搜索框
                 *      2  搜索框从右边跑到中间
                 *      3  搜索框里面出现沙发两个文字
                 *      4  沙发搜索框从中间跑到电脑的右上角，与此同时，沙发商品从小变大,同时电脑顶部的文字从黑变白
                 */

                //1  右边出现搜索框
                $(".s2-search-01").fadeIn(500,function(){
                    //搜索框出现之后跑到中间
                    $(this).animate({
                        right:360
                        //发现动画效果是先到右边一点，在跑回中间，可以使用插件来完成，
                        // 在时间和回调函数中间使用一个动画曲线
                    },2000,"easeOutBack",function(){
                        //3 让搜索框里面出现沙发两个字
                        // 思路是： 用另一张图片替换没有文字的图片
                        $(".s2-search-02").show();
                        //还要让没有文字的图片隐藏
                        $(".s2-search-01").hide();
                        //4 让搜索框跑到电脑的右上角
                        $(".s2-search-02").animate({
                            right: 225,
                            bottom: 450,
                            width: 120
                        },800);
                        // 4 同时沙发商品显示并且慢慢变大
                        $(".s2-sofa").show().animate({
                            width: 441
                        },800);

                        // 4 同时文字有黑变白
                        $(".s2-word-01").fadeOut(800);
                        $(".s2-word-02").fadeIn(800);
                        //动画结束时让继续往下显示
                        $(".next").fadeIn(200);
                    })
                });
            }


            /**
             *
             *  第七屏的效果
             *      因为是等第七屏全部加在完毕才开始的动画
             *      动画的开始是在afterload
             *
             *      1 星星慢慢的出现
             *      2 好评出现
             *
             */

            //滚动到第七屏
            if(index == 7){
                //找到五星，慢慢显示
                $(".s7-star").animate({
                    width: 110
                },500,function(){
                    //显示好评
                    $(".s7-haoping").show(250);
                })
            }
        }
        //在离开某一屏时执行的回调函数
        ,onLeave :function(index,next,direction){

            //不管是第几屏，只要是离开，继续往下都会消失
            $(".next").fadeOut(200);

            //console.log(index);  --  当前离开的是哪一屏
            //console.log(next);        下一屏
            //console.log(direction);   滚动的方向
            //console.log("-------------");

            //如果index是2 就是在离开第二屏的时候做的效果
            if(index == 2){
                //1 沙发从第二屏掉到第三屏
                //2 尺码和颜色被替换，购物车的图片也被替换
                //当第二屏开始离开的时候，就设定第三屏的沙发的bottom值就是当前的浏览器的可视区域的高度 + 一定的距离
                // 然后再掉下来

                //让一个白块挡住第二屏的小沙发
                $(".s2-mask").show();
                //显示第三屏的沙发
                $(".s3-sofa").css({
                    bottom: $(window).height() + 340,
                    left: 385,
                    width: 100
                }).animate({
                    left: 260,
                    bottom : 250,
                    width: 207
                },2500,function(){
                    //2 尺码和颜色+购物车被替换
                    $(".s3-size-01").fadeOut(500);
                    $(".s3-size-02").fadeIn(500);
                    $(".s3-shop-cart-01").fadeOut(500);
                    $(".s3-shop-cart-02").fadeIn(500);
                });
            }


            /*
            * 1  沙发倾斜，从第三屏滑落到第四瓶
            * 2  沙发和和购物车一起跑到右边
            * 3  显示收货地址 ， 头顶的文字发生改变
            * */


            //从第三屏过度到第四瓶
            if(index == 3){
                //把原来的第三屏的沙发隐藏
                $(".s3-sofa").hide();
                //让沙发定位在白色方块的中间
                $(".s4-sofa").css({
                    left : -35,
                    bottom : $(window).height() + 210
                }).show();

                //让沙发跑到购物车里
                $(".s4-sofa").animate({
                    bottom: 200,
                    left : 150
                },2000,function(){
                    //2 让购物车和沙发一起跑到右边
                    $(".s4-p-shop-cart").animate({
                        //原因是jq在修改transform的时候有问题
                        //transform: "translateX(300%)"
                        left: 1300
                    },2500,"easeInOutElastic",function(){
                        //3  电脑和地址出现
                        $(".s4-computer").show();
                        $(".s4-address").show();

                        // 文字替换
                        $(".s4-word-01").hide();
                        $(".s4-word-02").show();

                    });
                })
            }

            //从第四屏离开过度到第五屏
            if(index == 4){
                //1 手从下面慢慢伸出来，摸鼠标
                $(".s5-hand").animate({
                    bottom: 0
                },1000,function(){
                    //让鼠标的图片切换
                    $(".s5-mouse-01").hide();
                    $(".s5-mouse-02").show();
                    //2 从上面掉下来一个沙发 -- 先设置沙发的位置是在屏幕的外面的
                    $(".s5-sofa").css({
                        bottom : $(window).height()
                    }).show().animate({
                        bottom :110,
                        left : 100
                    },1000,function(){
                        //账单从卡片下面出来
                        $(".s5-order").animate({
                            bottom : 400
                        },1000,function(){
                            //让文字旋转出现
                            $(".s5-word").fadeIn(100,function(){
                                $(this).addClass("test");
                            });
                        })
                    });
                });


                //3 银行卡的账单从银行卡下面伸出来

                //4 文字旋转显示
            }

            /**
             * 1  从第五屏掉落一个沙发到第六平，沙发在运动的过程中变小
             * 2  沙发在掉落到第六屏的时候，装到了盒子里面
             * 3  盒子掉落到车子里
             * 4  车子开动送货，与此同时，文字从左边到偏中间的位置，云朵开始运动
             * 5  车子停下，两个小哥出来，送货
             * 6  小女孩出门收货
             * 7  请收签
             *
             */

            //从第五屏滚动到第六平
            if(index == 5){
                //获取第五屏的沙发相对于页面左上角的位移
                var offset = $(".s5-sofa").offset();
                //先把第五屏的沙发隐藏
                $(".s5-sofa").hide();
                //把开始滚动的时候第六屏的沙发替换掉第五屏的沙发
                $(".s6-sofa").css({
                    //把第五屏的沙发的位移设置给第六屏的沙发
                    //因为 top 是在定位基准的上方的，要减掉 第五屏沙发的top
                    top: offset.top - $(window).height(),
                    left:  offset.left
                }).animate({
                    top: 120,
                    right: '62%',
                    width: 70
                },800).css("left","");
                //与此同时，盒子的位置跑到最左边，再从左边出来接住沙发
                $(".s6-box").css({
                    right: '100%',
                    top: 100
                }).animate({
                    right: '60%'
                },800,function(){
                    //把沙发先隐藏
                    $(".s6-sofa").hide();
                    //把盒子掉下来
                    $(".s6-box").animate({
                        bottom: 15
                    },800,function(){
                        //地址出现
                        $(".s6-add").fadeIn(200);
                        //让车子往右边移动 -- 移动背景图片的位置
                        $(".s6").animate({
                            'background-position-x': '100%'
                        },1000,function(){
                            //车子的动画完成之后，搬运工就出现
                            //让搬运工的大小恢复原状，就能出现
                            $(".s6-man").animate({
                                width : 252
                            },500,function(){
                                //两个男孩子要往右边移动
                                $(".s6-man").animate({
                                    right: 575
                                },1000,function(){
                                    //开门
                                    $(".s6-door").show();
                                    //送货的动画结束之后，女孩子出来签收
                                    $(".s6-girl").animate({
                                        width : 87,
                                        right: 450
                                    },800,function(){
                                        //签收的文字出现
                                        $(".s6-word-02").show(600);
                                    })
                                });
                            })
                        });
                        //文字从左边出来
                        $(".s6-word").animate({
                            left: '30%'
                        },1000,"easeOutElastic");
                    }).css("top","");
                })
            }
        }
    });

    //鼠标移动到第八屏的开始购物按钮的效果
    $(".s8-btn-01").on("mouseover",function(){
        //让第二张动图显示
        $(".s8-btn-02").show();
    }).on("mouseout",function(){
        //让第二张动图消失
        $(".s8-btn-02").hide();
    });

    var hand = $(".s8-hand");
    //给s8注册鼠标的移动事件，控制手的图片跟随鼠标的位置改变
    $(".s8").on("mousemove",function(e){

        //获取鼠标的位置
        var x = e.clientX;
        var y = e.clientY;

        // 鼠标是在手的水平位置的中间
        //x - 手的一半的宽度
        x = x - hand.width() / 2;
        //控制手不能脱离底部
        //有一个y的最小值 = 页面高度 - 手的高度
        var minY = $(window).height() - hand.height() + 100;
        //一旦y比最小值要小，强制设定为最小值
        y = y < minY ? minY : y;

        //设置给手
        hand.css({
            left: x,
            top : y
        });
    });

    //点击再来一次
    $(".again").on("click",function(){
        //location.reload();

        //从最后一屏滚动到第一屏
        //$.fn.fullpage.moveSectionDown();
        $.fn.fullpage.moveTo(1);
        //如果刷新 -- 就没有滚动回来的效果了
        //location.reload();去除
        // 如果再来一次，发现动画都是修改行内样式的，此时只要把所有的行内样式都取
        //几乎所有会动的东西都是版心里面的 只要根据版心找到所有的后代元素，去除其行内样式
        $(".section-main *").removeAttr("style");
        // 第六版 没有版心
        $(".s6 *").removeAttr("style");
        //背景图片
        $(".s6").css("background-position-x","");

    });

    //继续往下的点击事件
    $(".next").on("click",function(){
        //滚到下一屏
        $.fn.fullpage.moveSectionDown();
    });
});
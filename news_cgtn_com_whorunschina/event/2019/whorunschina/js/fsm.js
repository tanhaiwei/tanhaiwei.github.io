/*
 * @Author: @jdk137 
 * @Date: 2019-03-30 15:14:56 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-04-01 16:14:02
 */
'use strict'; 

// window.addEventListener('resize', onResize, false);
// function onResize() {
// }

var recentDeputy = null;
var config = isMobile.any ? {
    w: 750,
    h: 1334,
    personalTagWidth: 260, // 个人信息标签宽度
    personalTagHeight: 200, // 个人信息标签高度,
    ethnicityTagWidth: 210, // 民族信息标签宽度
    ethnicityTagHeight: 180 // 民族信息标签高度
} : {
    w: 1280,
    h: 800,
    personalTagWidth: 260, // 个人信息标签宽度
    personalTagHeight: 200, // 个人信息标签高度
    ethnicityTagWidth: 210, // 民族信息标签宽度
    ethnicityTagHeight: 180 // 民族信息标签高度
};

if (isMobile.any) {
    $('body').addClass('mobile');
}
$('#scaleContainer').css({
    width: config.w + 'px',
    height: config.h + 'px'
})
$('#personalWrap').css({
    width: config.w + 'px',
    height: config.h + 'px'
})

var highlightColor = 'green';

var durationTime = 1000;

var positions = {
    // random1: [],
    // random: []
};

var fsm = {
    current: '',
    next: null,
    update: function (timestamp) {},
    trans: function (next) {},
};

function renderScene(timestamp) {
    
    TWEEN.update(timestamp);

    fsm.update(timestamp);

    requestAnimationFrame(renderScene);
}
renderScene();


function init() {
    $(".arrow-white,.arrow-red,.logo").show(); 
    var canvas = document.getElementById('myCanvas');
    var w = config.w;
    var h = config.h;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext("2d");

    var mysvgCircle = d3.select('#mysvg').selectAll('.circle')
        .data(data.slice().sort(function (a, b) { //海外的人排最后
            var isa = a["Ever studied abroad"];
            var isb = b["Ever studied abroad"];
            if (isa === isb) {
                return 0;
            } else {
                return isa === 'Yes' ? 1 : -1;
            }
        }))
        .enter().append('circle')
        .attr('data-edu', function (d) {
            if (d.Generation === '1960s' && (d['Educational background'] === 'PhD' || d['Educational background'] === 'Master') ) {
                return 'edu1960';
            } else if (d.Generation === '1980s' && (d['Educational background'] === 'PhD' || d['Educational background'] === 'Master') ) {
                return 'edu1980';
            }
            return '';
        })
        .attr('data-major', function (d) {
            var majors = ["Education", "History", "Philosophy", "Art", "Military Science", "Literature", "Law", "Economics", "Management Science"];

            if (d.Major === "Management Science" ) {
                return 'manage';
            } else if ( majors.indexOf(d.Major) > -1 ) {
                return 'social';
            }
            /*
            else if (d['Ever studied abroad'] === 'YES') {
                return 'abroad';
            }
            */
            return '';
        })
        .attr('data-majorabroad', function (d) {
            if (d['Ever studied abroad'] === 'Yes') {
                return 'abroad';
            }
            return '';
        })
        .classed('circle', true);
    var $mysvg = $('#mysvg');

    var $personalTag =  $('#personalTag');
    $personalTag.css({
        width: config.personalTagWidth,
        height: config.personalTagHeight
    }) 
    var showPerson = function (d) {
        var w = config.personalTagWidth;
        var h = config.personalTagHeight;
        var x = (d.position.x + 10 + w < config.w) ? d.position.x + 10 : d.position.x - w - 10;
        var y = (d.position.y + 10 + h < config.h-150) ? d.position.y + 10 : d.position.y - h - 10;
				var sex=d.Gender=="Male"?"man":"woman";
				var html='<div class="header ' + sex + '"><span>\
										' + d.Name + '\
									</span></div>\
									<p>\
										' + d.Partisan + '\
									</p>\
									<ul>\
										<li>\
											<span>Delegation</span>\
											<span>' + d.Delegation + '</span>\
										</li>\
										<li>\
											<span>Birth Year</span>\
											<span>' + d['Birth year'] + '</span>\
										</li>\
										<li> \
											<span>Ethnicity</span>\
											<span>' + d.Ethnicity + '</span>\
										</li>\
									</ul>';
				$('#personalTag').show().css({
            left: x,
            top: y
        }).html(html);
    };
    var hidePerson = function (d) {
        $personalTag.hide();
    };

    // var $hanPanel = $('#personalWrap .hanPanel');
    var showEthnicity = function (eth, px, py) {
        eth = eth || 'Han';
        console.log(px, py);
        var $tr = $('#foreground .treemap');
        var w = config.ethnicityTagWidth;
        var h = config.ethnicityTagHeight;
        var x = (px + 10 + w < $tr.width() - 300) ? px + 10 : px - w - 10;
        var y = (py + 10 + h < $tr.height() - 300) ? py + 10 : py - h - 10;
        x+=100;
		y+=100;

        var men = 0;
        var women = 0;

        data.forEach(function (d) {
            if (d.Ethnicity === eth) {
                if (d.Gender === 'Male') {
                    men += 1;
                } else {
                    women += 1;
                }
            }
        });
        var $hanPanel = $('<div class="hanPanel">\
                <p class="head">' + eth + '<span>' + d3.format(',')(women + men) + '</span></p>\
                <div class="hanWrap">\
                    <img src="img/man.svg" />\
                    <div>Male:<span>' + d3.format(',')(men) + '</span></div> \
                </div>\
                <div class="hanWrap">\
                    <img src="img/woman.svg" >\
                    <div>Female:<span>' + d3.format(',')(women) + '</span></div> \
                </div>\
            </div>');

        /* $('#foreground .treemap .hanPanel').remove();
        $('#foreground .treemap').append($hanPanel); */
				$('#personalWrap .hanPanel').remove(); 
				$('#personalWrap').append($hanPanel)
        $hanPanel.show().css({
            left: x,
            top: y
        }).html();
    };
    var hideEthnicity = function () {
        $('#personalWrap  .hanPanel').remove(); 
    };

    fsm = {
        current: null,
        next: null,
        update: function (timestamp) {
            // console.log('update', fsm.current);
            if (fsm.next) {
                var change = function () {
                    fsm.current = fsm.next;
                    fsm.next = null;
                    stages[fsm.current].enter();
                    stages[fsm.current].update(timestamp);
                };
                if (fsm.current) {
                    stages[fsm.current].leave(change);
                } else {
                    change();
                }
            } else if (fsm.current) {
                stages[fsm.current].update(timestamp);
            }
        },
        trans: function (next) {
            if (fsm.current !== next) {
                fsm.next = next;
            }
        },
        endTrans: function () {
            var endTrans = stages[fsm.current].endTrans;
            if (endTrans) {
                endTrans();
            }
        }
    };
    var stages = window.stages = {
        'svgWordMove': {
            stage: 'svgWordMove',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = 2000; //durationTime;
                var stage = this.stage;
                var duration = this.duration;

                // compute v
                data.forEach(function (d, i) {
                    var p = positions[stage][i];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: p.x,
                        endY: p.y,
                        x: 0,
                        y: 0,
                        vx: (p.x - d.position.x) / duration,
                        vy: (p.y - d.position.y) / duration,
                        r: p.r,
                        color: p.color
                    };
                });
            },
            update: function (timestamp) {

                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    // var shakeRange = 2;
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                      ctx.closePath();
                    });
                };

                setData();
                draw();

            },
            leave: function (cb) {
                cb && cb();
            },
            isFinished: false
        },
        'svgWordShake': {
            stage: 'svgWordShake',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime * 10;
                var stage = this.stage;
                var duration = this.duration;
                $(".title-red").show(); 
                // compute v
                data.forEach(function (d, i) {
                    var p = positions[stage][i];
                    d.position = {
                        endX: p.x,
                        endY: p.y,
                        x: p.x,
                        y: p.y,
                        r: p.r,
                        color: p.color
                    };
                });
            },
            update: function (timestamp) {

                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    var shakeRange = 2;
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.endX + shakeRange * ( 1 - progress / duration) * (Math.random() - 2);
                            d.y = d.endY + shakeRange * ( 1 - progress / duration) * (Math.random() - 2);
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                      ctx.closePath();
                    });
                };

                setData();
                draw();

            },
            leave: function (cb) {
                cb && cb();
            },
            isFinished: false
        },
        'random': {
            stage: 'random',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;
                var duration = this.duration;

                var r = 3;
                function getRandomColor() {
                  var letters = '0123456789ABCDEF';
                  var color = '#';
                  for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                  }
                  return color;
                }
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: d.randomColor || d.position.color || getRandomColor(),
                        index: i
                    };
                    d.randomColor = d.randomColor || d.position.color;
                });
            },
            update: function (timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item, i) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                      ctx.closePath();
                    });
                    if (progress >= duration && (!isMobile.any || recentDeputy !== null)) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;

                            if (recentDeputy === d.index) {
                                console.log(i, d);
                                console.log(r);
                            }
                            return r;
                        })
                        .attr('fill',  function (d, i) { return recentDeputy === d.index ? highlightColor : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })
                    if (!isMobile.any) {
                        mysvgCircle.on('mouseover', null);
                        mysvgCircle.on('mouseover', function (d, i) {
                            showPerson(d);
                        });
                        mysvgCircle.on('mouseout', hidePerson);
                    }
                }, 0);

            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'all': {
            stage: 'all',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;
                var duration = this.duration;

                var r = 3;
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: 'rgb(247, 108, 112)',
                        index: i
                    };
                });
            },
            update: function (timestamp) {
                // console.log('allupdate');

                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var stage = this.stage;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
            //         if (progress >= duration && !isMobile.any) {
            //             setTimeout(function () {
            //                 $mysvg.show();
            //                 // $mysvg.attr('class', stage);
            //                 mysvgCircle
            //                     .attr('cx', function (d, i) { return d.position.x; })
            //                     .attr('cy', function (d, i) { return d.position.y; })
            //                     .attr('r', function (d, i) { return d.position.r; })
            //                     .attr('fill',  function (d, i) { return d.position.color; });
            //                 mysvgCircle.on('mouseover', null);
            //                 mysvgCircle.on('mouseover', function (d, i) {
            //                     showPerson(d);
            //                 });
            //                 mysvgCircle.on('mouseout', hidePerson);
            //             }, 0);
            //         }
            //     };

            //     setData();
            //     draw();

            // },
                    if (progress >= duration && (!isMobile.any || recentDeputy !== null)) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;

                            if (recentDeputy === d.index) {
                                console.log(i, d);
                                console.log(r);
                            }
                            return r;
                        })
                        .attr('fill',  function (d, i) { return recentDeputy === d.index ? d.position.color : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })

                    if (!isMobile.any) {
                        mysvgCircle.on('mouseover', null);
                        mysvgCircle.on('mouseover', function (d, i) {
                            showPerson(d);
                        });
                        mysvgCircle.on('mouseout', hidePerson);
                    }
                }, 0);

            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'gender': {
            stage: 'gender',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;
                var duration = this.duration;

                var r = 3;
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: d.Gender === 'Male' ? 'rgb(75, 169, 245)' : 'rgb(237, 109, 169)',
                        index: i
                    };
                });
            },
            update: function (timestamp) {
                // console.log('allupdate');

                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    if (progress >= duration && (!isMobile.any || recentDeputy !== null)) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;
                            return r;
                        })
                        .attr('fill',  function (d, i) { return recentDeputy === d.index ? d.position.color : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })

                    if (!isMobile.any) {
                        mysvgCircle.on('mouseover', null);
                        mysvgCircle.on('mouseover', function (d, i) {
                            showPerson(d);
                        });
                        mysvgCircle.on('mouseout', hidePerson);
                    }
                }, 0);

            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'age': {
            stage: 'age',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;
                var duration = this.duration;

                var r = isMobile.any ? 3: 2;
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: d.Gender === 'Male' ? 'rgb(75, 169, 245)' : 'rgb(237, 109, 169)',
                        index: i
                    };
                });
            },
            update: function (timestamp) {
                // console.log('allupdate');

                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    if (progress >= duration && (!isMobile.any || recentDeputy !== null)) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;

                            if (recentDeputy === d.index) {
                                console.log(i, d);
                                console.log(r);
                            }
                            return r;
                        })
                        .attr('fill',  function (d, i) { return recentDeputy === d.index ? d.position.color : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })

                    if (!isMobile.any) {
                        mysvgCircle.on('mouseover', null);
                        mysvgCircle.on('mouseover', function (d, i) {
                            showPerson(d);
                        });
                        mysvgCircle.on('mouseout', hidePerson);
                    }
                }, 0);

            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'ethnicity': {
            stage: 'ethnicity',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;

                var duration = this.duration;

                var v = 0.1;
                var r = 4;
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: d.position.color,
                        index: i
                    };
                });

                var show = function () {
                    var width = config.w,
                        height = config.h;
                    var max = 0;
                    var min = 10000;
                    var padding = 100;

                    var format = d3.format(",d");

                    // var color = d3.scaleOrdinal()
                    //     .range(d3.schemeCategory10
                    //         .map(function(c) { c = d3.rgb(c); c.opacity = 1; return c; }));
                    // var color = d3.scale.category20();

                    var stratify = d3.stratify()
                        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

                    var treemap = d3.treemap()
                        .size(isMobile.any ? [width - padding * 1, height - padding * 3] : [width - padding * 2, height - padding * 2])
                        .padding(1)
                        .round(true);

                    (function() {
                      // var d
                      var countData;
                      var hash = {};
                      data.forEach(function (d) {
                        hash[d.Ethnicity] = hash[d.Ethnicity] || 0;
                        hash[d.Ethnicity]++;
                      });
                      // console.log(Object.keys(hash));
                      // console.log(hash);
                      countData = Object.keys(hash).map(function (d) {
                        max = Math.max(max, hash[d]);
                        min = Math.min(min, hash[d]);
                        return {id: 'a.' + d, value: hash[d]};
                      });
                      countData.sort(function (a, b) {
                        return a.value - b.value;
                      });
                      countData.forEach(function (d, i) {
                        d.index = i;
                      });
                      countData.push({id: 'a', value: 0});

                        var color = function (d) {
                            // var r = d.value / max;
                            // var r = Math.pow(d.data.index / (countData.length - 2), 2);
                            var r = Math.pow((d.value - min) / (max - min), .2);
                            // console.log(r);
                            var c = 'rgb(' + Math.round(223 * r + ( 1 - r) * 239) + ','
                                + Math.round(86 * r + ( 1 - r) * 185) + ','
                                + Math.round(86 * r + ( 1 - r) * 186) + ')';
                            return c;
                        };

                      var root = stratify(countData)
                          .sum(function(d) { return d.value; })
                          .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

                      treemap(root);

                      isMobile.any ? $('#foreground').show() : $('#foreground').fadeIn(800);

                      d3.select("#foreground")
                        .append('div')
                        .style('margin', (isMobile.any ? padding * .5 : padding) + 'px')
                        .style('margin-top', (isMobile.any ? padding * 2.5 : padding) + 'px')
                        .classed('treemap', true);
                      d3.select("#foreground .treemap")
                        .selectAll(".node")
                        .data(root.leaves())
                        .enter().append("div")
                          .attr("class", function (d) {
                            if (recentDeputy === null) {
                                return 'node'
                            }
                            return 'node ' + (d.id.substring(d.id.lastIndexOf(".") + 1) === data[recentDeputy].Ethnicity ? 'active' : ''); 
                          })
                          .attr('data-ethnicity', function(d) { return d.id.split('.')[1]; })
                          // .attr("title", function(d) { return d.id.split('.')[1] + "\n" + format(d.value); })
                          .style("left", function(d) { return d.x0 + "px"; })
                          .style("top", function(d) { return d.y0 + "px"; })
                          .style("width", function(d) { return d.x1 - d.x0 + "px"; })
                          .style("height", function(d) { return d.y1 - d.y0 + "px"; })
                          // .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d.id); })
                          .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d); })
                        .append("div")
                          .attr("class", "node-label")
                          .text(function(d) { return d.value < 13 ? '' : d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).join("\n"); })
                        .append("div")
                          .attr("class", "node-value")
                          .text(function(d) { return  d.value < 13 ? '' : format(d.value); });

                          if (isMobile.any) {
                              $('#foreground .treemap').on('click', '.node', function (e) {
                                var x = e.offsetX + this.offsetLeft;
                                var y = e.offsetY + this.offsetTop;
                                var ethnicity = $(this).data('ethnicity');
                                showEthnicity(ethnicity, x, y);
                              });

                          } else {
                            $('#foreground .treemap').on('mousemove', '.node', function (e) {
                                var x = e.offsetX + this.offsetLeft;
                                var y = e.offsetY + this.offsetTop;
                                var ethnicity = $(this).data('ethnicity');
                                showEthnicity(ethnicity, x, y);
                            });
                            $('#foreground .treemap').on('mouseout', function (e) {
                                hideEthnicity();
                            });

                          }

                    }());

                    function type(d) {
                      d.value = +d.value;
                      return d;
                    }
                };

                show();



            },
            update: function (timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;

                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    if (progress >= duration && !isMobile.any) {
                        setTimeout(function () {
                            $mysvg.show();
                            mysvgCircle
                                .attr('cx', function (d, i) { return d.position.x; })
                                .attr('cy', function (d, i) { return d.position.y; })
                                .attr('r', function (d, i) { return d.position.r; })
                                .attr('fill',  function (d, i) { return d.position.color; });

                                if (!isMobile.any) {
                                    mysvgCircle.on('mouseover', null);
                                    mysvgCircle.on('mouseover', function (d, i) {
                                        showPerson(d);
                                    });
                                    mysvgCircle.on('mouseout', hidePerson);
                                }
                        }, 0);
                    }
                };

                setData();
                draw();

            },
            endTrans: function () {
                    d3.select("#foreground .treemap")
                    .selectAll(".node")
                      .attr("class", 'node');
                    setTimeout(function () {
                        d3.select("#foreground .treemap")
                        .selectAll(".node")
                          .attr("class", function (d) {
                            if (recentDeputy === null) {
                                return 'node'
                            }
                            return 'node ' + (d.id.substring(d.id.lastIndexOf(".") + 1) === data[recentDeputy].Ethnicity ? 'active' : ''); 
                          });
                    })
            },
            leave: function (cb) {
                hideEthnicity();
                $('#foreground').empty().hide();
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'edu': {
            stage: 'edu',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;

                var duration = this.duration;

                var v = 0.1;
                var r = 4;
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: d['Educational background'] === 'Unknown' ? 'rgb(201, 201, 201)' : 'rgb(230, 116, 116)',
                        index: i
                    };
                });
            },
            update: function (timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;

                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    // if (progress >= duration && !isMobile.any) {
                    if (progress >= duration) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;
                            return r;
                        })
                        .attr('fill',  function (d, i) { return recentDeputy === d.index ? d.position.color : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })

                        if (!isMobile.any) {
                            mysvgCircle.on('mouseover', null);
                            mysvgCircle.on('mouseover', function (d, i) {
                                showPerson(d);
                            });
                            mysvgCircle.on('mouseout', hidePerson);
                        }
                }, 0);

            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'major': {
            stage: 'major',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;

                var duration = this.duration;

                var v = 0.1;
                var r = 3;
                function getColor(d) {
                    var c = {
                        "Engineering": 'rgb(227, 115, 114)',
                        "Science": 'rgb(228, 152, 81)',
                        "Medical Science": 'rgb(241, 192, 112)',
                        "Agriculture": 'rgb(252, 236, 93)',
                        "Education": 'rgb(216, 147, 190)',
                        "History": 'rgb(193, 175, 210)',
                        "Philosophy": 'rgb(166, 218, 215)',
                        "Art": 'rgb(145, 198, 243)',
                        "Military Science": 'rgb(121, 124, 181)',
                        "Literature": 'rgb(177, 156, 199)',
                        "Law": 'rgb(121, 198, 192)',
                        "Economics": 'rgb(121, 185, 242)',
                        "Management Science": 'rgb(109, 163, 208)'
                    };
                    var edus = ['PhD', 'Master', 'Bachelor'].reverse();
                    // if ( d['Major'] === 'Unknown' || d['Educational background'] === 'Unknown' || edus.indexOf(d['Educational background']) === -1 ) {
                    if ( d['Major'] === 'Unknown' || d['Educational background'] === 'Unknown' ) {
                        return 'rgb(180, 180, 180)';
                    }
                    if (!c[d['Major']]) {
                        console.log('nocolor', d, d.Major);
                    }
                    return c[d['Major']]; // || 'rgb(201, 201, 201)';
                }
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: getColor(d),
                        index: i
                    };
                });
            },
            update: function (timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;

                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    // if (progress >= duration && !isMobile.any) {
                    if (progress >= duration) {
            //         }
            //     };

            //     setData();
            //     draw();

            // },
            //         if (progress >= duration && !isMobile.any) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;

                            if (recentDeputy === d.index) {
                                console.log(i, d);
                                console.log(r);
                            }
                            return r;
                        })
                        // .attr('fill',  function (d, i) { return recentDeputy === d.index ? d.position.color : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })
                        .attr('fill',  function (d, i) { return (d['Major'] === 'Unknown' || d['Educational background'] === 'Unknown') ? d3.hsl(d.position.color).brighter(.1) : d3.hsl(d.position.color).brighter(.6); })
                        .attr('stroke',  function (d, i) { return d.position.color; });

                    if (!isMobile.any) {
                        mysvgCircle.on('mouseover', null);
                        mysvgCircle.on('mouseover', function (d, i) {
                            showPerson(d);
                        });
                        mysvgCircle.on('mouseout', hidePerson);
                    }
                }, 0);

            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'party': {
            stage: 'party',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;

                var duration = this.duration;

                var v = 0.1;
                var r = 4;
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: d.position.color,
                        index: i
                    };
                });

                var show = function () {
                    var units = "";

                    var margin = isMobile.any ? {top: 180, right:90, bottom: 90, left: 90} : {top: 100, right:100, bottom: 100, left: 100},
                        width = config.w - margin.left - margin.right,
                        height = config.h - margin.top - margin.bottom;

                    // format variables
                    var formatNumber = d3.format(",.0f"),    // zero decimal places
                        format = function(d) { return formatNumber(d) + " " + units; },
                        color = d3.scaleOrdinal(d3.schemeCategory20);

                    // append the svg object to the body of the page
                    
                    // $('#foreground').show();
                    isMobile.any ? $('#foreground').show() : $('#foreground').fadeIn(800);

                    var svg = d3.select("#foreground").append("svg")
                        .classed('sankey', true)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", 
                              "translate(" + margin.left + "," + margin.top + ")");

                    // Set the sankey diagram properties
                    var sankey = d3.sankey()
                        .nodeWidth(36)
                        .nodePadding(12)
                        .size([width, height]);

                    var path = sankey.link();

                    // load the data (using the timelyportfolio csv method)
                    (function() {

                        var hash = {};
                        var nodeHash = {};
                        var nodes = [];
                        var links = [];
                        var countsHash = {};
                        data.forEach(function (d, i) {
                            if (typeof nodeHash[d.Delegation] === 'undefined') {
                                nodes.push({node: nodes.length, name: d.Delegation});
                                nodeHash[d.Delegation] = nodes.length - 1;
                            }
                            if (typeof nodeHash[d.Partisan] === 'undefined') {
                                nodes.push({node: nodes.length, name: d.Partisan});
                                nodeHash[d.Partisan] = nodes.length - 1;
                            }
                            hash[d.Delegation + '__' + d.Partisan] = (hash[d.Delegation + '__' + d.Partisan] || 0) + 1;

                            countsHash[d.Delegation] = (countsHash[d.Delegation] || 0) + 1;
                            countsHash[d.Partisan] = (countsHash[d.Partisan] || 0) + 1;

                        });

                        links = Object.keys(hash).map(function (d) {
                            return {
                                source: nodeHash[d.split('__')[0]],
                                target: nodeHash[d.split('__')[1]],
                                value: hash[d]
                            };
                        });

                        //set up graph in same style as original example but empty
                        var graph = {"nodes" : nodes, "links" : links};
                        // console.log(nodeHash);
                        // console.log($.extend(true, {}, graph));

                        // console.log(graph);

                        var fillColor = function(name, d) {
                            var h = {"CPC (Communist Party of China)": 'rgb(241, 73, 80)',
                                 "No party affiliation": 'rgb(247, 147, 30)',
                                 "Jiusan Society": 'rgb(255, 207, 110)',
                                 "The China Democratic League": 'rgb(140, 198, 63)',
                                 "China National Democratic Construction Association": 'rgb(0, 146, 69)',
                                 "Chinese Peasants and Workers Democratic Party": 'rgb(51, 186, 177)',
                                 "China Association for Promoting Democracy": 'rgb(63, 169, 245)',
                                 "The Revolutionary Committee of the Chinese Kuomintang": 'rgb(46, 49, 146)',
                                 "China Zhi Gong Party": 'rgb(133, 87, 167)',
                                 "Taiwan Democratic Self-Government League": 'rgb(109, 163, 208)'
                            }
                            
                            if (h[name]) {
                                d.color = h[name];
                            } else {
                                d.color = color(name.replace(/ .*/, ""));
                            }

                            return d.color;
                        };

                        sankey
                              .nodes(graph.nodes)
                              .links(graph.links)
                              .layout(32);

                        // relayout
                        (function () {
                            var left = graph.nodes.filter(function (d) {
                               return d.x < config.w / 2; 
                            }).sort(function (a, b) {
                                return b.dy - a.dy;
                            });

                            var right = graph.nodes.filter(function (d) {
                               return d.x >= config.w / 2;
                            }).sort(function (a, b) {
                                return b.dy - a.dy;
                            });
                            var leftSum = d3.sum(left, function (d) { return d.dy; });
                            var rightSum = d3.sum(right, function (d) { return d.dy; });
                            var leftPadding = (height - leftSum) / (left.length - 1);
                            var rightPadding = (height - rightSum) / (right.length - 1);
                            var ly = 0;
                            left.forEach(function (d) {
                                d.side = 'left';
                                d.y = ly;
                                ly += d.dy + leftPadding;
                            });
                            var ry = 0;
                            right.forEach(function (d) {
                                d.side = 'right';
                                d.y = ry;
                                ry += d.dy + rightPadding;
                            });

                            // console.log(right.map(function (d) { return d.name;}).join('": ,\n "'));

                            sankey.relayout();

                            graph.links.sort(function (a, b) { // sort link
                                if (a.target.name === b.target.name) {
                                    return 0;
                                } else if (a.target.name === 'Jiusan Society' || a.target.name === 'Jiusan Society' ) {
                                    return a.target.name === 'Jiusan Society' ? 1 : -1;
                                }
                                return 0;
                            });

                        } ());


                        // add in the links
                          var link = svg.append("g").selectAll(".link")
                              .data(graph.links)
                            .enter().append("path")
                              .attr("class", function (d) { return (d.target.name.indexOf('Jiusan') > -1 ? 'Jiusan ' : '') + 'link' })
                              .attr("d", path)
                              .style('stroke', function (d) { return fillColor(d.target.name, d);})
                              .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                              .sort(function(a, b) { return b.dy - a.dy; });



                        // add the link titles
                          link.append("title")
                                .text(function(d) {
                                    return d.source.name + " → " + 
                                        d.target.name + "\n" + format(d.value); });

                        // add in the nodes
                          var node = svg.append("g").selectAll(".node")
                              .data(graph.nodes)
                            .enter().append("g")
                              .attr("class", function (d) {
                                var c = d.name.indexOf('Jiusan') > -1 ? 'Jiusan ' : '';
                                c += ' ' + d.side + ' node ';
                                if (recentDeputy !== null) {
                                    console.log(data[recentDeputy]);
                                    if (d.side === 'left' && data[recentDeputy].Delegation === d.name) {
                                        c += 'active';
                                    } else if (d.side === 'right' && data[recentDeputy].Partisan === d.name) {
                                        c += 'active';
                                    }
                                }
                                return c;
                              })
                              .attr("transform", function(d) {
                                  return "translate(" + d.x + "," + d.y + ")"; })
                              // .call(d3.drag()
                              //   .subject(function(d) {
                              //     return d;
                              //   })
                              //   .on("start", function() {
                              //     this.parentNode.appendChild(this);
                              //   })
                              //   .on("drag", dragmove));

                        // add the rectangles for the nodes
                          node.append("rect")
                              .attr("height", function(d) { return d.dy; })
                              .attr("width", sankey.nodeWidth())
                              .style("fill", function (d) { return fillColor(d.name, d);})
                              .style("stroke", function(d) {
                                  return d3.rgb(d.color).darker(2); })
                            .append("title")
                              .text(function(d) {
                                  return d.name + "\n" + format(d.value); });

                        // add in the title for the nodes
                          node.append("text")
                              .attr("x", -6)
                              .attr("y", function(d) { return d.dy / 2; })
                              .attr("dy", ".35em")
                              .attr("text-anchor", "end")
                              .attr("transform", null)
                              .text(function(d) { return d.name; })
                            .filter(function(d) { return d.x < width / 2; })
                              .attr("x", 6 + sankey.nodeWidth())
                              .attr("text-anchor", "start");

                          svg.append('text')
                              .attr("x", 0)
                              .attr("y", -15)
                              .attr("font-size", '16px')
                              .attr("text-anchor", "start")
                              .attr("font-weight", "bold")
                              .attr("transform", null)
                              .text('Delegations');

                          svg.append('text')
                              .attr("x", width)
                              .attr("y", -15)
                              .attr("font-size", '16px')
                              .attr("text-anchor", "end")
                              .attr("font-weight", "bold")
                              .attr("transform", null)
                              .text('Parties');

                        // the function for moving the nodes
                          function dragmove(d) {
                            d3.select(this)
                              .attr("transform", 
                                    "translate(" 
                                       + d.x + "," 
                                       + (d.y = Math.max(
                                          0, Math.min(height - d.dy, d3.event.y))
                                         ) + ")");
                            sankey.relayout();
                            link.attr("d", path);
                          }
                    }());
                };

                show();

            },
            update: function (timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;

                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    if (progress >= duration && !isMobile.any) {
                        setTimeout(function () {
                            $mysvg.show();
                            mysvgCircle
                                .attr('cx', function (d, i) { return d.position.x; })
                                .attr('cy', function (d, i) { return d.position.y; })
                                .attr('r', function (d, i) { return d.position.r; })
                                .attr('fill',  function (d, i) { return d.position.color; });

                            if (!isMobile.any) {
                                mysvgCircle.on('mouseover', null);
                                mysvgCircle.on('mouseover', function (d, i) {
                                    showPerson(d);
                                });
                                mysvgCircle.on('mouseout', hidePerson);
                            }
                        }, 0);
                    }
                };

                setData();
                draw();

            },
            endTrans: function () {
                stages[fsm.current].enter();
            },
            leave: function (cb) {
                $('#foreground').empty().hide();
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        /**
         * Mrb
         */
        'title2': {
            stage: 'title2',
            enter: function() {
                $mysvg.hide();
                console.log('title2 enter');
                // $('#myCanvas').addClass('hide');
                this.isFinished = false;
                this.start = null;
                this.duration = 1000; //durationTime;
                var stage = this.stage;
                var duration = this.duration;

                // compute v
                data.forEach(function (d, i) {
                    var p = positions[stage][i];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: p.x,
                        endY: p.y,
                        x: 0,
                        y: 0,
                        vx: (p.x - d.position.x) / duration,
                        vy: (p.y - d.position.y) / duration,
                        r: p.r,
                        color: p.color
                    };
                });
            },
            update: function(timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    // var shakeRange = 2;
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                      ctx.closePath();
                    });
                };

                setData();
                draw();
            },
            endTrans: function() {
                console.log('title2 endTrans');
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'diagram1': {
            stage: 'diagram1',
            enter: function() {
                console.log('diagram1 enter');
                mrb_diagram_1.draw();
                setTimeout(() => {
                    mrb_diagram_1.startAnimate();
                }, 0);
            },
            update: function(timestamp) {
                
            },
            endTrans: function() {
                
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'diagram2': {
            stage: 'diagram2',
            enter: function() {
                console.log('diagram2 enter')
                mrb_diagram_2.draw()

                setTimeout(() => {
                    mrb_diagram_2.startAnimate()
                }, 0);
            },
            update: function(timestamp) {
                
            },
            endTrans: function() {
                
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'title3': {
            stage: 'title3',
            enter: function() {
                console.log('title3 enter');
                // $('#myCanvas').addClass('hide');
                this.isFinished = false;
                this.start = null;
                this.duration = 1000; //durationTime;
                var stage = this.stage;
                var duration = this.duration;

                // compute v
                data.forEach(function (d, i) {
                    var p = positions[stage][i];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: p.x,
                        endY: p.y,
                        x: 0,
                        y: 0,
                        vx: (p.x - d.position.x) / duration,
                        vy: (p.y - d.position.y) / duration,
                        r: p.r,
                        color: p.color
                    };
                });
            },
            update: function(timestamp) {
                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    // var shakeRange = 2;
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                      ctx.closePath();
                    });
                };

                setData();
                draw();
            },
            endTrans: function() {
                
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'diagram3': {
            stage: 'diagram3',
            enter: function() {
                console.log('diagram3 enter')
                mrb_diagram_3.draw();
            },
            update: function(timestamp) {
                
            },
            endTrans: function() {
                
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'diagram4': {
            stage: 'diagram4',
            enter: function() {
                console.log('diagram4 enter')
                mrb_diagram_4.draw()
            },
            update: function(timestamp) {
                
            },
            endTrans: function() {
                
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        'diagram5': {
            stage: 'diagram5',
            enter: function() {
                console.log('diagram5 enter')
                // mrb_diagram_5.draw().drawYearData('1954');
                // mrb_diagram_5.draw();
            },
            update: function(timestamp) {
                
            },
            endTrans: function() {
                
            },
            leave: function (cb) {
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        },
        /**
         * end: Mrb 
         */
        'end': {
            stage: 'end',
            enter: function () {
                this.isFinished = false;
                this.start = null;
                this.duration = durationTime;
                var stage = this.stage;
                var duration = this.duration;

                var v = 0.1;
                var r = 3;
                function getRandomColor() {
                  var letters = '0123456789ABCDEF';
                  var color = '#';
                  for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                  }
                  return color;
                }
                // compute v
                data.forEach(function (d, i) {
                    var stagePosition = positions[stage];
                    d.position = {
                        startX: d.position.x,
                        startY: d.position.y,
                        endX: stagePosition[i].x,
                        endY: stagePosition[i].y,
                        x: d.position.x,
                        y: d.position.y,
                        vx: (stagePosition[i].x - d.position.x) / duration,
                        vy: (stagePosition[i].y - d.position.y) / duration,
                        r: r,
                        color: 'rgb(247, 108, 112)',
                        index: i
                    };
                    d.randomColor = d.randomColor || d.position.color;
                });
            },
            update: function (timestamp) {

                if (this.isFinished) {
                    return;
                }

                if (!this.start) this.start = timestamp;
                var progress = timestamp - this.start;
                var duration = this.duration;
                // console.log(progress, timestamp, duration, durationTime);
                if (progress >= duration) {
                    this.isFinished = true;
                }

                var setData = function () {
                    data.forEach(function (item, i) {
                        var d = item.position;
                        if (progress >= duration) {
                            d.x = d.endX;
                            d.y = d.endY;
                        } else {
                            d.x = d.startX + d.vx * progress;
                            d.y = d.startY + d.vy * progress;
                        }
                    });
                };

                var draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    data.forEach(function (item) {
                      var d = item.position;
                      ctx.beginPath();
                      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                      ctx.fillStyle = d.color;
                      ctx.fill();
                    });
                    if (progress >= duration && (!isMobile.any || recentDeputy !== null)) {
                        stages[fsm.current].endTrans();
                    }
                };

                setData();
                draw();
            },
            endTrans: function () {
                if (!stages[fsm.current].isFinished) {
                    return;
                }
                setTimeout(function () {
                    $mysvg.show();
                    mysvgCircle
                        .attr('cx', function (d, i) { return d.position.x; })
                        .attr('cy', function (d, i) { return d.position.y; })
                        .attr('r', function (d, i) { 
                            var r = recentDeputy === d.index ? 5 : d.position.r;

                            if (recentDeputy === d.index) {
                                console.log(i, d);
                                console.log(r);
                            }
                            return r;
                        })
                        .attr('fill',  function (d, i) { return recentDeputy === d.index ? d.position.color : d.position.color; })
                        .classed('active', function (d) { return recentDeputy === d.index; })

                    if (!isMobile.any) {
                        mysvgCircle.on('mouseover', null);
                        mysvgCircle.on('mouseover', function (d, i) {
                            showPerson(d);
                        });
                        mysvgCircle.on('mouseout', hidePerson);
                    }
                }, 0);

            },
            leave: function (cb) { 
                $mysvg.hide();
                cb && cb();
            },
            isFinished: false
        }
    };
}

function initStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('Stats-output')
        .appendChild( stats.domElement );
    return stats;
}












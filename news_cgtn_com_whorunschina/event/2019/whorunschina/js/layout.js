/*
 * @Author: @jdk137 
 * @Date: 2019-03-21 16:16:49 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-03-21 16:19:30
 */

/**
 * layout calculate particle's position for every FSM stage
 */
function layout(cb) {
    var particlesTotal = data.length;
    var images = ['./img/w1.svg', './img/w2.svg', './img/title2.svg', './img/title3.svg'];
    var imagesLoad = [];
    var allLoad = (function () {
        var count = 0;
        return function () {
            var i, object;
            count++;
            if (count >= images.length) {

                // positions.random = placeDiySVGWord(imagesLoad[0]);
                positions.svgWordShake = placeDiySVGWord(imagesLoad[0]);
                positions.svgWordMove = placeDiySVGWord(imagesLoad[1]);
                positions.title2 = placeDiySVGWord(imagesLoad[2]);
                positions.title3 = placeDiySVGWord(imagesLoad[3]);

                positions.random = placeRandom();
                positions.all = placeAll();
                positions.gender = placeGender();

                positions.age = placeAge();

                positions.ethnicity = isMobile.any ? placeRandom(200, 300) : placeRandom(200);
                positions.edu = placeEdu();
                positions.major = placeMajor();
                positions.party = placeParty();
                // positions.birthplace = placeRandom();
                positions.end = placeEnd();
                // positions.random1 = placeRandom();
                // placeDiyWord(imagesLoad[0]);
                
                // console.log(positions);
                
                cb && cb();

            }
        };
    }());
    images.forEach(function (d, i) {
        if (d.indexOf('.svg') >= 0) {
            $.get(d, function (img) {
                imagesLoad[i] = img; 
                allLoad();
            })
        } else {
            var img = document.createElement( 'img' );
            img.addEventListener('load', allLoad);
            img.src = d;
            imagesLoad[i] = img;  
        }
    });


    /*
        xNumber: 一行每一份有多少数据
        xSplit: 一行分成多少份
        positionOffset: 起始position多少个
     */
    var placeSingle = function (list, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, bottomToTop, positions, sepMargin, yratio) {

        sepMargin = sepMargin || separation;
        yratio = yratio || 1;
        var xLineNumber = xNumber * xSplit;
        // var s = list.sort(function (a, b) {
        //     if (a.Gender === b.Gender) {
        //         return 0;
        //     } else {
        //         return a.Gender < b.Gender ? 1 : -1;
        //     }
        // });
        list.forEach(function (d, i) {
            var index = i;
            // console.log(index);
            var x = (index % xLineNumber) * separation + Math.floor(index % xLineNumber / xSplit ) * sepMargin;
            var lineIndex = Math.floor(index / xLineNumber);
            var y = lineIndex * separation + Math.floor(lineIndex / yNumber) * sepMargin;
            y *= yratio;

            var offset = d.index;

            positions[offset] = {
                x: x + xOffset,
                y: bottomToTop ? -y + yOffset : y + yOffset
            }
        });

    };



    var placeAll = function (yTrans) {
        yTrans = yTrans || 0;
        var positions = [];

        if (isMobile.any) {
            var l = 100;
            var offsetX = 0;
            var offsetY = 550 + yTrans;

            var separation = config.w / l * 1.4;

            var xNumber = 10;
            var yNumber = 5;
            var xSplit = 5;
            var xOffset = offsetX + (config.w - (xNumber * xSplit + xNumber - 1) * separation) / 2;
            var yOffset = offsetY;
            placeSingle(data, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);

        } else {
            var l = 100;
            var offsetX = 0;
            var offsetY = 400;

            var separation = config.w / l / 2;

            var xNumber = 20;
            var yNumber = 5;
            var xSplit = 5;
            var xOffset = offsetX + (config.w - (xNumber * xSplit + xNumber - 1) * separation) / 2;
            var yOffset = offsetY + yTrans;
            placeSingle(data, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);

        }

        // data.forEach(function (d, i) {
        //     var index = i;

        //     var l = 100;
        //     var offsetX = 210;
        //     var offsetY = 300;

        //     var separation = config.w / l / 2;
        //     var x = (index % l) * separation + Math.floor(index % l / 5) * separation;
        //     var lineIndex = Math.floor(index / l);
        //     var y = lineIndex * separation + Math.floor(lineIndex / 10) * separation;

        //     positions.push({
        //         x: x + offsetX,
        //         y: y * 1.2 + offsetY
        //     });

        // });
        return positions;

    };


    var placeEnd = function (yTrans) { // placeAll, only offsetDiff
        yTrans = yTrans || 0;
        var positions = [];

        if (isMobile.any) {
            var l = 100;
            var offsetX = 0;
            var offsetY = 550;

            var separation = config.w / l * 1.4;

            var xNumber = 10;
            var yNumber = 5;
            var xSplit = 5;
            var xOffset = offsetX + (config.w - (xNumber * xSplit + xNumber - 1) * separation) / 2;
            var yOffset = offsetY;
            placeSingle(data, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);

        } else {
            var l = 100;
            var offsetX = 0;
            var offsetY = 300;

            var separation = config.w / l / 2;

            var xNumber = 20;
            var yNumber = 5;
            var xSplit = 5;
            var xOffset = offsetX + (config.w - (xNumber * xSplit + xNumber - 1) * separation) / 2;
            var yOffset = offsetY;
            placeSingle(data, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);

        }
        return positions;

    };

    var placeMajor = function () {
        var positions = [];

        var majors = ["Engineering", "Science", "Medical Science", "Agriculture", "Education", "History", "Philosophy", "Art", "Military Science", "Literature", "Law", "Economics", "Management Science"]; //"unknown", 
        var edus = ['PhD', 'Master', 'Bachelor'].reverse(); // 'unknown'
        var hash = {};
        var hasMajorAndEdu = [];
        data.forEach(function (d, i) {
            // var edu = (d['Educational background'] || 'unknown').split(/[\s\n]/).join(' ');
            var major = d['Major'];
            if (d['Educational background'] === 'Unknown') {
                major = 'Unknown';
            }
            hash[major] = hash[major] || [];
            hash[major].push(d);
            // d.index = i;
            if (major !== 'Unknown') {
                hasMajorAndEdu.push(d);
            }
            // positions.push(0, 0, 0);
        });
        // console.log(Object.keys(hash));
        // console.log(hash);

        if (isMobile.any) {
            // unknown
            (function () {

                var separation = config.w / 100 * 1.2;
                var xNumber = 10;
                var zNumber = 5;
                var xSplit = 5;
                var xOffset = config.w * .15;
                var yOffset = config.h * .78;
                placeSingle(hash['Unknown'], separation, xNumber, zNumber,  xSplit, xOffset, yOffset, false, positions, separation, .95);
            }());
            // 
            var placeRadar = function (list, xSpan, ySpan, xPadding, yPadding, xOffset, yOffset, positions) {
                var getRandom = function (min, max, padding) {
                    return min + padding + Math.random() * (max - min - padding * 2);
                };
                list.sort(function (a, b) {
                    if (a['Ever studied abroad'] === b['Ever studied abroad']) {
                        return 0;
                    } else {
                        return a['Ever studied abroad'] === 'No' ? -1 : 1;
                    }
                }).forEach(function (d) {
                    var xIndex = majors.indexOf(d['Major']);
                    var yIndex = edus.indexOf(d['Educational background']) + 1;
                    // console.log(index);
                    var radio = getRandom(xSpan * xIndex, xSpan * (xIndex + 1), xPadding) - Math.PI / 2;
                    var r = getRandom(ySpan * yIndex, ySpan * (yIndex + 1), yPadding);
                    
                    x = Math.cos(radio) * r;
                    y = Math.sin(radio) * r;

                    var offset = d.index;

                    positions[offset] = {
                        x: x + xOffset,
                        y: y + yOffset
                    };
                });
            };
            (function () {
                var xSpan = Math.PI * 2 / majors.length; //separation * 10;
                var ySpan = 62;
                var xPadding = xSpan * .1;
                var yPadding = ySpan * .12;
                var xOffset = config.w * .5 + 0;
                var yOffset = config.h * .435 + 0;
                placeRadar(hasMajorAndEdu, xSpan, ySpan, xPadding, yPadding, xOffset, yOffset, positions);
            }());

        } else {
            // unknown
            (function () {

                var separation = config.w / 100 / 1.9;
                var xNumber = 10;
                var zNumber = 5;
                var xSplit = 5;
                var xOffset = config.w * .6 - 25;
                var yOffset = config.h * .62;
                placeSingle(hash['Unknown'], separation, xNumber, zNumber,  xSplit, xOffset, yOffset, false, positions);
            }());
            // 
            var placeRadar = function (list, xSpan, ySpan, xPadding, yPadding, xOffset, yOffset, positions) {
                var getRandom = function (min, max, padding) {
                    return min + padding + Math.random() * (max - min - padding * 2);
                };
                list.sort(function (a, b) {
                    if (a['Ever studied abroad'] === b['Ever studied abroad']) {
                        return 0;
                    } else {
                        return a['Ever studied abroad'] === 'No' ? -1 : 1;
                    }
                }).forEach(function (d) {
                    var xIndex = majors.indexOf(d['Major']);
                    var yIndex = edus.indexOf(d['Educational background']) + 1;
                    // console.log(index);
                    var radio = getRandom(xSpan * xIndex, xSpan * (xIndex + 1), xPadding) - Math.PI / 2;
                    var r = getRandom(ySpan * yIndex, ySpan * (yIndex + 1), yPadding);
                    
                    x = Math.cos(radio) * r;
                    y = Math.sin(radio) * r;

                    var offset = d.index;

                    positions[offset] = {
                        x: x + xOffset,
                        y: y + yOffset
                    };
                });
            };
            (function () {
                var xSpan = Math.PI * 2 / majors.length; //separation * 10;
                var ySpan = 52.5;
                var xPadding = xSpan * .1;
                var yPadding = ySpan * .12;
                var xOffset = config.w * .3 + 20.3;
                var yOffset = config.h * .5 + 50;
                placeRadar(hasMajorAndEdu, xSpan, ySpan, xPadding, yPadding, xOffset, yOffset, positions);
            }());

        }
        
        return positions;


    };

    var placeEdu = function () {
        var positions = [];

        if (isMobile.any) {

            var offsetX = config.w / 2 + 13;
            var offsetY = 585;
            var separation = config.w / 100 * 1.15;

            var edus = ['PhD', 'Master', 'Bachelor', 'Associated College Graduate', 'High School Graduate or Lower', 'Unknown'];
            var hash = {};
            data.forEach(function (d, i) {
                var edu = d['Educational background'];
                hash[edu] = hash[edu] || [];
                hash[edu].push(d);
                // d.index = i;
                // positions.push(0, 0, 0);
            });
            // console.log(hash);

            edus.forEach(function (d, i) {
                var xNumber = 5;
                var zNumber = 5;
                var xSplit = 5
                var xOffset = (i < 3 ? -(xNumber * xSplit + xSplit + 4) * separation + 3 : 14) + offsetX;
                var yOffset = ((i % 3) - 1.5) * separation * 20 + offsetY;

                if (i >= 3) {
                    xOffset += 0;
                }
                if (i === 0) {
                    yOffset += 0;
                } else if (i === 1) {
                    yOffset += 150;
                } else if (i === 2) {
                    yOffset += 410;
                } else if (i === 3) {
                    yOffset += 20;
                } else if (i === 4) {
                    yOffset += 30;
                } else if (i === 5) {
                    yOffset += -10;
                }
                placeSingle(hash[d].sort(function (a, b) {
                    if (+a.Age === +b.Age) {
                        return a.index - b.index;
                    }
                    return +b.Age - +a.Age;
                }), separation, xNumber, zNumber,  xSplit, xOffset, yOffset, false, positions);
            });

        } else {

            var offsetX = config.w / 2 - 20;
            var offsetY = 440;
            var separation = config.w / 100 / 1.58;

            var edus = ['PhD', 'Master', 'Bachelor', 'Associated College Graduate', 'High School Graduate or Lower', 'Unknown'];
            var hash = {};
            data.forEach(function (d, i) {
                var edu = d['Educational background'];
                hash[edu] = hash[edu] || [];
                hash[edu].push(d);
                // d.index = i;
                // positions.push(0, 0, 0);
            });
            // console.log(hash);

            edus.forEach(function (d, i) {
                var xNumber = 10;
                var zNumber = 5;
                var xSplit = 5
                var xOffset = (i < 3 ? -(xNumber * xSplit + xSplit + 4) * separation + 3 : 58) + offsetX;
                var yOffset = ((i % 3) - 1.5) * separation * 20 + offsetY;
                if (i === 2) {
                    yOffset += 90;
                } else if (i === 1 || i === 4) {
                    yOffset += 10;
                }
                if (i >= 3) {
                    xOffset -= 18;
                }
                if (i === 5) {
                    yOffset -= -5;
                }
                placeSingle(hash[d].sort(function (a, b) {
                    if (+a.Age === +b.Age) {
                        return a.index - b.index;
                    }
                    return +b.Age - +a.Age;
                }), separation, xNumber, zNumber,  xSplit, xOffset, yOffset, false, positions);
            });

        }

        return positions;

    };

    var placeAge = function () {
        var positions = [];

        if (isMobile.any) {
            var offsetX = 55;
            var offsetY = 140;

            var separation = config.w / 100 / 1.02;

            var years = [192, 193, 194, 195, 196, 197, 198, 199];
            var yearHash = {};
            data.forEach(function (d, i) {
                var year = d['Birth year'].slice(0, 3);
                yearHash[year] = yearHash[year] || [];
                yearHash[year].push(d);
                // d.index = i;
            });
            // console.log(yearHash);
            // 
            var offsetHash = {
                192: 0,
                193: 10,
                194: 20,
                195: 15,
                196: 70,
                197: 200,
                198: 60,
                199: 15
            };
            var sumoffset = 0;
            years.forEach(function (year, i) {
                sumoffset += offsetHash[year];
                var xNumber = 15;
                var yNumber = 5;
                var xSplit = 5;
                var xOffset = offsetX;
                var yOffset = separation * 30 + offsetY + i * 70 + sumoffset;
                placeSingle(yearHash[year].sort(function (a, b) {
                    if (a.Gender === b.Gender) {
                        return 0;
                    } else {
                        return a.Gender < b.Gender ? 1 : -1;
                    }
                }), separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions, separation, 1.02);
            });


        } else {
            var offsetX = config.w / 2 + 14;
            var offsetY = 540;

            var separation = config.w / 100 / 2.8;

            var years = [192, 193, 194, 195, 196, 197, 198, 199];
            var yearHash = {};
            data.forEach(function (d, i) {
                var year = d['Birth year'].slice(0, 3);
                yearHash[year] = yearHash[year] || [];
                yearHash[year].push(d);
                // d.index = i;
            });
            // console.log(yearHash);
            years.forEach(function (year, i) {
                var xNumber = 4;
                var yNumber = 5;
                var xSplit = 5;
                var xOffset = (i - years.length / 2) * (xNumber * xSplit + xSplit + 4) * separation + offsetX;
                var yOffset = separation * 30 + offsetY;
                placeSingle(yearHash[year].sort(function (a, b) {
                    if (a.Gender === b.Gender) {
                        return 0;
                    } else {
                        return a.Gender < b.Gender ? 1 : -1;
                    }
                }), separation, xNumber, yNumber,  xSplit, xOffset, yOffset, true, positions, separation, 1.02);
            });


        }
        return positions;

    };

    var placeGender = function () {
        var positions = [];


        if (isMobile.any) {
            var offsetX = 0;
            var offsetY = 440;

            var separation = config.w / 100 * 1.25;

            var males = data.filter(function (d, i) {
                var isMale = d.Gender === 'Male';
                return isMale;
            });
            var females = data.filter(function (d, i) {
                var isMale = d.Gender === 'Male';
                return !isMale;
            });

            var xNumber = 10;
            var yNumber = 5;
            var xSplit = 5;
            var xOffset = offsetX + (config.w - (xNumber * xSplit + xNumber - 1) * separation) / 2;
            var yOffset = offsetY;
            placeSingle(males, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);

            yOffset += 610;
            placeSingle(females, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);


        } else {


            var offsetX = 110 -325;
            var offsetY = 240;

            var separation = config.w / 100 / 2;

            var males = data.filter(function (d, i) {
                var isMale = d.Gender === 'Male';
                return isMale;
            });
            var females = data.filter(function (d, i) {
                var isMale = d.Gender === 'Male';
                return !isMale;
            });

            var xNumber = 10;
            var yNumber = 5;
            var xSplit = 5;
            var xOffset = offsetX + (config.w - (xNumber * xSplit + xNumber - 1) * separation) / 2;
            var yOffset = offsetY;
            placeSingle(males, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);

            xOffset += config.w / 2 - 200;
            placeSingle(females, separation, xNumber, yNumber,  xSplit, xOffset, yOffset, false, positions);


            // var offsetX = config.w / 2;
            // var offsetY = 300 - 50;

            // var separation = config.w / 100 / 2;

            // var maleIndex = -1;
            // var femaleIndex = -1;

            // data.forEach(function (d, i) {
            //     var isMale = d.Gender === 'Male';
            //     var index;
            //     if (isMale) {
            //         maleIndex += 1;
            //         index = maleIndex;
            //     } else {
            //         femaleIndex += 1;
            //         index = femaleIndex;
            //     }

            //     var x = (index % 50) * separation + Math.floor(index % 50 / 5) * separation + 5 * separation;
            //     if (isMale) {
            //         x = -x;
            //     }
            //     var lineIndex = Math.floor(index / 50);
            //     var y = lineIndex * separation + Math.floor(lineIndex / 5) * separation + 1 * separation;

            //     // positions.push( x - offsetX, y, z - offsetZ );
            //     positions.push({
            //         x: x + offsetX,
            //         y: y + offsetY
            //     });

            // });

        }

        return positions;

    };
    var placeDiySVGWord = function (img) {

        var positions = [];
        var circles = [];
        $(img).find('circle').each(function (i) {
            circles.push({
                x: +$(this).attr('cx'),
                y: +$(this).attr('cy'),
                r: +$(this).attr('r'),
                color: $(this).attr('fill')
            });
        });
        // console.log(circles.length);

        var w = +$(img).find('svg').attr('viewBox').split(' ')[2];
        var separation = config.w / w;
        var offsetX = 0;
        var offsetY = 50;

        if (isMobile.any) {
            separation = config.w / w * 2;
            offsetX = -config.w * .5;
            offsetY += config.h * .1;

        }

        for ( var i = 0; i < particlesTotal; i ++ ) {
            var idx = particlesTotal < circles.length 
                    ? Math.round(i / (particlesTotal - 1) * (circles.length - 1) )
                    : (i % circles.length);
            var circle = circles[idx];

            positions.push({
                x: circle.x * separation + offsetX,
                y: circle.y * separation + offsetY,
                r: circle.r * separation,
                color: circle.color,
                index: i
            });
        }
        return positions;

    };

    var placeDiyWord = function (img) {
        var positions = [];
        // var canvas = document.getElementById('canvas');
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        // var img =  document.getElementById('img1');
        ctx.drawImage(img, 0, 0);

        var textPoint = [];

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < imgData.width; i++) {
          for(var j = 0; j < imgData.height; j++) {
            var index = (i + j * imgData.width) * 4 + 3;
            if(imgData.data[index]
                && imgData.data[index - 4] && imgData.data[index + 4]
                && imgData.data[index + imgData.width * 4] && imgData.data[index - imgData.width * 4]
                // && imgData.data[index - 8] && imgData.data[index + 8]
                // && imgData.data[index + imgData.width * 8] && imgData.data[index - imgData.width * 8]
              ) {
              textPoint.push([i, j]);
            }
          }
        }
        console.log(textPoint);
        if (textPoint.length < 2) {
            return;
        }
        // return;

        var amountX = canvas.width; // 40 / 2;
        var amountZ = canvas.height; // 80 / 2;
        var separation = config.w / canvas.width;
        var offsetX = 0;
        var offsetY = 0;

        for ( var i = 0; i < particlesTotal; i ++ ) {
            var pointIndex = Math.round(i / (particlesTotal - 1) * (textPoint.length - 1) );
            var x = textPoint[pointIndex][0] * separation;
            var y = textPoint[pointIndex][1] * separation;

            positions.push({
                x: x + offsetX,
                y: y + offsetY,
                index: i
            });
        }
        return positions;

    };


    // Random
    var placeRandom = function (margin, marginTop) {
        margin = margin || 10;
        marginTop = marginTop || margin;
        var positions = [];
        for ( var i = 0; i < particlesTotal; i ++ ) {
            positions.push({
                x: Math.random() * (config.w - 2 * margin) + margin,
                y: Math.random() * (config.h - 2 * margin) + marginTop,
                index: i
            });
        }
        return positions;
    };

    // var placeEnd = function () {
    //     var positions = [];
    //     for ( var i = 0; i < particlesTotal; i ++ ) {
    //         positions.push({
    //             x: Math.random() * config.w,
    //             y: Math.random() * config.h - 1.1 * config.h,
    //             index: i
    //         });
    //     }
    //     return positions;
    // };

    var placeParty = function () {
        var positions = [];
        var padding = 100;
        for ( var i = 0; i < particlesTotal; i ++ ) {
            positions.push({
                x: (i % 2 === 0) ? padding : (config.w - padding),
                y: Math.random() * (config.h - padding * 6) + padding * 3,
                index: i
            });
        }
        return positions;
    };




    var placeDiyWord = function (img) {
        var positions = [];
        // var canvas = document.getElementById('canvas');
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        // var img =  document.getElementById('img1');
        ctx.drawImage(img, 0, 0);

        var textPoint = [];

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < imgData.width; i++) {
          for(var j = 0; j < imgData.height; j++) {
            var index = (i + j * imgData.width) * 4 + 3;
            if(imgData.data[index]
                && imgData.data[index - 4] && imgData.data[index + 4]
                && imgData.data[index + imgData.width * 4] && imgData.data[index - imgData.width * 4]
                // && imgData.data[index - 8] && imgData.data[index + 8]
                // && imgData.data[index + imgData.width * 8] && imgData.data[index - imgData.width * 8]
              ) {
              textPoint.push([i, j]);
            }
          }
        }
        console.log(textPoint);
        if (textPoint.length < 2) {
            return;
        }
        // return;

        var amountX = canvas.width; // 40 / 2;
        var amountZ = canvas.height; // 80 / 2;
        var separation = config.w / canvas.width;
        var offsetX = 0;
        var offsetY = 0;

        for ( var i = 0; i < particlesTotal; i ++ ) {
            var pointIndex = Math.round(i / (particlesTotal - 1) * (textPoint.length - 1) );
            var x = textPoint[pointIndex][0] * separation;
            var y = textPoint[pointIndex][1] * separation;

            positions.push({
                x: x + offsetX,
                y: y + offsetY,
                index: i
            });
        }
        return positions;

    };


}
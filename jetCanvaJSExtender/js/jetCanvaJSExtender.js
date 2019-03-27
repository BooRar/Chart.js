
(function (define) {
  'use strict';

  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(factory);
    } else if (typeof exports === 'object') {
      module.jetCanvaJSExtender = factory();
    } else {
      root.jetCanvaJSExtender = factory();
    }
  }(window, function () {
    return (function () {







var jetCanvaJSExtender = function(){

 function jetCanvaJSExtender(){

 }

    jetCanvaJSExtender.updateText = function(obj,i)
    {
        var initialValue = obj.config.percentile;
        //console.log(obj.options.goalAmmount);
        //console.log(obj.options.salesAmmount);
        var dynamicPercentile =(obj.config.data.datasets[0].data[0])/ (  (obj.config.data.datasets[0].data[0]) +     (obj.config.data.datasets[0].data[1]))   *100;
        //console.log(initialValue);
        //
        //
        let diff = obj.options.goalAmmount - obj.options.salesAmmount;
        let decrease = (diff / obj.options.goalAmmount )* 100;
        //console.log(decrease+"==============");

        //    var value = dynamicPercentile * i;
        var value = (100 - decrease) * i;

        obj.options.elements.center.text = (value).toFixed(0) +'%';


    }

    jetCanvaJSExtender.valueofTarget= function(deliveredOpt,deliveredData)
    {
        var goal = deliveredOpt.goalAmmount ;
        var currentSales = deliveredOpt.salesAmmount;
        if (goal>currentSales)
        {
            let percentages =  (currentSales/goal)*100;
            //console.log("goal Not Met : " + percentages);
            let data = [percentages,100-percentages];
            //console.log(deliveredData);
            deliveredData.datasets["0"].data = data;

        }else {

            //let percentages =  (currentSales/goal)/100;
            //
            //Decrease = Original Number - New Number
            let change = goal - currentSales;
            //% Decrease = Decrease ÷ Original Number × 100

            let decrease = (change / goal )* 100;
            //console.log( "change" + decrease);

            let percentageToUse = Math.abs(decrease);

            if (percentageToUse <= 100){
                let data = [100,0];

                let data2 = [percentageToUse,100-percentageToUse];

                deliveredData.datasets["0"].data = data;
                deliveredData.datasets["1"].data = data2;
            }
            if (percentageToUse >100 && percentageToUse <200  ){

                let adkjustPerc = percentageToUse -100 ;
                let data = [100,0];
                let data2 = [100,0];
                let data3 = [adkjustPerc,100-adkjustPerc];

                deliveredData.datasets["0"].data = data;
                deliveredData.datasets["1"].data = data2;
                deliveredData.datasets["2"].data = data3;
            }

            if (percentageToUse >200 && percentageToUse <300  ){

                let adkjustPerc = percentageToUse -200 ;
                let data = [100,0];
                let data2 = [100,0];
                let data3 = [100,0];
                let data4 = [adkjustPerc,100-adkjustPerc];

                deliveredData.datasets["0"].data = data;
                deliveredData.datasets["1"].data = data2;
                deliveredData.datasets["2"].data = data3;
                deliveredData.datasets["3"].data = data4;
            }

        }

    }

    Chart.pluginService.register({
        afterDraw: function (chart) {
            if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(20 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse+"px " + fontStyle;
                ctx.fillStyle = color;

                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
            }
        }
    });

    jetCanvaJSExtender.valueofTarget(deliveredOpt,deliveredData);


return jetCanvaJSExtender;
}
return jetCanvaJSExtender;
}());
}));
}(window.define));

define (function (require) {

    var configService = require('horizontal/config/configService');
    var pv = require('cdf/lib/CCC/protovis');
    var MentalRiskService = function (dvtUtils, $log) {
        return {
            getInternalExternalRAPlots: function() {
                return [
                    {
                        name: "main",
                        dataPart: "0",
                        barSizeMax: 15,
                        bar_call: function(){
                            var resolution = screen.width;

                            $(window).on("resize",function(e){
                              resolution = screen.width;
                            });

                            if(resolution <= 768){
                                //$log.warn(this);

                                //Non EU countries stroke separator horizontal
                                this.add(pv.Rule)
                                    //Negative value in top line continues out of the chart
                                    .top(function(scene){
                                        //$log.warn(this);
                                        var baseScale = this.getContext().chart.axes.base.scale;
                                        
                                        return baseScale('Belgium (BE)') + 11 /*this.sign.panel.barWidth/2*/;
                                    })
                                    .height(null) // clear any inherited value
                                    .width(null)  // clear any inherited value
                                    .strokeStyle('black')
                                    .lineWidth(3)
                                    .left(0)
                                    .right(0);
                                
                                //EU28 stroke separator horizontal
                                this.add(pv.Rule)
                                    //Negative value in top line continues out of the chart
                                    .top(function(scene){
                                        var baseScale = this.getContext().chart.axes.base.scale;
                                        
                                        return baseScale('Iceland (IS)') + 11;
                                    })
                                    .height(null) // clear any inherited value
                                    .width(null)  // clear any inherited value
                                    .strokeStyle('black')
                                    .lineWidth(3)
                                    .left(0)
                                    .right(0);
                            }else{
                                //EU28 stroke separator vertical
                                this.add(pv.Rule)
                                    //Negative value in top line continues out of the chart
                                    .top(0)
                                    .bottom(0)
                                    .height(null) // clear any inherited value
                                    .width(null)  // clear any inherited value
                                    .strokeStyle('black')
                                    .lineWidth(3)
                                    .left(function(scene){
                                        //$log.warn(scene);
                                        var countryKey = scene.firstAtoms.category;
                                        var panelWidth = this.root.width();
                                        return panelWidth/33.5;               
                                    });

                                //Non EU countries stroke separator vertical
                                this.add(pv.Rule)
                                    .top(0)
                                    .bottom(0)
                                    .height(null) // clear any inherited value
                                    .width(null)  // clear any inherited value
                                    .strokeStyle('black')
                                    .lineWidth(3)
                                    .left(function(scene){
                                        var baseScale = this.getContext().chart.axes.base.scale;
                                        var countryKey = scene.firstAtoms.category;
                                        var panelWidth = this.root.width();                                        

                                        if(resolution < 960){
                                            return baseScale('Switzerland (CH)') - 11;
                                        }

                                        return baseScale('Switzerland (CH)') - this.sign.panel.barWidth; 
                                    });
                            }   
                        },
                        label_textMargin: 7,
                        label_textBaseline: 'bottom',
                        valuesAnchor: 'top',
                        valuesOptimizeLegibility: true,
                        visualRoles:{
                            series: 'series',
                            category:'category',
                            value: 'value'
                        }
                    }
                ];
            },
            getRiskAssessmentSplit: function(pCountry1, pCountry2){
                return [
                    {
                        name: "main",
                        dataPart: "0",
                        barSizeMax: 30,
                        label_textMargin: 7,
                        label_textBaseline: 'bottom',
                        valuesAnchor: 'top',
                        valuesOptimizeLegibility: true,
                        label_textStyle: function(scene){
                            var countryKey = scene.firstAtoms.series;
                            if (countryKey == 'EU28') {
                                return dvtUtils.getEUColor();
                            } else if(countryKey.value.match(pCountry1)){
                                return dvtUtils.getColorCountry(1);
                            } else if(countryKey.value.match(pCountry2)) {
                                return dvtUtils.getColorCountry(2);
                            }
                            return dvtUtils.getChartLightGrayColor();
                        },
                        visualRoles:{
                            series: 'series',
                            category:'category',
                            value: 'value'
                        }
                    }
                ];
            },
            getPoorCommunicationPlot: function() {
                return [
                    {
                        name: "main",
                        dataPart: "0",
                        label_textMargin: 5,
                        valuesAnchor: 'right',
                        valuesOptimizeLegibility: true,
                        visualRoles:{
                            category:'category'
                        }
                    }
                ];
            }
        };
    };

    MentalRiskService.$inject = ['dvtUtils', '$log'];

    return MentalRiskService;

});
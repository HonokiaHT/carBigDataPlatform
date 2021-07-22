<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">

        <!-- 筛选栏 -->
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label for="carBrand_id">厂商</label>
              <md-select v-model="carBrand"
                        id="carBrand_id"
                        @md-selected="carBrandChange"
                        >
                <md-option 
                  v-for="singleCarBrand in carBrands"
                  :key="singleCarBrand._id"
                  :value="singleCarBrand.brand_name"
                  >
                  {{singleCarBrand.brand_name}}
                </md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label for="carClass_id">车型</label>
              <md-select v-model="carClass"
                        id="carClass_id"
                        @md-selected="carClassChange"
                        >
                <md-option 
                  v-for="singleCarClass in carClasses"
                  :key="singleCarClass._id"
                  :value="singleCarClass.class_name"
                  >
                  {{singleCarClass.class_name}}
                </md-option>
              </md-select>
            </md-field>
          </div>

        </div>

        <!-- <ve-line
          :tooltip="carContrast_linePieChart.toolTip"
          :dataset="carContrast_linePieChart.dataset"
          :xAxis="carContrast_linePieChart.xAxis"
          :yAxis="carContrast_linePieChart.yAxis"
          :grid="carContrast_linePieChart.grid"
          :series="carContrast_linePieChart.series"
        >
        </ve-line> -->

        <template>
          <div class="Echarts">
            <div id="carContrast_linePieChart_id" style="width: 100%;height:500px;"></div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
// // import echarts from 'echarts';
// var chartDom = document.getElementById('main');
// var option;

export default {
  name: "Echarts",

  data() {
    return {
      //车辆选择部分
      carBrand: "",
      carClass: "",

      carBrands: [
      ],       
      carClasses: [
      ],

      carContrast_linePieChart: {
        // legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset:{
          source:[],
        },
        xAxis: {
          name: "年份",
          type: "category",
        },
        yAxis: {
          name: "销售量",
          gridIndex: 0,
        },
        grid: {
          top: "55%",
        },
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                emphasis: {focus: 'data'},
                label: {
                    formatter: '{b}: {@2017} ({d}%)'
                },
                encode: {
                    itemName: 'year',
                    value: '2017',
                    tooltip: '2017'
                }
            }
        ],
      },


    };
  },

 mounted(){
    console.log("页面加载完成");
    console.log("调用 API 来获取车品牌列表并更新下拉框数据");
    console.log(this.carBrands);
    this.$axios.get("https://qcqn74.fn.thelarkcloud.com/findBrandList")
      .then((response) => {
          this.carBrands = response.data;
          this.carBrand = this.carBrands[0].brand_name;
          console.log(this.carBrands);
        });

    console.log("调用 API 来获取车型列表并更新下拉框数据");
    this.$axios.get("https://qcqn74.fn.thelarkcloud.com/findClassList")
      .then((response) => (this.carClasses = response.data));

    this.createECharts();
  },



  methods: {
    //车品牌更新
    carBrandChange: function (ele) {
      if(this.carClass != "")
      {
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/saleinBrandClass",{carBrand: this.carBrand, carClass: this.carClass})
          .then((response) => {
            this.carContrast_linePieChart.dataset.source = [];
            // this.carContrast_linePieChart.legend = "";

            this.carContrast_linePieChart.dataset.source.push(['year', '2017', '2018', '2019', '2020', '2021']);

            let names = response.data.car_name;
            let prices = response.data.car_price;
            let sales = response.data.car_sales;

            for(let i in names)
            {
              let temp = [names[i].car_name];
              for(let j in sales[i].car_year_sale)
                temp.push(sales[i].car_year_sale[j]);

              this.carContrast_linePieChart.dataset.source.push(temp);
            }

            console.log(this.carContrast_linePieChart.dataset.source);
            this.createECharts();
          });
      }
      console.log(ele);
    },

    //车型更新
    carClassChange: function (ele) {
      if(this.carBrand != "")
      {
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/saleinBrandClass",{carBrand: this.carBrand, carClass: this.carClass})
          .then((response) => {
            this.carContrast_linePieChart.dataset.source = [];
            // this.carContrast_linePieChart.legend = "";

            this.carContrast_linePieChart.dataset.source.push(['year', '2017', '2018', '2019', '2020', '2021']);

            let names = response.data.car_name;
            let prices = response.data.car_price;
            let sales = response.data.car_sales;

            for(let i in names)
            {
              let temp = [names[i].car_name];
              for(let j in sales[i].car_year_sale)
                temp.push(sales[i].car_year_sale[j]);

              this.carContrast_linePieChart.dataset.source.push(temp);
            }

            console.log(this.carContrast_linePieChart.dataset.source);
            this.createECharts();
          });
      }
      console.log(ele);
    },

    //创建图表
    createECharts: function(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('carContrast_linePieChart_id'));

      myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
      });

      // 指定图表的配置项和数据，使用动态数据
      // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(this.carContrast_linePieChart);
    },

  }
};
</script>

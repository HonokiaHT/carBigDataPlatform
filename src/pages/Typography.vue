<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <!-- <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Material Dashboard Heading</h4>
            <p class="category">Created using Roboto Font Family</p>

          </md-card-header>
          <md-card-content>
            一个选择是，将筛选下拉栏写在这里
          </md-card-content>
        </md-card> -->

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

          <div class="md-layout-item">
            <md-field>
              <label for="carName_id">车名</label>
              <md-select v-model="carName"
                        id="carName_id"
                        @md-selected="carNameChange"
                        >
                <md-option 
                  v-for="singleCarName in carNames"
                  :key="singleCarName._id"
                  :value="singleCarName.car_name"
                  >
                  {{singleCarName.car_name}}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <!-- 折线图统计搜索数 -->
        <ve-line
          :data="searches_lineChart.data" 
          :title="searches_lineChart.title"
          :toolbox="searches_lineChart.toolBox"
          :xAxis="searches_lineChart.xAxis"
          :yAxis="searches_lineChart.yAxis"
          :series="searches_lineChart.series"
          :legend="searches_lineChart.legend"
          :settings="searches_lineChart.settings"
          :mark-point="searches_lineChart.markPoint"
          >
        </ve-line>
        <!-- <button v-on:click="loadData">Load!</button> -->

        
      </div>
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import markPoint from "echarts/lib/component/markPoint";




//待更新数据



export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },


  data() {
    return {
      //车辆选择部分
      carBrand: "",
      carClass: "",
      carName: "待选定",

      carBrands: [
      ],       
      carClasses: [
      ],
      carNames:[
      ],


      //折线图相关
      searches_lineChart:{
        data: {
          columns: ["日期","搜索次数"],
          rows: [
            { "日期": "2017-01", '搜索次数': ""},
            { "日期": '2017-02', '搜索次数': ""},
            { "日期": '2017-03', '搜索次数': ""},
            { "日期": '2017-04', '搜索次数': ""},
            { "日期": '2017-05', '搜索次数': ""},
            { "日期": '2017-06', '搜索次数': ""},
            { "日期": "2017-07", '搜索次数': ""},
            { "日期": '2017-08', '搜索次数': ""},
            { "日期": '2017-09', '搜索次数': ""},
            { "日期": '2017-10', '搜索次数': ""},
            { "日期": '2017-11', '搜索次数': ""},
            { "日期": '2017-12', '搜索次数': ""},
            { "日期": "2018-01", '搜索次数': ""},
            { "日期": '2018-02', '搜索次数': ""},
            { "日期": '2018-03', '搜索次数': ""},
            { "日期": '2018-04', '搜索次数': ""},
            { "日期": '2018-05', '搜索次数': ""},
            { "日期": '2018-06', '搜索次数': ""},
            { "日期": "2018-07", '搜索次数': ""},
            { "日期": '2018-08', '搜索次数': ""},
            { "日期": '2018-09', '搜索次数': ""},
            { "日期": '2018-10', '搜索次数': ""},
            { "日期": '2018-11', '搜索次数': ""},
            { "日期": '2018-12', '搜索次数': ""},
            { "日期": "2019-01", '搜索次数': ""},
            { '日期': '2019-02', '搜索次数': ""},
            { '日期': '2019-03', '搜索次数': ""},
            { '日期': '2019-04', '搜索次数': ""},
            { '日期': '2019-05', '搜索次数': ""},
            { '日期': '2019-06', '搜索次数': ""},
            { "日期": "2019-07", '搜索次数': ""},
            { '日期': '2019-08', '搜索次数': ""},
            { '日期': '2019-09', '搜索次数': ""},
            { '日期': '2019-10', '搜索次数': ""},
            { '日期': '2019-11', '搜索次数': ""},
            { '日期': '2019-12', '搜索次数': ""},
            { "日期": "2020-01", '搜索次数': ""},
            { "日期": "2020-02", '搜索次数': ""},
            { "日期": '2020-03', '搜索次数': ""},
            { "日期": '2020-04', '搜索次数': ""},
            { "日期": '2020-05', '搜索次数': ""},
            { "日期": '2020-06', '搜索次数': ""},
            { "日期": "2020-07", '搜索次数': ""},
            { "日期": '2020-08', '搜索次数': ""},
            { "日期": '2020-09', '搜索次数': ""},
            { "日期": '2020-10', '搜索次数': ""},
            { "日期": '2020-11', '搜索次数': ""},
            { "日期": '2020-12', '搜索次数': ""},
            { "日期": "2021-01", '搜索次数': ""},
            { "日期": "2021-02", '搜索次数': ""},
            { "日期": '2021-03', '搜索次数': ""},
            { "日期": '2021-04', '搜索次数': ""},
            { "日期": '2021-05', '搜索次数': ""},
            { "日期": '2021-06', '搜索次数': ""},
            { "日期": "2021-07", '搜索次数': ""},
            // { "日期": '2021-08', '搜索次数': ""},
            // { "日期": '2021-09', '搜索次数': ""},
            // { "日期": '2021-10', '搜索次数': ""},
            // { "日期": '2021-11', '搜索次数': ""},
            // { "日期": '2021-12', '搜索次数': ""},
          ],
        },
        markPoint: {
          data: [
            // {coord: ['2018-02', "3530"], value: "广告1"},
            // {type: 'max', name: '最大值'}
          ]
        },
        // legend: {
        //   // data: ['最高气温']
        //   // icon: 'arrow',
        // },
        settings: {
          xAxisType: "time"
        },
        toolBox: {
          show: true,
          feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        // xAxis: {
        //   type: 'category',
        //   data: date,
        // },

        // yAxis: {
        //   type: 'value',
        //   // data: searchTimes,
        // },
        // series: {
        //   name: '搜索次数',
        //   type: 'line',
        //   data: searchTimes,
        //   // markPoint: {
        //   //   data: [
        //   //     {coord: [1, searchTimes[1]], value: "广告1"},
        //   //     {type: 'min', name: '最小值'}
        //   //   ]
        //   // },
        // },
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
  },

  // `methods` 内部的 `this` 指向当前活动实例
  methods: {
    // loadData: function () {
    //   console.log(this.sales_line_chart);
    //   this.carBrands.push({id: 3, name: "品牌3"});
    //   console.log(this.carBrands);
    // },

    
    //车品牌更新
    carBrandChange: function (ele) {
      this.carName = "待选定";
      if(this.carClass != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/carNameCheck",{carBrand: this.carBrand, carClass: this.carClass})
          .then((response) => {
            this.carNames = response.data;
            if(this.carNames[0] != null)
              this.carName = this.carNames[0].car_name;
          });
      }
      console.log(ele);
    },

    //车型更新
    carClassChange: function (ele) {
      this.carName = "待选定";
      if(this.carBrand != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/carNameCheck",{carBrand: this.carBrand, carClass: this.carClass})
          .then((response) => {
            this.carNames = response.data;
            if(this.carNames[0] != null)
              this.carName = this.carNames[0].car_name;
          });
      }
      console.log(ele);
    },

    //车辆名更新
    carNameChange: function (ele) {
      if(this.carName != "")
      {
        // console.log("调用 API 来获取车辆名对应的搜索次数并更新页面信息");
        // this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarIndex",{carName: this.carName})
        //   .then((response) => {
        //     console.log(response.data);
        //     for(let i in response.data)
        //       this.searches_lineChart.data.rows[i].搜索次数 = response.data[i];
        //   });

        console.log("调用 API 来获取车辆名对应的搜索次数以及广告投放并更新页面信息");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findAD",{carName: this.carName})
          .then((response) => {
            console.log(response.data);
            //先清空
            this.searches_lineChart.markPoint.data = [];
            for(let i in this.searches_lineChart.data.rows)
            {
              this.searches_lineChart.data.rows[i].搜索次数 = "";
            }

            //再赋值s
            for(let i in response.data.month_index)
            {
              this.searches_lineChart.data.rows[i].搜索次数 = response.data.month_index[i];
              if(response.data.ad_data_cost[i] != 0)
              {
                this.searches_lineChart.markPoint.data.push({
                  coord: [this.searches_lineChart.data.rows[i].日期, this.searches_lineChart.data.rows[i].搜索次数],
                  value: response.data.ad_data_cost[i],
                })
              }
            }
          });

      }
      console.log(ele);
    },

  },
};
</script>

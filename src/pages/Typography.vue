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
                        >
                <md-option 
                  v-for="singleCarBrand in carBrands"
                  :key="singleCarBrand.id"
                  :value="singleCarBrand.name"
                  >
                  {{singleCarBrand.name}}
                </md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label for="carClass_id">车型</label>
              <md-select v-model="carClass" id="carClass_id">
                <md-option 
                  v-for="singleCarClass in carClasses"
                  :key="singleCarClass.id"
                  :value="singleCarClass.name"
                  >
                  {{singleCarClass.name}}
                </md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label for="carName_id">车名</label>
              <md-select v-model="carName"
                        id="carName_id"
                        @click="brandChange">
                <md-option 
                  v-for="singleCarName in carNames"
                  :key="singleCarName.sid"
                  :value="singleCarName.name"
                  >
                  {{singleCarName.name}}
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
          theme="light"
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
      carBrand: "品牌1",
      carClass: "",
      carName: "",

      carBrands: [
        {id: 1, name: "品牌1"},
        {id: 2, name: "品牌2"},
        {id: 3, name: "品牌3"},
      ],       
      carClasses: [
        {id: 1, name: "车型1"},
        {id: 2, name: "车型2"},
        {id: 3, name: "车型3"},
      ],
      carNames:[

      ],


      //折线图相关
      searches_lineChart:{
        data: {
          columns: ["日期","搜索次数"],
          rows: [
            { "日期": "2018-01-01", '搜索次数': 1393},
            { '日期': '2018-01-02', '搜索次数': 3530},
            { '日期': '2018-01-03', '搜索次数': 2923},
            { '日期': '2018-01-05', '搜索次数': 1723},
            { '日期': '2018-01-10', '搜索次数': 3792},
            { '日期': '2018-01-20', '搜索次数': 4593}
          ],
        },
        markPoint: {
          data: [
              {coord: ['2018-01-02', 3530], value: "广告1"},
              {type: 'max', name: '最大值'}
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
  // `methods` 内部的 `this` 指向当前活动实例
  methods: {
    loadData: function () {
      console.log(this.sales_line_chart);
      this.carBrands.push({id: 3, name: "品牌3"});
      console.log(this.carBrands);
    },
    carBrandChange: function (ele) {
      if(this.carClass != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
      }
      console.log(ele);
    },
    carClassChange: function (ele) {
      if(this.carBrand != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
      }
      console.log(ele);
    },
    carNameChange: function (ele) {
      if(this.carName != "")
      {
        console.log("调用 API 来获取车辆名对应的搜索次数及广告投放情况并更新页面信息");
      }
      console.log(ele);
    },

  },
};
</script>

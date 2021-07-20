<template>
  <div class="content">
    <div class="md-layout">

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >

        <!-- 车辆筛选部分 -->
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
                  :key="singleCarName.id"
                  :value="singleCarName.name"
                  >
                  {{singleCarName.name}}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>



      <!-- 汽车信息 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <h2 class="title">{{carName}}</h2>
          <p>这里是图片</p>
          <img id="imgid" src="../car_example.jpg"/>
          <table class="category">
            <tr>
              <!-- <td>油耗：</td>
              <td>很大</td>
            </tr>
            <tr>
              <td>指导价：</td>
              <td>100w</td> -->
            </tr>
          </table>
      </div>

      <!-- 购车目的 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <!-- <ve-line  :data="sales_line_chart.data" :title="sales_line_chart.title"></ve-line>
        <button v-on:click="loadData">Load!</button> -->
        <ve-ring :data="buyPurpose_ringChart.data"
                :title="buyPurpose_ringChart.title" 
                :settings="buyPurpose_ringChart.settings"
                :legend="buyPurpose_ringChart.legend"
                >
        </ve-ring>
      </div>
      
      <!-- 销售组成 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <ve-pie :data="salesComponent_pieChart.data"
                :title="salesComponent_pieChart.title"
                :settings="salesComponent_pieChart.settings"
                :legend="buyPurpose_ringChart.legend">
        </ve-pie>
      </div>

      <!-- 总销量 -->
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <h3 class="category">销售总量</h3>
            <h3 class="title">{{info_data.salesCount}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last 5 Years
            </div>
          </template>
        </stats-card>
      </div>

      <!-- 指导价 -->
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>paid</md-icon>
          </template>

          <template slot="content">
            <h3 class="category">指导价</h3>
            <h3 class="title">{{info_data.price}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              Tracked from Github
            </div>
          </template>
        </stats-card>
      </div>

      <!-- 油耗 -->
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>local_gas_station</md-icon>
          </template>

          <template slot="content">
            <h3 class="category">油耗</h3>
            <h3 class="title">
              <br/>
              {{info_data.oilConsume}}
              <small>L</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <!-- <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">Get More Space...</a> -->
            </div>
          </template>
        </stats-card>
      </div>

      <!-- 包含颜色 -->
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>palette</md-icon>
          </template>

          <template slot="content">
            <h3 class="category">包含颜色</h3>
            <h3 class="title">{{info_data.colors[0]}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>

      
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable,
} from "@/components";
// import VCharts from "v-charts";

import VeRing from "v-charts/lib/ring.common";
import VeLine from "v-charts/lib/line.common";
import VePie from "v-charts/lib/pie.common";


export default {
  components: {
    StatsCard,
    // ChartCard,
    // NavTabsCard,
    // NavTabsTable,
    // OrderedTable,
    // VeLine
  },

  data() {
    return {
      //车辆选择部分
      carBrand: "示例品牌",
      carClass: "示例车型",
      carName: "示例车辆",

      carBrands:[
        {id: 1, name: "品牌1"},
        {id: 2, name: "品牌2"},
        {id: 3, name: "品牌3"},
      ],
      carClasses:[
        {id: 1, name: "车型1"},
        {id: 2, name: "车型2"},
        {id: 3, name: "车型3"},
      ],
      carNames:[

      ],

      //车辆信息
      info_data:{
        salesCount: 23367,
        price: "100,000",
        oilConsume: 100,
        colors: ["蓝","红","绿"],
        img: "",
      },


      //购车目的
      buyPurpose_ringChart:{
        data:{
          columns: ['目的', '人数'],
          rows: [
            { '目的': '出行', '人数': 1393 },
            { '目的': '代步', '人数': 3530 },
            { '目的': '娱乐', '人数': 2923 },
            { '目的': '其他', '人数': 1723 },
            { '目的': '其它2', '人数': 3792 },
            { '目的': '其他3', '人数': 4593 }
          ]
        },
        settings:{
          radius: [60, 100],
          lable:{
            show: true,
            position: "center"
          }
          // offsetY: 
        },
        title: {
          text: "购车目的",
          subtext: '虚构',
          left: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
      },

      //销售组成
      salesComponent_pieChart:{
        data:{
          columns: ["组成", "销售数"],
          rows: [
            { "组成": "10~20岁", "销售数": 1393 },
            { "组成": "20~30岁", "销售数": 3530 },
            { "组成": "30~40岁", "销售数": 2923 },


            { "组成": "华北", "销售数": 1723 },
            { "组成": "西北", "销售数": 3792 },
            { "组成": "西南", "销售数": 4593 }
          ]
        },
        settings:{
          level:[
            ["10~20岁","20~30岁","30~40岁"],
            ["华北","西北","西南"]
          ]
        },
        title:{
          text: "销售组成",
          subtext: "虚构",
          left: "center"
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
      },


      
    };
  },
  // `methods` 内部的 `this` 指向当前活动实例
  methods: {
    loadData: function () {
      console.log(this.sales_line_chart);
      this.sales_line_chart.data.rows = [
        { 年份: "2017年", 销售额: 123, 销售: 193 },
        { 年份: "2018年", 销售额: 13, 销售: 123 },
        { 年份: "2019年", 销售额: 21234, 销售: 223 },
        { 年份: "2020年", 销售额: 4123, 销售: 236 },
        { 年份: "2021年", 销售额: 3123, 销售: 23 },
      ];
    },
    brandChange: function(){
      this.carNames = this.carBrands;
      console.log(typeof(this.info_data.img));
      console.log(document.getElementById("imgid").src);
    }
  },
};
</script>

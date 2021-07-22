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
                        @md-selected="carNameChange">
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
      </div>



      <!-- 汽车信息 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <h2 class="title">{{carName}}</h2>
          <p v-if="!hasImg">这里是图片</p>
          <img id="imgid" :src= "selectedCarInfo.img"/>
          <table class="category">
            <!-- <tr>
              <td>油耗：</td>
              <td>很大</td>
            </tr>
            <tr>
              <td>指导价：</td>
              <td>100w</td>
            </tr> -->
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
                :legend="salesComponent_pieChart.legend"
                >
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
            <h3 class="title">{{selectedCarInfo.salesCount}}
              <small>辆</small>
            </h3>
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
            <h3 class="title">{{selectedCarInfo.price}}
              <small>万</small>
            </h3>
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
              {{selectedCarInfo.oilConsume}}
              <small>L</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              百公里
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
            <h3 class="title">{{selectedCarInfo.colors}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>palette</md-icon>
              Colorful
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

var salesComponentColomn = "";
var buyPurpose_ringChart_init = {
          columns: ['目的','人数'],
          rows: [
            { '目的': '旅行', '人数': "" },
            { '目的': '代步', '人数': "" },
            { '目的': '娱乐', '人数': "" },
            { '目的': '商业', '人数': "" },
            { '目的': '其它', '人数': "" },
          ]
        };
var salesComponent_pieChart_init = {
          columns: ["组成", "销售数"],
          rows: [
            { "组成": "20~24岁", "销售数": "" },
            { "组成": "25~29岁", "销售数": "" },
            { "组成": "30~34岁", "销售数": "" },
            { "组成": "35~39岁", "销售数": "" },
            { "组成": "40岁以上", "销售数": "" },

            { "组成": "北京", "销售数": "" },
            { "组成": "上海", "销售数": "" },
            { "组成": "广东", "销售数": "" },
            { "组成": "重庆", "销售数": "" },
          ]
        };



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
      carBrand: "",
      carClass: "",
      carName: "待选定",

      carBrands: [
      ],       
      carClasses: [
      ],
      carNames:[
      ],

      hasImg: false,

      //车辆信息
      selectedCarInfo:{
        salesCount: "",
        price: "",
        oilConsume: "",
        colors: "",
        img: "",
      },

      //购车目的
      buyPurpose_ringChart:{
        data: buyPurpose_ringChart_init,
        settings:{
          radius: [40, 100],
          lable:{
            show: true,
            position: "center"
          },
          offsetY: 250,
        },
        title: {
          text: "购车目的",
          // subtext: '虚构',
          left: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
      },

      //销售组成
      salesComponent_pieChart:{
        data: salesComponent_pieChart_init,
        settings:{
          level:[
            ["北京","上海","广东","重庆"],
            ["20~24岁","25~29岁","30~34岁","35~39岁","40岁以上"],
          ],
          offsetY: 250,
        },
        title:{
          text: "销售组成",
          // subtext: "虚构",
          left: "center"
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
      },

      
    };
  },

  mounted(){
    console.log("页面加载完成");

    console.log("调用 API 来获取车品牌列表并更新下拉框数据");
    // console.log(this.carBrands);
    this.$axios.get("https://qcqn74.fn.thelarkcloud.com/findBrandList")
      .then((response) => {
          this.carBrands = response.data;
          this.carBrand = this.carBrands[0].brand_name;
          // this.carName = this.carNames[0].car_name;
          // console.log(this.carBrands);
        });


    console.log("调用 API 来获取车型列表并更新下拉框数据");
    this.$axios.get("https://qcqn74.fn.thelarkcloud.com/findClassList")
      .then((response) => {
        this.carClasses = response.data;
        this.carClass = this.carClasses[3].class_name;
      });
  },

  // `methods` 内部的 `this` 指向当前活动实例
  methods: {
    //品牌选定
    carBrandChange: function (ele) {
      this.carName = "待选定";
      if(this.carClass != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据1");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/carNameCheck",{carBrand: this.carBrand, carClass: this.carClass})
            .then((response) => {
              this.carNames = response.data;
              if(this.carNames[0] != null)
                this.carName = this.carNames[0].car_name;
              else
              {
                // this.buyPurpose_ringChart.data = buyPurpose_ringChart_init;
                // this.salesComponent_pieChart.data = salesComponent_pieChart_init;
                this.selectedCarInfo.price = "";
                this.selectedCarInfo.oilConsume = "";
                this.selectedCarInfo.colors = "";
                this.selectedCarInfo.salesCount = "";
                this.selectedCarInfo.img = "";
              }
            });
      }
      console.log(ele);
    },
    //车型选定
    carClassChange: function (ele) {
      this.carName = "待选定";
      if(this.carBrand != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据2");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/carNameCheck",{carBrand: this.carBrand, carClass: this.carClass})
          .then((response) => {
            this.carNames = response.data;
            if(this.carNames[0] != null)
              this.carName = this.carNames[0].car_name;
            else
            {
              this.selectedCarInfo.price = "";
              this.selectedCarInfo.oilConsume = "";
              this.selectedCarInfo.colors = "";
              this.selectedCarInfo.salesCount = "";
              this.selectedCarInfo.img = "";
            }
          });
      }
      console.log(ele);
    },

    //更新页面内所有车辆相关信息
    carNameChange: function (ele) {
      if(this.carName != "")
      {
        console.log("调用 API 来获取车辆名对应的信息情况并更新页面信息");

        //更新购车目的
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findByAim",{carName: this.carName})
          .then((response) => {
            for (let i in response.data)
              this.buyPurpose_ringChart.data.rows[i].人数 = response.data[i];
            // console.log(this.buyPurpose_ringChart.data.rows);
          });
        
        //更新销售组成_年龄
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findBuyCompose",{carName: this.carName})
          .then((response) => {
            for (let i = 0; i < 5; i++)
              this.salesComponent_pieChart.data.rows[i].销售数 = response.data[i];
            // console.log(this.salesComponent_pieChart.data.rows);
          });

        //更新销售组成_北上广重
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarSaleRegion",{carName: this.carName, year: "0"})
          .then((response) => {
              this.salesComponent_pieChart.data.rows[5].销售数 = response.data[0];
              this.salesComponent_pieChart.data.rows[6].销售数 = response.data[8];
              this.salesComponent_pieChart.data.rows[7].销售数 = response.data[18];
              this.salesComponent_pieChart.data.rows[8].销售数 = response.data[21];
          });


        //更新车辆信息
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarInfo",{carName: this.carName})
          .then((response) => {
            this.selectedCarInfo.price = response.data.car_price;
            this.selectedCarInfo.oilConsume = response.data.car_consume;
            // this.selectedCarInfo.colors = response.data.car_color;
            this.selectedCarInfo.salesCount = response.data.car_salesCount;
            this.selectedCarInfo.img = response.data.car_img;
            console.log(response.data.car_img);
            if(response.data.car_img != "")
              this.hasImg = true;
            else
              this.hasImg = false;
            
            for(let i in response.data.car_color)
              this.selectedCarInfo.colors = this.selectedCarInfo.colors + ", " + response.data.car_color[i];

            this.selectedCarInfo.colors = this.selectedCarInfo.colors.slice(2);
          });

      }
      console.log(ele);
    },
  },
};
</script>

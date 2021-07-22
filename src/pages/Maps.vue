<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">

        <!-- 车辆筛选部分 -->
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label for="selectBy_id">筛选类别</label>
              <md-select v-model="selectBy"
                        id="selectBy_id"
                        @md-selected="selectByChange">
                <md-option key="1" value="brand">按品牌</md-option>
                <md-option key="2" value="class">按车型</md-option>
                <md-option key="3" value="name">按车名</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label for="carBrand_id">品牌</label>
              <md-select v-model="carBrand"
                        id="carBrand_id"
                        :disabled= "brandDisabled"
                        @md-selected="carBrandChange">
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
                        :disabled="classDisabled"
                        @md-selected="carClassChange">
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
                        :disabled="nameDisabled"
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

        <!-- 年份筛选部分 -->
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field style="width: 25%; float: right">
              <label for="selectYear_id">年份筛选</label>
              <md-select v-model="selectYear"
                        id="selectYear_id"
                        @md-selected="selectYearChange">
                <md-option key="0" value="0">All</md-option>
                <md-option key="1" value="2021">2021年</md-option>
                <md-option key="2" value="2020">2020年</md-option>
                <md-option key="3" value="2019">2019年</md-option>
                <md-option key="4" value="2018">2018年</md-option>
                <md-option key="5" value="2017">2017年</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <ve-map
          :title="sales_mapChart.title"
          :tooltip="sales_mapChart.toolTip"
          :visualMap="sales_mapChart.visualMap"
          :toolbox="sales_mapChart.toolBox"
          :geo="sales_mapChart.geo"
          :series="sales_mapChart.series"
          theme="light"
          background-color=""
          >
        </ve-map>

      </div>
    </div>
  </div>
</template>

<script src="./../../node_modules/echarts/map/js/china.js"></script>
<script>

export default {
  data() {
    return{
      selectBy:"brand",
      brandDisabled:false,
      classDisabled:true,
      nameDisabled:true,
      selectYear:"0",

      carBrand: "",
      carClass: "",
      carName: "",

      carBrands:[
      ],
      carClasses:[
      ],
      carNames:[
      ],

      sales_mapChart:{
        title:{
          text: '销售情况',
          // subtext: 'Data from www.census.gov',
          // sublink: 'http://www.census.gov/popest/data/datasets.html',
          left: 'right'
        },
        toolTip:{
          // formatter: function (params) {
          //   var nameArr = params.seriesName.split(",");
          //   var num1=0;
          //   if(!isNaN(params.value)){
          //       num1=params.value;
          //   }
          //   return params.name + '<br />' + nameArr[0] + '：' + num1;
          // }//数据格式化
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 1,
          formatter: function (params) {
              var value = (params.value + '').split('.');
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
              return params.seriesName + '<br/>' + params.name + ': ' + value;
          }
        },
        toolBox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap:{
          // min: 0,
          // max: 100,
          // left: 'left',
          // top: 'bottom',
          // text: ['高', '低'],//取值范围的文字
          // inRange: {
          //     color: ['#e0ffff', '#006edd']//取值范围的颜色
          // },
          // show: true//图注
            left: 'left',
            min: 0,
            max: 150000,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            text: ['High', 'Low'],           // 文本，默认为数值文本
            calculable: true
        },
        geo: {
          map: 'china',
          roam: false,//不开启缩放和平移
          zoom: 1.23,//视角缩放比例
          label: {
              normal: {
                  show: true,
                  fontSize: '10',
                  color: 'rgba(0,0,0,0.7)'
              }
          },
          itemStyle: {
              normal: {
                  borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                  areaColor: '#F3B329',//鼠标选择区域颜色
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        },
        series: {
          name: '销量',
          type: 'map',
          geoIndex: 0,
          data: [
              // {"id": "320000","name": "江苏","value": "595"},
              // {"id": "340000","name": "安徽","value": "360"},
              // {"id": "330000","name": "浙江","value": "105"},
              // {"id": "310000","name": "上海","value": "750"},
              // {"id": "370000","name": "山东","value": "666"},
              // {"id": "320100","name": "南京市","value": "521"},
              // {"id": "320200","name": "无锡市","value": "230"},
              // {"id": "320300","name": "徐州市","value": "15"},
              // {"id": "320400","name": "常州市","value": "20"},
              // {"id": "320500","name": "苏州市","value": "325"},
              // {"id": "321000","name": "扬州市","value": "105"},
              // {"id": "321100","name": "镇江市","value": "311"},
              // {"id": "321200","name": "泰州市","value": "12"},
              // {"id": "320800","name": "淮安市","value": "6"},
              // {"id": "320600","name": "南通市","value": "5"},
              // {"id": "320900","name": "盐城市","value": "4"},
              // {"id": "320700","name": "连云港市","value": "8"},
              // {"id": "321300","name": "宿迁市","value": "11"},
              // {"name": "辽宁","value": "410"},
            {"name": "北京","value": ""},
            {"name": "天津","value": ""},
            {"name": "河北","value": ""},
            {"name": "山西","value": ""},
            {"name": "内蒙古","value": ""},
            {"name": "辽宁","value": ""},
            {"name": "吉林","value": ""},
            {"name": "黑龙江","value": ""},
            {"name": "上海","value": ""},
            {"name": "江苏","value": ""},
            {"name": "浙江","value": ""},
            {"name": "安徽","value": ""},
            {"name": "福建","value": ""},
            {"name": "江西","value": ""},
            {"name": "山东","value": ""},
            {"name": "河南","value": ""},
            {"name": "湖北","value": ""},
            {"name": "湖南","value": ""},
            {"name": "广东","value": ""},
            {"name": "广西","value": ""},
            {"name": "海南","value": ""},
            {"name": "重庆","value": ""},
            {"name": "四川","value": ""},
            {"name": "贵州","value": ""},
            {"name": "云南","value": ""},
            {"name": "西藏","value": ""},
            {"name": "陕西","value": ""},
            {"name": "甘肃","value": ""},
            {"name": "青海","value": ""},
            {"name": "宁夏","value": ""},
            {"name": "新疆","value": ""},
            {"name": "香港","value": ""},
            {"name": "澳门","value": ""},
            {"name": "台湾","value": ""},   
          ],
          roam: true,
        },


      }
    }
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

  methods: {
    //下拉框禁用逻辑
    selectByChange: function(ele){
      this.carBrand = "";
      this.carClass = "";
      this.carName = "";
      // console.log(ele);
      this.brandDisabled = ele == "class";
      this.classDisabled = ele == "brand";
      this.nameDisabled = ele != "name";
    },

    //选定年份更改
    selectYearChange: function(ele){
      //此时选定品牌
      if(this.selectBy == "brand" && this.carBrand != "")
      {
        if(this.selectYear == "0")
        {
          this.sales_mapChart.visualMap.min = "250000";
          this.sales_mapChart.visualMap.max = "600000";
        }
        else
        {
          this.sales_mapChart.visualMap.min = "50000";
          this.sales_mapChart.visualMap.max = "120000";
        }

        console.log("调用 API 来获取年份更改后的品牌的销量列表及增速并更新地图");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarBrandSaleRegion",{carBrand: this.carBrand, year: this.selectYear})
            .then((response) => {
              for(let i in response.data)
                this.sales_mapChart.series.data[i].value = response.data[i];
            });
      }
      //此时选定车型
      else if(this.selectBy == "class" && this.carClass != "")
      {
        if(this.selectYear == "0")
        {
          this.sales_mapChart.visualMap.min = "25000";
          this.sales_mapChart.visualMap.max = "60000";
        }
        else
        {
          this.sales_mapChart.visualMap.min = "5000";
          this.sales_mapChart.visualMap.max = "12000";
        }

        console.log("调用 API 来获取年份更改后的车型的销量列表及增速并更新地图");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarClassSaleRegion",{carClass: this.carClass, year: this.selectYear})
            .then((response) => {
              for(let i in response.data)
                this.sales_mapChart.series.data[i].value = response.data[i];
            });
      }
      //此时选定具体车
      else if(this.selectBy == "name" && this.carName != "")
      {
        if(this.selectYear == "0")
        {
          this.sales_mapChart.visualMap.min = "4000";
          this.sales_mapChart.visualMap.max = "30000";
        }
        else
        {
          this.sales_mapChart.visualMap.min = "800";
          this.sales_mapChart.visualMap.max = "6000";
        }
        if(this.selectYear == "0")
          this.sales_mapChart.visualMap.max = "120000";
        else
          this.sales_mapChart.visualMap.max = "50000";


        console.log("调用 API 来获取年份更改后的车辆名的销量列表及增速并更新地图");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarSaleRegion",{carName: this.carName, year: this.selectYear})
            .then((response) => {
              for(let i in response.data)
                this.sales_mapChart.series.data[i].value = response.data[i];
            });
      }
    },

    //品牌更改
    carBrandChange: function (ele) {
      if(this.selectBy == "brand")
      {
        if(this.selectYear == "0")
        {
          this.sales_mapChart.visualMap.min = "250000";
          this.sales_mapChart.visualMap.max = "600000";
        }
        else
        {
          this.sales_mapChart.visualMap.min = "50000";
          this.sales_mapChart.visualMap.max = "120000";
        }
        console.log("由对应年份调用 API 来获取品牌的销量列表并更新地图");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarBrandSaleRegion",{carBrand: this.carBrand, year: this.selectYear})
            .then((response) => {
              for(let i in response.data)
                this.sales_mapChart.series.data[i].value = response.data[i];
            });
      }
      else if(this.carClass != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/carNameCheck",{carBrand: this.carBrand, carClass: this.carClass})
            .then((response) => (this.carNames = response.data));
        // console.log(this.carNames);
      }
      // console.log(ele);
    },

    //车型更改
    carClassChange: function (ele) {
      if(this.selectBy == "class")
      {
        if(this.selectYear == "0")
        {
          this.sales_mapChart.visualMap.min = "75000";
          this.sales_mapChart.visualMap.max = "60000";
        }
        else
        {
          this.sales_mapChart.visualMap.min = "10000";
          this.sales_mapChart.visualMap.max = "25000";
        }

        console.log("由对应年份调用 API 来获取车型的销量列表并更新地图");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarClassSaleRegion",{carClass: this.carClass, year: this.selectYear})
            .then((response) => {
              for(let i in response.data)
                this.sales_mapChart.series.data[i].value = response.data[i];
            });
      }
      else if(this.carBrand != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/carNameCheck",{carBrand: this.carBrand, carClass: this.carClass})
          .then((response) => (this.carNames = response.data));
        console.log(this.carNames);
      }
      console.log(ele);
    },

    //车辆名更改
    carNameChange: function (ele) {
      if(this.selectBy == "name")
      {
        if(this.selectYear == "0")
        {
          this.sales_mapChart.visualMap.min = "4000";
          this.sales_mapChart.visualMap.max = "30000";
        }
        else
        {
          this.sales_mapChart.visualMap.min = "800";
          this.sales_mapChart.visualMap.max = "6000";
        }

        console.log("由对应年份调用 API 来获取车辆名的销量列表并更新地图");
        this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findCarSaleRegion",{carName: this.carName, year: this.selectYear})
            .then((response) => {
              for(let i in response.data)
                this.sales_mapChart.series.data[i].value = response.data[i];
            });
      }
      // console.log(ele);
    },

  },
};
</script>
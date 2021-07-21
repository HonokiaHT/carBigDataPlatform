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
              <md-select v-model="carClass"
                        id="carClass_id"
                        :disabled="classDisabled"
                        @md-selected="carClassChange">
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
                        :disabled="nameDisabled"
                        @md-selected="carNameChange">
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

var mapDataList = [{"id": "320000","name": "江苏","value": "95"},
    {"id": "340000","name": "安徽","value": "60"},
    {"id": "330000","name": "浙江","value": "105"},
    {"id": "310000","name": "上海","value": "75"},
    {"id": "370000","name": "山东","value": "50"},
    {"id": "320100","name": "南京市","value": "21"},
    {"id": "320200","name": "无锡市","value": "23"},
    {"id": "320300","name": "徐州市","value": "15"},
    {"id": "320400","name": "常州市","value": "20"},
    {"id": "320500","name": "苏州市","value": "25"},
    {"id": "321000","name": "扬州市","value": "15"},
    {"id": "321100","name": "镇江市","value": "11"},
    {"id": "321200","name": "泰州市","value": "12"},
    {"id": "320800","name": "淮安市","value": "6"},
    {"id": "320600","name": "南通市","value": "5"},
    {"id": "320900","name": "盐城市","value": "4"},
    {"id": "320700","name": "连云港市","value": "8"},
    {"id": "321300","name": "宿迁市","value": "11"},
    {"name": "辽宁","value": "110"},
    ];


export default {
  data() {
    return{
      selectBy:"brand",
      brandDisabled:false,
      classDisabled:true,
      nameDisabled:true,
      selectYear:"0",

      carBrand: "品牌1",
      carClass: "",
      carName: "",

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
            max: 200,
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
        series: [
          {
            name: '销量',
            type: 'map',
            geoIndex: 0,
            data: mapDataList,
            roam: true,
          }
        ]
      }
    }
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

    selectYearChange: function(ele){
      if(this.selectBy == "brand" && this.carBrand != "")
      {
        console.log("调用 API 来获取年份更改后的品牌的销量列表及增速并更新地图");
      }
      else if(this.selectBy == "class" && this.carClass != "")
      {
        console.log("调用 API 来获取年份更改后的车型的销量列表及增速并更新地图");
      }
      else if(this.selectBy == "name" && this.carName != "")
      {
        console.log("调用 API 来获取年份更改后的车辆名的销量列表及增速并更新地图");
      }
    },

    carBrandChange: function (ele) {
      if(this.selectBy == "brand")
      {
        console.log("由对应年份调用 API 来获取品牌的销量列表并更新地图");
      }
      else if(this.carClass != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
      }
      console.log(ele);
    },
    carClassChange: function (ele) {
      if(this.selectBy == "class")
      {
        console.log("由对应年份调用 API 来获取车型的销量列表并更新地图");
      }
      else if(this.carBrand != "")
      {
        console.log("调用 API 来获取车辆名列表并更新下拉框数据");
      }
      console.log(ele);
    },
    carNameChange: function (ele) {
      if(this.selectBy == "name")
      {
        console.log("由对应年份调用 API 来获取车辆名的销量列表并更新地图");
      }
      console.log(ele);
    },

  },
};
</script>
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

        <!-- 年份筛选部分 —— 对销售趋势图有意义吗？-->
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field style="width: 25%; float: right">
              <label for="selectYear_id">年份筛选</label>
              <md-select v-model="selectYear"
                        id="selectYear_id"
                        @md-selected="selectYearChange"
                        disabled>
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


        <ve-histogram :data="salesTrend_histogramChart.data"
                      :settings="salesTrend_histogramChart.settings"
                      theme="light">
        </ve-histogram>

      </div>
    </div>
  </div>
</template>

<script>

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

      salesTrend_histogramChart:{
        data:{
          columns: ['年份', '销售量', '增长率'],
          rows: [
            { '年份': '2017', '销售量': 1393, '增长率': 0.32 },
            { '年份': '2018', '销售量': 3530, '增长率': 0.26 },
            { '年份': '2019', '销售量': 2923, '增长率': 0.76 },
            { '年份': '2020', '销售量': 1723, '增长率': 0.49 },
            { '年份': '2021', '销售量': 3792, '增长率': 0.323 },
          ]
        },
        settings:{
          showLine:["增长率"],
          yAxisType:["","percent"],
          yAxisName: ["销售量", "增长率"],
          axisSite:{right:["增长率"]}
        }
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
        console.log("调用 API 来获取年份更改后的品牌的销量列表及增速并更新页面信息");
      }
      else if(this.selectBy == "class" && this.carClass != "")
      {
        console.log("调用 API 来获取年份更改后的车型的销量列表及增速并更新页面信息");
      }
      else if(this.selectBy == "name" && this.carName != "")
      {
        console.log("调用 API 来获取年份更改后的车辆名的销量列表及增速并更新页面信息");
      }
    },

    carBrandChange: function (ele) {
      if(this.selectBy == "brand")
      {
        console.log("由对应年份调用 API 来获取品牌的销量列表及增速并更新页面信息");
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
        console.log("由对应年份调用 API 来获取车型的销量列表及增速并更新页面信息");
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
        console.log("由对应年份调用 API 来获取车辆名的销量列表并更新页面信息");
      }
      console.log(ele);
    },

  },
};
</script>

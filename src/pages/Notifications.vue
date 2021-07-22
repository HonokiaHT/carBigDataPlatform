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

          <!-- <div class="md-layout-item">
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
          </div> -->
        </div>

        <ve-line
          :data="carContrast_linePieChart.data"
          :tooltip="carContrast_linePieChart.toolTip"
          :dataset="carContrast_linePieChart.dataset"
          :xAxis="carContrast_linePieChart.xAxis"
          :yAxis="carContrast_linePieChart.yAxis"
          :grid="carContrast_linePieChart.grid"

        >
        </ve-line>



      </div>
    </div>
  </div>
</template>

<script>
export default {
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



  methods: {
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

    // //车辆名更新
    // carNameChange: function (ele) {
    //   if(this.carName != "")
    //   {
      

    //     console.log("调用 API 来获取车辆名对应的搜索次数以及广告投放并更新页面信息");
    //     this.$axios.post("https://qcqn74.fn.thelarkcloud.com/findAD",{carName: this.carName})
    //       .then((response) => {
    //         console.log(response.data);
    //         //先清空
    //         this.searches_lineChart.markPoint.data = [];
    //         for(let i in this.searches_lineChart.data.rows)
    //         {
    //           this.searches_lineChart.data.rows[i].搜索次数 = "";
    //         }

    //         //再赋值s
    //         for(let i in response.data.month_index)
    //         {
    //           this.searches_lineChart.data.rows[i].搜索次数 = response.data.month_index[i];
    //           if(response.data.ad_data_cost[i] != 0)
    //           {
    //             this.searches_lineChart.markPoint.data.push({
    //               coord: [this.searches_lineChart.data.rows[i].日期, this.searches_lineChart.data.rows[i].搜索次数],
    //               value: response.data.ad_data_cost[i],
    //             })
    //           }
    //         }
    //       });

    //   }
    //   console.log(ele);
    // },
  }
};
</script>

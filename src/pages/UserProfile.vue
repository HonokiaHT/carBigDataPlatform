<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30">
        <!-- 车辆筛选部分 -->
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label for="Age_id">年龄段</label>
              <md-select v-model="minAge" id="Age_id" @md-selected="ageChange">
                <md-option key="1" value="20">20岁~24岁</md-option>
                <md-option key="2" value="25">25岁~29岁</md-option>
                <md-option key="3" value="30">30岁~34岁</md-option>
                <md-option key="4" value="35">35岁~39岁</md-option>
                <md-option key="5" value="40">40岁~44岁</md-option>
                <md-option key="6" value="45">45岁~49岁</md-option>
                <md-option key="7" value="50">50岁~54岁</md-option>
                <md-option key="8" value="55">55岁~59岁</md-option>
                <md-option key="9" value="60">60岁~64岁</md-option>
                <md-option key="10" value="65">65岁~70岁</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>
      <!-- <ve-line
          :data="sales_line_chart.data"
          :title="sales_line_chart.title"
      ></ve-line>-->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <ve-bar :data="sales_line_chart.data" :title="sales_line_chart.title"></ve-bar>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>-->
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";

export default {
  // components: {
  //   EditProfileForm,
  //   UserCard,
  // },
  data() {
    return {
      minAge: "",
      sales_line_chart: {
        // el:"#vLine",
        data: {
          columns: ["排名", "销售额"],
          rows: [
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" },
            { 排名: "", 销售额: "", 车名: "" }
          ]
        },
        title: {
          text: "用户偏好"
        }
      }
    };
  },
  methods: {
    //年龄段选定
    ageChange: function(ele) {
      this.$axios
        .post("https://qcqn74.fn.thelarkcloud.com/SaleinAge_Descending", {
          minAge: this.minAge
        })
        .then(response => {
          for (let i = 0; i < 10; i++) {
            this.sales_line_chart.data.rows[9 - i].排名 =
              response.data.carName[i].car_name;
          }
          for (let i = 0; i < 10; i++) {
            this.sales_line_chart.data.rows[9 - i].销售额 =
              response.data.carSale[i].columnForSort;
          }
        });
      // console.log(this.sales_line_chart.data.rows[2]);
    }
  }
};
</script>
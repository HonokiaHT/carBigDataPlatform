<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-80">
        <!-- 车辆筛选部分 -->
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label for="carBrand_id">厂商</label>
              <md-select v-model="carBrand" id="carBrand_id">
                <md-option
                  v-for="singleCarBrand in carBrands"
                  :key="singleCarBrand.id"
                  :value="singleCarBrand.name"
                >
                  {{ singleCarBrand.name }}
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
                  {{ singleCarClass.name }}
                </md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label for="carName_id">车名</label>
              <md-select v-model="carName" id="carName_id" @click="brandChange">
                <md-option
                  v-for="singleCarName in carNames"
                  :key="singleCarName.id"
                  :value="singleCarName.name"
                >
                  {{ singleCarName.name }}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>
      <!-- <ve-line
          :data="sales_line_chart.data"
          :title="sales_line_chart.title"
        ></ve-line> -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <ve-bar :data="sales_line_chart.data" :title="sales_line_chart.title">
        </ve-bar>
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div> -->
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
      sales_line_chart: {
        // el:"#vLine",

        data: {
          // dataOrder: false,
          // dataOrder: {
          //   label: "销售额",
          //   order: "desc",
          // },
          columns: ["排名", "销售额"],
          rows: [
            { 排名: "NO.10", 销售额: 134, 车名: "桑塔纳" },
            { 排名: "NO.9", 销售额: 265, 车名: "保时捷" },
            { 排名: "NO.8", 销售额: 351 },
            { 排名: "NO.7", 销售额: 423 },
            { 排名: "NO.6", 销售额: 513 },
            { 排名: "NO.5", 销售额: 621 },
            { 排名: "NO.4", 销售额: 756 },
            { 排名: "NO.3", 销售额: 875 },
            { 排名: "NO.2", 销售额: 987 },
            { 排名: "NO.1", 销售额: 1234 },
          ],
        },
        // options:{
        //   name: "ok",
        // },

        title: {
          text: "用户偏好",
        },
      },
    };
  },
};
</script>

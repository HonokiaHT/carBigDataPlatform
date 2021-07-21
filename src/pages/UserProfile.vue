<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-80">
        <!-- <ve-line
          :data="sales_line_chart.data"
          :title="sales_line_chart.title"
        ></ve-line> -->
        <ve-bar :data="sales_line_chart.data"
                :title="sales_line_chart.title"
                theme="light">
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
            { 排名: "NO.10", 销售额: 134 },
            { 排名: "NO.9", 销售额: 265 },
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

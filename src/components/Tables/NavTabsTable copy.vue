<template>
  <div>
            <!-- slot-scope="{ item }" -->
    <md-table v-model="users" @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"

        md-selectable="multiple"
        md-auto-select
      >
        <!-- <md-table-cell>{{ item.name }}</md-table-cell> -->
        <md-table-cell>
          <!-- <md-button class="md-just-icon md-simple md-primary">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Close</md-tooltip>
          </md-button> -->
            <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
            >
            <ve-ring :data="buyPurpose_ringChart.data"
              :title="buyPurpose_ringChart.title" 
              :settings="buyPurpose_ringChart.settings"
              :legend="buyPurpose_ringChart.legend"
              >
            </ve-ring>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>


import VeRing from "v-charts/lib/ring.common";


export default {
  name: "nav-tabs-table",
  data() {
    return {
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


      selected: [],
      users: [
        {
          name: 'Sign contract for "What are conference organizers afraid of?"'
        },
        {
          name: "Lines From Great Russian Literature? Or E-mails From My Boss?"
        },
        {
          name:
            "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
        }
      ]
    };
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    }
  }
};
</script>

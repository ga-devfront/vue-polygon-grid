<template>
  <div class="container">
    <h1>
      JE SUIS VUE POLYGON GRID
    </h1>
    <VuePolygonGrid
        :tree="myGrid"
        :size="200"
        background="#000fff"
        color="rgb(15, 150, 0)"
        :border-size="2"
        border-color="#000000"
        @hovered="printInfo"
        @clicked="printInfo"
        v-slot="slotProps"
    >
      {{ slotProps.infos.metas.icon }}
    </VuePolygonGrid>
    <div>
      {{ infos }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import VuePolygonGrid from '@/components/VuePolygonGrid.vue';

export default {
  name: 'App',
  components: {
    VuePolygonGrid,
  },
  setup() {
    const myGrid = {
      name: 'Javascript',
      metas: {
        description: 'Im the js description',
        mastery: 'god',
        icon: 'mdi-js',
      },
      children: [
        {
          name: 'Jquery',
          metas: {
            description: 'Im the jq description',
            mastery: 'noob',
            icon: 'mdi-jq',
          },
          background: '#010101',
          color: '#ffffff',
          children: [
            {
              name: '2nd Recursivity',
              metas: {
                description: 'Im the second recursivity',
                mastery: 'noob',
                icon: 'mdi-2nd',
              },
              background: 'center / cover no-repeat url("https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg")',
              children: [
                {
                  name: '3nd Recursivity',
                  metas: {
                    description: 'Im the 3nd recursivity',
                    mastery: 'noob',
                    icon: 'mdi-3nd',
                  },
                  background: '#4c8934',
                },
              ],
            },
          ],
        },
        {
          name: 'VueJs',
          metas: {
            description: 'Im the vue description',
            mastery: 'master',
            icon: 'mdi-vue',
          },
          background: '#3980d0',
        },
        {
          name: 'ES6',
          metas: {
            description: 'Im the es6 description',
            mastery: 'average',
            icon: 'mdi-es6',
          },
          background: '#897e34',
        },
        {
          name: 'VueJs',
          metas: {
            description: 'Im the vue description',
            mastery: 'master',
            icon: 'mdi-vue',
          },
          background: '#940ec0',
        },
      ],
    }
    const infos = ref({})

    const printInfo = (datas) => {
      infos.value = datas
    }
    return {
      myGrid,
      printInfo,
      infos,
    }
  },
};
</script>

<style>
.container {
  background: #f0f056;
}
</style>

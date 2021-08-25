<template>
  <h1>
    JE SUIS VUE POLYGON GRID
  </h1>
  <VuePolygonGrid
      :datas="myGrid"
      :size="200"
      :border="{ width: 2, color: '#138D75' }"
      :hovered="false"
      :clicked="true"
      @hovered="printInfo"
      @clicked="printInfo"
      v-slot="slotProps"
  >
    {{ slotProps.infos.metas.icon }}
  </VuePolygonGrid>
  <div>
    {{ infos }}
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
          children: [
            {
              name: '2nd Recursivity',
              metas: {
                description: 'Im the second recursivity',
                mastery: 'noob',
                icon: 'mdi-2nd',
              },
              children: [
                {
                  name: '3nd Recursivity',
                  metas: {
                    description: 'Im the 3nd recursivity',
                    mastery: 'noob',
                    icon: 'mdi-3nd',
                  },
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
        },
        {
          name: 'ES6',
          metas: {
            description: 'Im the es6 description',
            mastery: 'average',
            icon: 'mdi-es6',
          },
        },
        {
          name: 'VueJs',
          metas: {
            description: 'Im the vue description',
            mastery: 'master',
            icon: 'mdi-vue',
          },
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

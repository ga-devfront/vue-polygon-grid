<template>
  <div :style="customSize" class="grid-container">
    <div class="line" v-for="(line, index) in polygonGrid.grid" :key="'line_' + index">
      <div class="column" v-for="(column, index) in line" :key="'column_' + index">
        <div class="polygon" v-if="typeof column === 'object' && column.name" @click="emitInfos('clicked', column)" @mouseover="emitInfos('hovered', column)">
          <svg class="polygon-border" viewBox="0 0 100 87.5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <polygon id="polygon" points="25 0, 75 0, 100 43.75, 75 87.5, 25 87.5, 0 43.75" fill="none" shape-rendering="geometricPrecision"/>
              <clipPath id="insidePolygon">
                <use xlink:href="#polygon"/>
              </clipPath>
            </defs>
            <use
            xlink:href="#polygon"
            clip-path="url(#insidePolygon)"
            />
          </svg>
          <div class="content">
            <slot v-bind:infos="column">
              {{ column.name }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import PolygonGrid from '@/utility/PolygonGrid'

export default {
  name: 'VuePolygonGrid',
  props: {
    datas: {
      required: true,
      type: Object,
    },
    size: {
      required: false,
      type: Number,
      default() {
        return 150
      },
    },
    clicked: {
      required: false,
      type: Boolean,
      default() {
        return false
      },
    },
    hovered: {
      required: false,
      type: Boolean,
      default() {
        return false
      },
    },
    border: {
      required: false,
      type: [Number, Object],
      default() {
        return { width: 3, color: '#000000' }
      },
    },
  },
  setup(props, context) {
    const polygonGrid = new PolygonGrid(props.datas)
    const ratio = 0.875
    const customSize = computed(() => {
      const sizeNumber = props.size
      let borderWidthNumber = 3
      let borderColor = '#000000'
      if (typeof props.border === 'object') {
        if (props.border.width) {
          borderWidthNumber = props.border.width * 2
        }
        if (props.border.color) {
          borderColor = props.border.color
        }
      }
      if (typeof props.border === 'number') {
        borderWidthNumber = props.border * 2
      }
      return {
        '--padding-container': `${(sizeNumber * ratio) / 4}px`,
        '--column-width': `${(sizeNumber / 1.33) - borderWidthNumber}px`,
        '--column-height': `${((sizeNumber * ratio) / 2) - (borderWidthNumber / 2)}px`,
        '--polygon-width': `${sizeNumber}px`,
        '--polygon-height': `${sizeNumber * ratio}px`,
        '--polygon-border-width': `${borderWidthNumber}px`,
        '--polygon-border-color': `${borderColor}`,
      }
    })

    const formatPolygonInfos = (polygon) => ({
      name: polygon.name,
      metas: polygon.metas,
    })

    const emitInfos = (type, polygon) => {
      if (props[type]) {
        context.emit(type, formatPolygonInfos(polygon))
      }
    }

    return {
      polygonGrid,
      customSize,
      emitInfos,
    }
  },
};
</script>

<style lang="scss">
$polygonSize: 150px;
$ratio: 0.875;

.grid-container {
  padding: var(--padding-container) 0;
  .line {
    display: flex;
    justify-content: center;
    .column {
      position: relative;
      min-width: var(--column-width);
      width: var(--column-width);
      height: var(--column-height);
    }
    .polygon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: var(--polygon-width);
      width: var(--polygon-width);
      max-height: var(--polygon-height);
      height: var(--polygon-height);
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      .polygon-border {
        width: var(--polygon-width);
        height: var(--polygon-height);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        stroke-width: var(--polygon-border-width);
        stroke: var(--polygon-border-color);
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        position: absolute;
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        color: #0B5345;
      }
    }
  }
}
</style>

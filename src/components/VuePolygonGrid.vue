<template>
  <div :style="customSize" class="grid-container">
    <div class="line" v-for="(line, index) in polygonGrid.grid" :key="'line_' + index">
      <div class="column" v-for="(column, index) in line" :key="'column_' + index">
        <div class="polygon" v-if="typeof column === 'object' && column.name" @click="emitInfos('clicked', column)" @mouseover="emitInfos('hovered', column)">
          <svg class="polygon-border" viewBox="0 0 100 87.5" xmlns="http://www.w3.org/2000/svg" :style="{ background: column.background }">
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
          <div class="content" :style="{ color: column.color }">
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
    tree: {
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
    background: {
      required: false,
      type: String,
      default() {
        return null
      },
    },
    color: {
      required: false,
      type: String,
      default() {
        return '#000000'
      },
    },
    borderSize: {
      required: false,
      type: Number,
      default() {
        return 0
      },
    },
    borderColor: {
      required: false,
      type: String,
      default() {
        return '#000000'
      },
    },
  },
  setup(props, context) {
    const polygonGrid = new PolygonGrid(props.tree)
    const ratio = 0.875
    const customSize = computed(() => {
      const sizeNumber = props.size
      let color = '#000000'
      let background = null
      let borderWidthNumber = 0
      let borderColor = '#000000'
      if (props.background && typeof props.background === 'string') {
        background = props.background
      }
      if (props.color && typeof props.color === 'string') {
        color = props.color
      }
      if (props.borderSize && typeof props.borderSize === 'number') {
        borderWidthNumber = props.borderSize * 2
      }
      if (props.borderColor && typeof props.borderColor === 'string') {
        borderColor = props.borderColor
      }
      return {
        '--padding-container': `${(sizeNumber * ratio) / 4}px`,
        '--column-width': `${(sizeNumber / 1.33) - borderWidthNumber}px`,
        '--column-height': `${((sizeNumber * ratio) / 2) - (borderWidthNumber / 2)}px`,
        '--polygon-width': `${sizeNumber}px`,
        '--polygon-height': `${sizeNumber * ratio}px`,
        '--polygon-border-width': `${borderWidthNumber}px`,
        '--polygon-border-color': `${borderColor}`,
        '--polygon-color': `${color}`,
        '--polygon-background': `${background}`,
      }
    })

    const formatPolygonInfos = (polygon) => {
      const children = []
      polygon.children.forEach((child) => {
        children.push({
          name: child.name,
          metas: child.metas,
        })
      })

      const parent = {}

      if (polygon.parent) {
        parent.name = polygon.parent.name
        parent.metas = polygon.parent.metas
      }

      return {
        name: polygon.name,
        metas: polygon.metas,
        children,
        parent,
      }
    }

    const emitInfos = (type, polygon) => {
      context.emit(type, formatPolygonInfos(polygon))
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
        background: var(--polygon-background);
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
        color: var(--polygon-color);
      }
    }
  }
}
</style>

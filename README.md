# vue-polygon-grid
___
*badges*   
**Interactive polygon structure for Vue.js**
___
**[Online demo]() • [Key features](#key-features) • [Future implementations](#future-implementations) • [How to use](#how-to-use)**  
*preview*

## Key features

- Displaying a JSON list as a polygon grid
- Full polygon customization
- Management of click and hover events
- Parent / child behavior management

## Future implementations

- management of multiple JSON in an array
- responsive management

## Compatibility
Here you will find the table of compatible browsers.

| <img src="http://assets.stickpng.com/images/588525cd6f293bbfae451a37.png" width="50"/> <br> Chrome | <img src="https://upload.wikimedia.org/wikipedia/commons/6/66/Firefox_logo.png" width="50"/> <br> Firefox | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/1200px-Safari_browser_logo.svg.png" width="50"/> <br> Safari | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/1200px-Opera_2015_icon.svg.png" width="50"/> <br> Opera | <img src="https://upload.wikimedia.org/wikipedia/fr/2/20/Logo_Microsoft_Edge.png" width="50"/> <br> Edge |
|---|---|---|---|---|
| latest ✔ | latest ✔ | latest ✔ | latest ✔ | latest ✔ |

## How to use
### Requirement
- Vue.js 3.0 or more

### Installation
With NPM:   
```npm i mon-package```

With Yarn:   
```yarn add mon-package```

### Establishment
#### Global import
```js
// mains.js
import { createApp } from 'vue';
import App from './App.vue';

import VuePolygonGrid from 'vuepolygongrid'

const app = createApp(App)

app.component('VuePolygonGrid', VuePolygonGrid)

app.mount('#app');
```
#### Individual import
```vue
// component.vue
<script>
import VuePolygonGrid from 'vuepolygongrid';

export default {
  components: {
    VuePolygonGrid
  }
}
</script>
```

### Basic usage
```vue
<template>
  <VuePolygonGrid :tree="myTree"></VuePolygonGrid>
</template>

<script>
import myTree from '~/tree.json'

export default {
  setup() {
    
    return {
      myTree
    }
  }
}
</script>
```

### Advanced usage

#### Example
```vue
<template>
  <VuePolygonGrid
      :tree="myGrid"
      :size="200"
      :background="globalBackground"
      color="rgb(15, 150, 0)"
      :border-size="2"
      border-color="#138D75"
      @hovered="hoverMethod"
      @clicked="clickMethod"
      v-slot="slotProps"
  >
    {{ slotProps.infos.metas.icon }}
  </VuePolygonGrid>
</template>

<script>
import myImage from '../assets/images/myImage.jpg'

export default {
  setup() {
    
    const myGrid = {
      name: 'parent-grid',
      metas: {
        icon: 'mdi-js',
      },
      background: 'content-box radial-gradient(crimson, skyblue)',
      children: [
        {
          name: 'first-child-polygon',
          metas: {
            icon: 'mdi-vue',
          },
          color: 'rgba(25, 150, 10, 0.5)'
        },
        {
          name: 'second-child-polygon',
          metas: {
            icon: 'mdi-es6',
          },
        },
      ],
      order: {
        0: 'top',
        1: 'bottomRight',
        2: 'bottomLeft',
        3: 'bottom',
        4: 'topLeft',
        5: 'topRight',
      },
    }

    const globalBackground = `center / cover no-repeat url('${myImage}')`
    
    const hoverMethod = (infos) => {
      // your script
    }

    const clickMethod = (infos) => {
      // your script
    }
    
    return {
      myGrid,
      globalBackground,
      hoverMethod,
      clickMethod,
    }
  }
}
</script>
```

#### props details
|Name|Type|Default|Description|
|---|---|---|---|
|`:tree`*|Object|`null`|The tree is the structure that will allow the polygonal grid to build.<br>More information on the [tree details](#tree-details).|
|`:size`|Number|`150`| Size is used to define the width (in `px`) of the polygons|
|`:color`|String|`'#000000'`| Define the global color of your polygons. All CSS color modes are accepted (string, HEX, and RGB)<br>**Be careful, this color can be overwritten when passing through the tree**|
|`:background`|String|`null`| Allows you to use a global background. All CSS background are accepted (gradiant, color, image) with these parameters.<br>**Be careful, this background can be overwritten when passing through the tree**|
|`:border-size`|Number|`0`|Allows you to set the size (in `px`) and color of the border.<br>If you don't want one, let it blank.|
|`:border-color`|String|`'#000000'`| Allows you to define a particular color for your borders. All CSS color modes are accepted (string, HEX, and RGB)|

*`*` denotes required props*

#### emit details
At all emit an object is returned to you. However, it will only include the following information:
```js
{
  name: 'polygons name',
  metas: {
    // polygon's meta
  },
  children: [
    {
      name: 'childs name',
      metas: {
        // child's metas
      }
    }
  ],
  parent: {
    name: 'parents name',
    metas: {
      // parent's metas
    }
  }
}
```

|Name|Description|
|---|---|
|`@clicked`|Send polygon when clicked|
|`@hovered`|Send polygon when hovered|

#### slot details
With the slot you can customize the content of your polygons. Basic behavior displays the name of it

To do this add `v-slot="slotProps"` to your component :
```vue
<VuePolygonGrid :tree="myGrid" v-slot="slotProps" > </VuePolygonGrid>
```

you can now find the information of your polygon with `slotProps.infos`.
You will have access to all the information that you have passed to it in your tree.
Here is an example of what can be possible, the only limit is your imagination !
```vue
<VuePolygonGrid :tree="myGrid" v-slot="slotProps" >
  <div :class="slotProps.infos.metas.class">
    {{ slotProps.infos.name }}
  </div>
</VuePolygonGrid>
```

#### tree details
The structure of your tree must fill a very precise diagram, if the structure is not respected an error will be displayed.

The tree must be a javascript Object (or JSON) and can be composed of the following information:

|Name|Type|Default|Description|
|---|---|---|---|
|`name`*|String| |The name of your polygon.|
|`metas`|Object|`null`| The meta part is an object that can store all the additional information you want to use during emits or in the slot|
|`color`|String|`null`| Define the color of your polygons. All CSS color modes are accepted (string, HEX, and RGB)<br>**Be careful, this color overwritten global color**|
|`background`|String|`null`| Allows you to use specific polygon background. All CSS background are accepted (gradiant, color, image) with these parameters.<br>**Be careful, this background overwritten global background**|
|`children`|Array|`[]`| Is an array that will allow you to add the child elements of your polygon, they can be 6 at most and must have the same structure.<br>**Be careful if the number of children exceed the possible number of places the grid cannot be created.**|
|`order`|Object|`{ 0: 'topRight', 1: 'bottomRight', 2: 'bottom', 3: 'bottomLeft', 4: 'topLeft', 5: 'top', }`| Allows you to define the order in which the children of your polygon will be added. Be careful if you decide to rewrite it, each element must be positioned (no duplication possible).|

*`*` denotes required fields*

## How it works

For the sake of optimization the code is not commented. We invite you to watch the project's [wiki](/wiki) pages which detail how each file works.

## Contribution

* **Guyomar Alexis** - [ga-devfront](https://github.com/ga-devfront) : lead developer of project.
* **Daniels-Roth Stan** - [mrstandu33](https://github.com/mrstandu33) : consultant and reviewer.

See also the list of [contributors]() who participated
in this project.

Want to contribute to the project ? First read your document on how to [contribute effectively](CONTRIBUTING.md).

## Reporting bug

Do you have a problem with our package? Send it back to us to improve the project using this ticket.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

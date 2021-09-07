export default class Polygon {
  constructor(params) {
    this.name = params.name
    this.metas = params.metas || null
    this.color = params.color || null
    this.background = params.background || null
    this.children = params.children || []
    this.parent = null
    this.placed = false
    this.order = params.order || {
      0: 'topRight',
      1: 'bottomRight',
      2: 'bottom',
      3: 'bottomLeft',
      4: 'topLeft',
      5: 'top',
    }
    this.paramsValidator(params)
  }

  paramsValidator(datas) {
    let isValid = true

    if (typeof datas === 'object' && !Array.isArray(datas)) {
      isValid = isValid && this.fieldNamingValidator(datas)
      isValid = isValid && this.nameValidator(datas)
      isValid = isValid && this.orderValidator(datas)

      if (datas.children && datas.children.length > 0) {
        datas.children.forEach((child) => {
          isValid = isValid && this.paramsValidator(child)
        })
      }
    } else {
      isValid = false
      throw new Error('The datas structure is not correct. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#structure-is-not-correct')
    }

    return isValid
  }

  fieldNamingValidator(datas) {
    let isValid = true

    const validProperty = [
      'name',
      'metas',
      'background',
      'color',
      'children',
      'order',
    ]

    Object.keys(datas).forEach((property) => {
      isValid = isValid && validProperty.includes(property)
    })

    if (!isValid) {
      throw new Error('Polygons fields are not correct. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#fields-are-not-correct')
    }

    return isValid
  }

  nameValidator(datas) {
    if (!(datas.name && !(new RegExp(/^ *$/).test(datas.name)))) {
      throw new Error('Polygons name is not valid. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#name-is-not-valid')
    }

    return datas.name && !(new RegExp(/^ *$/).test(datas.name))
  }

  orderValidator(datas) {
    let isValid = true

    if (datas.order) {
      if (typeof datas.order === 'object' && !Array.isArray(datas.order)) {
        const validOrder = {
          top: false,
          topRight: false,
          topLeft: false,
          bottom: false,
          bottomRight: false,
          bottomLeft: false,
        }
        Object.keys(datas.order).forEach((property) => {
          if (validOrder[datas.order[property]] !== undefined) {
            validOrder[datas.order[property]] = true
          } else {
            throw new Error('Wrong position name. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#wrong-position-name')
          }
        })

        isValid = isValid && !Object.values(validOrder).includes(false)
        if (!isValid) {
          throw new Error('Polygon miss order position. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#miss-order-position')
        }
      } else {
        isValid = false
        throw new Error('Polygons order have wrong format. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#order-have-wrong-format')
      }
    }

    return isValid
  }

  setParent(parent) {
    this.parent = parent
  }

  isPlaced() {
    this.placed = true
  }
}

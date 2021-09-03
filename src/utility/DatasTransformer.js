import Polygon from '@/utility/PolygonClass'

export default class DatasTransformer {
  constructor(datas) {
    this.datas = datas
    this.transformedDatas = null
    this.grid = null
    this.neighboursPosition = {
      topLeft: [-1, -1],
      top: [0, -2],
      topRight: [1, -1],
      bottomLeft: [-1, 1],
      bottom: [0, 2],
      bottomRight: [1, 1],
    }
    this.updatePolygonDatas()
  }

  hasValidChildren = (polygon) => polygon.children && Array.isArray(polygon.children) && polygon.children.length > 0

  isPolygonClass = (polygon) => polygon instanceof Polygon

  updateDatas(datas) {
    this.datas = datas
    this.updatePolygonDatas()
  }

  updatePolygonDatas() {
    if (this.getDatasValidity()) {
      if (this.transformedDatas instanceof Polygon) {
        this.clearTransformedDatas()
      }

      this.initTransformedDatas()
    }
  }

  getDatasValidity() {
    return this.datasValidator(this.datas)
  }

  datasValidator(datas) {
    let isValid = true

    const validProperty = [
      'name',
      'metas',
      'background',
      'color',
      'children',
      'order',
    ]

    if (typeof datas === 'object') {
      Object.keys(datas).forEach((property) => {
        isValid = isValid && validProperty.includes(property)
      })
      isValid = isValid && !!datas.name

      if (datas.children && datas.children.length > 0) {
        datas.children.forEach((child) => {
          isValid = isValid && this.datasValidator(child)
        })
      }
    } else {
      isValid = false
    }

    if (!isValid) {
      throw new Error('The datas structure is not correct !')
    }
    return isValid
  }

  clearTransformedDatas() {
    this.transformedDatas = null
  }

  initTransformedDatas() {
    this.transformedDatas = this.datas

    this.transformedDatas = this.transformDataToPolygon(this.transformedDatas)
  }

  transformDataToPolygon(polygon, parentPolygon) {
    let currentPolygon = polygon

    if (!this.isPolygonClass(currentPolygon)) {
      currentPolygon = new Polygon(polygon)
    }

    if (parentPolygon
      && this.isPolygonClass(parentPolygon)
      && this.isPolygonClass(currentPolygon)) {
      currentPolygon.setParent(parentPolygon)
    }

    if (this.hasValidChildren(currentPolygon)) {
      currentPolygon.children.forEach((child, index) => {
        currentPolygon.children[index] = this.transformDataToPolygon(child, currentPolygon)
      })
    }

    return currentPolygon
  }
}

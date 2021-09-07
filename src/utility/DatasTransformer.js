import Polygon from './PolygonClass'

export default class DatasTransformer {
  constructor(datas) {
    this.datas = datas
    this.transformedDatas = null
    this.updatePolygonDatas()
  }

  hasValidChildren = (polygon) => polygon.children && Array.isArray(polygon.children) && polygon.children.length > 0

  isPolygonClass = (polygon) => polygon instanceof Polygon

  updateDatas(datas) {
    this.datas = datas
    this.updatePolygonDatas()
  }

  updatePolygonDatas() {
    if (this.transformedDatas instanceof Polygon) {
      this.clearTransformedDatas()
    }

    this.initTransformedDatas()
  }

  clearTransformedDatas() {
    this.transformedDatas = null
  }

  initTransformedDatas() {
    this.transformedDatas = {...this.datas}

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

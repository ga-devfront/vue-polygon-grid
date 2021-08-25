export default class Polygon {
  constructor(params) {
    this.name = params.name
    this.metas = params.metas || null
    this.children = params.children || []
    this.parent = params.parent || null
    this.placed = false
    this.order = params.order || {
      0: 'topRight',
      1: 'bottomRight',
      2: 'bottom',
      3: 'bottomLeft',
      4: 'topLeft',
      5: 'top',
    }
  }

  setParent(parent) {
    this.parent = parent
  }

  isPlaced() {
    this.placed = true
  }
}

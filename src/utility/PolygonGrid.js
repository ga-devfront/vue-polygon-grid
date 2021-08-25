import Polygon from '@/utility/PolygonClass'
import DatasTransformer from '@/utility/DatasTransformer'

export default class PolygonGrid {
  constructor(datas) {
    this.transformedDatas = new DatasTransformer(datas).transformedDatas
    this.grid = null
    this.neighboursPosition = {
      topLeft: [-1, -1],
      top: [0, -2],
      topRight: [1, -1],
      bottomLeft: [-1, 1],
      bottom: [0, 2],
      bottomRight: [1, 1],
    }
    this.updateGrid()
  }

  hasValidChildren(polygon) {
    if (polygon.children && Array.isArray(polygon.children) && polygon.children.length > 0) {
      let valid = true
      polygon.children.forEach((child) => {
        valid = valid && this.isPolygonClass(child)
      })
      if (valid === true) {
        valid = polygon.children.some((child) => !child.placed)
      }
      return valid
    }
    return false
  }

  isPolygonClass = (polygon) => polygon instanceof Polygon

  updateGrid() {
    if (!this.getTransformedDatasValidity()) {
      throw new Error('the data has not been initialized correctly')
    }

    if (this.grid && this.grid.length > 0) {
      this.clearGrid()
    }

    this.initGrid()
  }

  getTransformedDatasValidity() {
    return this.transformedDatas && typeof this.transformedDatas === 'object' && this.isPolygonClass(this.transformedDatas)
  }

  clearGrid() {
    this.grid = null
  }

  initGrid() {
    this.grid = [
      [
        this.transformedDatas,
      ],
    ]

    this.browseGrid()
  }

  getNumberOfColumn() {
    return this.grid[0].length
  }

  getNumberOfLine() {
    return this.grid.length
  }

  browseGrid() {
    const freezeNumberOfLine = Number(JSON.stringify(this.getNumberOfLine()))
    const freezeNumberOfColumn = Number(JSON.stringify(this.getNumberOfColumn()))
    for (let y = 0; y < freezeNumberOfLine; y += 1) {
      for (let x = 0; x < freezeNumberOfColumn; x += 1) {
        const caseElement = this.checkPositionInGrind(x, y)
        if (this.isPolygonClass(caseElement) && this.hasValidChildren(caseElement)) {
          this.addChildrenToGrid({ x, y }, caseElement)
        }
      }
    }
  }

  addChildrenToGrid(parentPosition, parentDatas) {
    const { order } = parentDatas
    parentDatas.children.forEach((child, index) => {
      const possiblePositionsAbsolute = this.getPossiblePositionsAbsolute(order, index)
      this.addChildToGrid(possiblePositionsAbsolute, child, parentPosition)
    })
    this.browseGrid()
  }

  getPossiblePositionsAbsolute(order, index) {
    const arrayOfPositions = []
    for (let i = 0; i < 6; i += 1) {
      arrayOfPositions.push(this.neighboursPosition[order[i]])
    }
    return arrayOfPositions.slice(index)
  }

  // eslint-disable-next-line class-methods-use-this
  getPossiblePositionsRelative(absolutePostions, parentPosition) {
    const possiblePositions = []

    absolutePostions.forEach((position) => {
      possiblePositions.push([(parentPosition.x + position[0]), (parentPosition.y + position[1])])
    })

    return possiblePositions
  }

  addChildToGrid(positionsInOrder, child, parentPosition) {
    const newParentPosition = parentPosition
    let possiblePositions = this.getPossiblePositionsRelative(positionsInOrder, newParentPosition)
    for (let i = 0; i < possiblePositions.length; i += 1) {
      const currentPossiblePosition = possiblePositions[i]
      const positionValue = this.checkPositionInGrind(currentPossiblePosition[0], currentPossiblePosition[1])
      if (positionValue === child) {
        break
      }
      if (typeof positionValue === 'object') {
        if (Array.isArray(positionValue) && positionValue.length === 0) {
          this.grid[currentPossiblePosition[1]][currentPossiblePosition[0]] = child
          this.grid[currentPossiblePosition[1]][currentPossiblePosition[0]].isPlaced()
          break
        } else if (positionValue.error) {
          if (positionValue.error.includes('y')) {
            if (Math.sign(positionsInOrder[i][1]) === -1) {
              this.addLineStartToGrid()
              newParentPosition.y += 1
            } else {
              this.addLineEndToGrid()
            }
          }
          if (positionValue.error.includes('x')) {
            if (Math.sign(positionsInOrder[i][0]) === -1) {
              this.addColumnStartToGrid()
              newParentPosition.x += 1
            } else {
              this.addColumnEndToGrid()
            }
          }
          possiblePositions = this.getPossiblePositionsRelative(positionsInOrder, newParentPosition)
          i -= 1
        }
      }
    }
  }

  getNewLineStructure() {
    const numberOfColumn = this.getNumberOfColumn()
    const arrayToAdd = []
    for (let i = 0; i < numberOfColumn; i += 1) {
      arrayToAdd.push([])
    }

    return arrayToAdd
  }

  addLineStartToGrid() {
    this.grid.unshift(this.getNewLineStructure())
  }

  addLineEndToGrid() {
    this.grid.push(this.getNewLineStructure())
  }

  addColumnStartToGrid() {
    this.grid.forEach((line) => {
      line.unshift([])
    })
  }

  addColumnEndToGrid() {
    this.grid.forEach((line) => {
      line.push([])
    })
  }

  checkPositionInGrind(x, y) {
    const error = []
    if (!this.grid[y]) {
      error.push('y')
    }
    if (!this.grid[0][x]) {
      error.push('x')
    }
    if (error.length === 0) {
      return this.grid[y][x]
    }
    return { error }
  }
}

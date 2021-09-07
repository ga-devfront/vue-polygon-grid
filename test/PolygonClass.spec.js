import Polygon from '../src/utility/PolygonClass'

// yarn test './test/PolygonClass.spec.js'

describe('Polygon constructor', () => {
  test('Check if the constructor works with empty parameters (only name)', () => {
    const polygon = new Polygon({
      name: 'test',
    })

    expect(polygon).toEqual({
      name: 'test',
      metas: null,
      color: null,
      background: null,
      children: [],
      parent: null,
      placed: false,
      order: {
        0: 'topRight',
        1: 'bottomRight',
        2: 'bottom',
        3: 'bottomLeft',
        4: 'topLeft',
        5: 'top',
      },
    })
  })

  test('Check if the constructor works with parameters', () => {
    const polygon = new Polygon({
      name: 'test',
      metas: {
        icon: 'test-icon',
        string: 'my test polygon',
      },
      color: '#45ff45',
      background: 'rgb(150, 20, 10)',
      children: [
        {
          name: 'test child 1',
        },
        {
          name: 'test child 2',
        },
      ],
      order: {
        0: 'top',
        1: 'topLeft',
        2: 'bottomLeft',
        3: 'bottom',
        4: 'bottomRight',
        5: 'topRight',
      },
    })

    expect(polygon).toEqual({
      name: 'test',
      metas: {
        icon: 'test-icon',
        string: 'my test polygon',
      },
      color: '#45ff45',
      background: 'rgb(150, 20, 10)',
      children: [
        {
          name: 'test child 1',
        },
        {
          name: 'test child 2',
        },
      ],
      parent: null,
      placed: false,
      order: {
        0: 'top',
        1: 'topLeft',
        2: 'bottomLeft',
        3: 'bottom',
        4: 'bottomRight',
        5: 'topRight',
      },
    })
  })
})

describe('Polygon methods', () => {
  test('setParent', () => {
    const polygon = new Polygon({
      name: 'test',
    })

    const parentPolygon = new Polygon({
      name: 'parent test',
    })

    expect(polygon.parent).toEqual(null)

    polygon.setParent(parentPolygon)

    expect(polygon.parent).toEqual(parentPolygon)
  })

  test('isPlaced', () => {
    const polygon = new Polygon({
      name: 'test',
    })

    expect(polygon.placed).toEqual(false)

    polygon.isPlaced()

    expect(polygon.placed).toEqual(true)
  })
})

describe('Polygon errors', () => {
  test('Checks if an error is throw when the structure is not an object', () => {
    function polygonError() {
      return new Polygon(['test'])
    }
    expect(polygonError).toThrowError(new Error('The datas structure is not correct. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#structure-is-not-correct'))
  })

  test('Checks if an error is throw when we add a non-existent field', () => {
    function polygonError() {
      return new Polygon({
        name: 'test',
        foo: 'bar',
      })
    }
    expect(polygonError).toThrowError(new Error('Polygons fields are not correct. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#fields-are-not-correct'))
  })

  test('Checks if an error is throw when there is an incorrect field name', () => {
    function polygonError() {
      return new Polygon({
        name: 'test',
        meta: {
          foo: 'bar',
        },
      })
    }
    expect(polygonError).toThrowError(new Error('Polygons fields are not correct. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#fields-are-not-correct'))
  })

  test('Checks if an error is raised when no name is provided', () => {
    function polygonError() {
      return new Polygon({})
    }
    expect(polygonError).toThrowError(new Error('Polygons name is not valid. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#name-is-not-valid'))
  })

  test('Checks if an error is raised when the name provided is an empty string', () => {
    function polygonError() {
      return new Polygon({
        name: '   ',
      })
    }
    expect(polygonError).toThrowError(new Error('Polygons name is not valid. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#name-is-not-valid'))
  })

  test('Checks if an error is raised when the order field is not an object', () => {
    function polygonError() {
      return new Polygon({
        name: 'test',
        order: ['topLeft', 'bottom'],
      })
    }
    expect(polygonError).toThrowError(new Error('Polygons order have wrong format. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#order-have-wrong-format'))
  })

  test('Checks if an error is raised when a position is missing in the order field', () => {
    function polygonError() {
      return new Polygon({
        name: 'test',
        order: {
          0: 'topRight',
          1: 'bottomRight',
          2: 'bottom',
          3: 'bottomLeft',
          4: 'top',
          5: 'top',
        },
      })
    }
    expect(polygonError).toThrowError(new Error('Polygon miss order position. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#miss-order-position'))
  })

  test('Checks if an error is raised when a position name is wrong', () => {
    function polygonError() {
      return new Polygon({
        name: 'test',
        order: {
          0: 'topRight',
          1: 'bottomRight',
          2: 'bottom',
          3: 'bottomLeft',
          4: 'topleft',
          5: 'top',
        },
      })
    }
    expect(polygonError).toThrowError(new Error('Wrong position name. For more details : https://github.com/ga-devfront/JS-utility-bundle/wiki/Errors#wrong-position-name'))
  })
})

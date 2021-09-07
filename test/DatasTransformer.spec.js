import Polygon from '../src/utility/PolygonClass'
import DatasTransformer from '../src/utility/DatasTransformer'

// yarn test './test/DatasTransformer.spec.js'

describe('DatasTransformer constructor', () => {
  test('Check if the data information is stored', () => {
    const datasTransformer = new DatasTransformer({
      name: 'test',
    })

    expect(datasTransformer.datas).toEqual({
      name: 'test',
    })
  })
})

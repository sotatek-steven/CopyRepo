import { convertToDataDisplay } from '@/utils/functionData/convertToDataDisplay';
import OUTPUT_DATA from './output';
import INPUT_DATA from './input';

/* eslint-disable no-undef */
describe('convert to display data', () => {
  test('function id: 62d78805350709bef56c1c6d', () => {
    const { nodes, edges } = OUTPUT_DATA;

    const { nodes: _nodes, edges: _edges } = convertToDataDisplay(INPUT_DATA);

    _nodes.forEach((_element, idx) => {
      const element = nodes[idx];
      expect(element).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          type: element.type,
          data: element.data,
        })
      );

      if (element.extent === 'parent') expect(element.extent).toEqual('parent');
    });

    _edges.forEach((_element, idx) => {
      const element = edges[idx];
      expect(_element).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          source: expect.any(String),
          target: expect.any(String),
          type: element.type,
          label: element.label,
        })
      );
    });
  });
});

import { convertToDataTransferApi } from '@/utils/functionData/convertToDataTransferApi';
import { DATA as INPUT_DATA } from './input';
import { DATA as OUTPUT_DATA } from './output';

/* eslint-disable no-undef */
describe('convert to display data', () => {
  test('function id: 62d78805350709bef56c1c6d', () => {
    const { nodes, edges } = INPUT_DATA;
    const result = convertToDataTransferApi({ nodes, edges });
    expect(result).toEqual(OUTPUT_DATA);
  });
});

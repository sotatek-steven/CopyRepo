import { convertToELKFormat } from '@/utils/functionData/convertToELKFormat';
import { DATA as INPUT_DATA } from './input';

/* eslint-disable no-undef */
describe('convert data to ELK format', () => {
  test('function id: 62d78805350709bef56c1c6d', () => {
    convertToELKFormat(INPUT_DATA);
  });
});

// import random from 'lodash-es/random';

const REACT_APP_NODE_1 = process.env.NEXT_PUBLIC_BINANCE_NODE_1;
const REACT_APP_NODE_2 = process.env.NEXT_PUBLIC_BINANCE_NODE_2;
const REACT_APP_NODE_3 = process.env.NEXT_PUBLIC_BINANCE_NODE_3;

const REACT_APP_NODE_POLYGON_1 = process.env.NEXT_PUBLIC_POLYGON_NODE_1;
const getNodeUrl = () => {
  return {
    // 56: REACT_APP_NODE_2,
    // 97: REACT_APP_NODE_2,
    // 80001: REACT_APP_NODE_POLYGON_1,
    'binance': REACT_APP_NODE_2,
    'polygon': REACT_APP_NODE_POLYGON_1,
  }
};
export default getNodeUrl;

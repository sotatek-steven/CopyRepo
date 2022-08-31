export const FAKE_DATA = {
  type: 'init',
  position: {
    x: 600,
    y: 300,
  },
  next: {
    type: 'finish',
    position: {
      x: 600,
      y: 600,
    },
    next: {
      type: 'activityFinal',
      position: {
        x: 600,
        y: 900,
      },
    },
  },
};

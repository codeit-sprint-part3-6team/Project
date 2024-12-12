const theme = {
  color: {
    black_000000: '#000000',
    black_171717: '#171717',
    black_333236: '#333236',
    black_4B4B4B: '#4b4b4b',

    gray_787486: '#787486',
    gray_9FA6B2: '#9FA6B2',
    gray_D9D9D9: '#D9D9D9',
    gray_EEEEEE: '#EEEEEE',
    gray_FAFAFA: '#FAFAFA',

    white_FFFFFF: '#FFFFFF',

    violet_5534DA: '#5534DA',
    violet_F1EFFD: '#F1EFFD',

    red_D6173A: '#D6173A',

    green_7AC555: '#7AC555',

    orange_FFA500: '#FFA500',

    blue_76A6EA: '#76A5EA',

    pink_E876EA: '#E876EA',

    purple_760DDE: '#760DDE',
  },
  zIndex: {
    root: 1,
    floatingButton: 2,
    nav: 3,
    sidebar: 4,
    modal: 5,
  },
} as const;

export type Theme = typeof theme;

export { theme };
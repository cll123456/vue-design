// {
//   bgColor: 'rgba(225,225,225, 0)', // ruler bg color
//     longfgColor: '#BABBBC', // ruler longer mark color
//       shortfgColor: '#C8CDD0', // ruler shorter mark color
//         fontColor: '#7D8694', // ruler font color
//           shadowColor: '#E8E8E8', // ruler shadow color
//             lineColor: '#EB5648',
//               borderColor: '#DADADC',
//                 cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
//                   menu: {
//     bgColor: '#fff',
//       dividerColor: '#DBDBDB',
//         listItem: {
//       textColor: '#415058',
//         hoverTextColor: '#298DF8',
//           disabledTextColor: 'rgba(65, 80, 88, 0.4)',
//             bgColor: '#fff',
//               hoverBgColor: '#F2F2F2'
//     }
//   }

export interface IPaletteObj {
  /**
   * 尺子的背景颜色
   */
  bgColor: string;
  /**
   * 尺子长线刻度的颜色
   */
  longfgColor: string;
  /**
   * 尺子短线刻度的颜色
   */
  shortfgColor: string;
  /**
   * 尺子的文字颜色
   */
  fontColor: string;
  /**
   * 尺子的阴影背景
   */
  shadowColor: string;
  /**
   * 指示性的颜色
   */
  lineColor: string;
  borderColor: string;
  cornerActiveColor: string;
  menu: Menu;
}

interface Menu {
  bgColor: string;
  dividerColor: string;
  listItem: ListItem;
}

interface ListItem {
  textColor: string;
  hoverTextColor: string;
  disabledTextColor: string;
  bgColor: string;
  hoverBgColor: string;
}
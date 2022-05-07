import { TAlignType, TBorderStyle } from '@/types/styleType'
import { IBaseType, Styles } from '../baseType'

export interface ITextCompStyle extends Styles {
  /**
   * 文本颜色
   */
  color: string
  /**
   * 字体大小
   */
  fontSize: string
  /**
   * 字体的粗细
   */
  fontWeight: string
  /**
   * 字体的居中方式 left, center, right
   */
  textAlign: TAlignType
  /**
   * 边框大小
   */
  borderWidth: string
  /**
   * border风格
   */
  borderStyle: TBorderStyle
  /**
   * 边框的颜色
   */
  borderColor: string
  /**
   * 字体的透明度
   */
  opacity: number
  /**
   * 字符间距
   */
  letterSpacing: string
  /**
   * 行高
   */
  lineHeight: string
}

export interface ITextCompConfig extends IBaseType {
  styles: ITextCompStyle
}

const textCompConfig: ITextCompConfig = {
  base: {
    id: 'textComp',
    name: '文字',
    iconName: 'i-mdi-format-text',
  },
  id: 'textComp',
  component: 'TextComp',
  compProps: {
    vModel: '双击编辑文字',
  },
  events: [],
  animation: '',
  config: {
    isLock: false,
  },
  styles: {
    width: '500',
    height: '100',
    top: '',
    left: '',
    rotate: '0',
    fontSize: '20',
    fontWeight: '500',
    color: '#303133',
    textAlign: 'left',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: '#ccc',
    opacity: 1,
    letterSpacing: '0',
    lineHeight: '1',
  },
}

export default textCompConfig

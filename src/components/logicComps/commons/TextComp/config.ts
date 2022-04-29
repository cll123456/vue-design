import { IBaseType } from '../baseType'

const textCompConfig: IBaseType = {
  base: {
    id: 'textComp',
    name: '文字',
    iconName: 'i-mdi-format-text',
  },
  id: 'textComp',
  componentName: 'TextComp',
  compProps: {
    vModel: '双击编辑文字',
  },
  events: [],
  animation: '',
  config: {
    isLock: false,
  },
  styles: {
    classNames: [],
    width: '',
    height: '',
    top: '',
    left: '',
    right: '',
    bottom: '',
  },
}

export default textCompConfig

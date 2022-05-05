import { IBaseType } from '../baseType'

const textCompConfig: IBaseType = {
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
    right: '',
    bottom: '',
    rotate: '0',
    fontSize: '20',
  },
}

export default textCompConfig

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseType {
  /**
   * 基础字段
   */
  base: Base
  /**
   * 组件名称
   */
  componentName: string
  /**
   * 事件
   */
  events: any[]
  /**
   * 动画
   */
  animation: string
  /**
   * 其他配置
   */
  config: Config
  /**
   * 样式
   */
  styles: Styles
  /**
   * 组件属性
   */
  compProps: compProps
}

interface compProps {
  /**
   * v-model的值
   */
  vModel: any
}

interface Styles {
  /**
   * 类名，unocss
   */
  classNames: string[]
  /**
   * 宽度
   */
  width: string
  /**
   * 高度
   */
  height: string
  /**
   * 具体顶部距离
   */
  top: string
  /**
   * 距离左侧距离
   */
  left: string
  /**
   * 距离右侧距离
   */
  right: string
  /**
   * 距离底部距离
   */
  bottom: string
}

interface Config {
  /**
   * 是否锁住组件
   */
  isLock: boolean
  [key: string]: any
}

interface Base {
  /**
   * 组件id
   */
  id: string
  /**
   * 组件名称
   */
  name: string
  /**
   * 图标名称
   */
  iconName: string
}

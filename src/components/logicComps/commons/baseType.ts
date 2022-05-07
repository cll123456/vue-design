/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseType {
  /**
   * 配置的组件id
   */
  id: string
  /**
   * 基础字段
   */
  base: ICompBase
  /**
   * 组件名称
   */
  component: string
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

export interface Styles {
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
   * 旋转角度
   */
  rotate: string

  [key: string]: any
}

interface Config {
  /**
   * 是否锁住组件
   */
  isLock: boolean
  [key: string]: any
}

export interface ICompBase {
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

import { Component } from 'vue'

/* eslint-disable @typescript-eslint/no-explicit-any */
type component = typeof import('vue')
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
   * 距离右侧距离
   */
  right: string
  /**
   * 距离底部距离
   */
  bottom: string
  /**
   * 边框
   */
  borderWidth?: string
  /**
   * 内边距
   */
  letterSpacing?: string
  /**
   * 圆角
   */
  borderRadius?: string
  /**
   * 字体大小
   */
  fontSize?: string

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

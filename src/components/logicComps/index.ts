import { IBaseType } from './commons/baseType'

const compList: IBaseType[] = []
/**
 * 导入下面所有的config
 */
const modules = import.meta.glob('./**/config.ts')
for (const path in modules) {
  modules[path]().then((mod) => {
    compList.push(mod.default)
  })
}

export default compList

import { IBaseType } from '@/components/logicComps/commons/baseType'
import logicCompJson from '@/components/logicComps/index'
import { useCompConfigStore } from '@/store/compConfig'
import generateID from '@/utils/genId'
import { deepCopy } from '@/utils/objUtils'

export function useDraggableComp() {
  const compConfig = useCompConfigStore()

  const handleDragStart = (e: DragEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e.dataTransfer?.setData('compid', (e.target as any)?.dataset.compid)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const compid = e.dataTransfer?.getData('compid')
    const basicContainer = document
      .getElementById('myCanvasContainerId')
      ?.getBoundingClientRect()
    console.log(logicCompJson)
    const component = deepCopy(
      logicCompJson.filter((f) => f.id === compid)[0],
    ) as IBaseType
    if (e && basicContainer) {
      component.styles.top = (e.clientY - basicContainer.y).toString()
      component.styles.left = (e.clientX - basicContainer.x).toString()
      component.id = generateID().toString()
      compConfig.$patch({
        compList: [...compConfig.compList, component],
      })
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'copy'
  }

  return {
    handleDragStart,
    handleDrop,
    handleDragOver,
  }
}

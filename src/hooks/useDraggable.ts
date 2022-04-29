import logicCompJson from '@/components/logicComps/index'
import { useCompConfigStore } from '@/store/compConfig'
import generateID from '@/utils/genId'
import { deepCopy } from '@/utils/objUtils'
const compConfig = useCompConfigStore()

export function useDraggableComp() {
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
    const component = deepCopy(logicCompJson.filter((f) => f.id === compid)[0])
    if (e && basicContainer) {
      component.config.top = e.clientY - basicContainer.y
      component.config.left = e.clientX - basicContainer.x
      component.id = generateID()
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

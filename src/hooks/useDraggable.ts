export function useDraggableComp() {
  const handleDragStart = (e: DragEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e.dataTransfer?.setData('compid', (e.target as any)?.dataset.compid)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const compid = e.dataTransfer?.getData('compid')
    console.log(compid, '--------compid-')
    const basicContainer = document
      .getElementById('myCanvasContainerId')
      ?.getBoundingClientRect()
    if (e && basicContainer) {
      const top = e.clientY - basicContainer.y
      const left = e.clientX - basicContainer.x
      console.log(top, left, '--------top, left-')
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

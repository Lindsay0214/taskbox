import { VirtualList } from "./VirtualList"
class StaticVirtualList extends VirtualList {
  getStartAndEndIndex({ scrollTop }: { scrollTop: number }) {
    const startIndex = Math.floor(scrollTop / this.getRowHeight())
    const exceedVisibleRowHeight = scrollTop % this.getRowHeight()
    const visibleRowCount = Math.ceil(
      (this.clientHeight + exceedVisibleRowHeight) / this.getRowHeight(),
    )
    const endIndex = startIndex + visibleRowCount - 1
    return { startIndex, endIndex }
  }

  getTopHeight({ startIndex }: { startIndex: number }) {
    return startIndex * this.getRowHeight()
  }

  getBottomHeight({
    topHeight,
    startIndex,
    endIndex,
  }: {
    topHeight: number
    startIndex: number
    endIndex: number
  }) {
    const totalHeight = this.count * this.getRowHeight()
    const visibleRowCount = endIndex - startIndex + 1
    return totalHeight - topHeight - visibleRowCount * this.getRowHeight()
  }
}

export default StaticVirtualList

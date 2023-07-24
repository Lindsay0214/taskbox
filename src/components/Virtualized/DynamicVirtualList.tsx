import { VirtualList } from "./VirtualList"

class DynamicVirtualList extends VirtualList {
  getStartAndEndIndex({ scrollTop }: { scrollTop: number }) {
    const scrollAndClientHeight = scrollTop + this.clientHeight
    let index = 0,
      startIndex = 0,
      endIndex = 0,
      accumulatedHeight = 0

    do {
      accumulatedHeight += this.getRowHeight(index)

      if (accumulatedHeight <= scrollTop) startIndex = index + 1
      else if (accumulatedHeight < scrollAndClientHeight) endIndex = index
      else if (accumulatedHeight >= scrollAndClientHeight) {
        endIndex = index
        break
      }
    } while (++index < this.count)
    return { startIndex: startIndex, endIndex: endIndex }
  }

  getTopHeight({ startIndex }: { startIndex: number }) {
    const topHeight = Array.from({ length: this.count })
      .slice(0, startIndex)
      .reduce((acc: number, _, index: number) => acc + this.getRowHeight(index), 0)
    return Math.max(topHeight, 0)
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
    const totalHeight = Array.from({ length: this.count }).reduce(
      (acc: number, _, index: number) => acc + this.getRowHeight(index),
      0,
    )

    const visibleRowCount = Array.from({ length: endIndex - startIndex + 1 }).reduce(
      (acc: number, _, index: number) => acc + this.getRowHeight(startIndex + index),
      0,
    )

    return Math.max(totalHeight - topHeight - visibleRowCount, 0)
  }
}

export default DynamicVirtualList

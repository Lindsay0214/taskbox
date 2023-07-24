export type rowHeightType = number | ((index: number) => number)

export abstract class VirtualList {
  _clientHeight: number
  rowHeight: rowHeightType
  count: number
  static OFFSET: number = 20

  constructor({
    clientHeight,
    rowHeight,
    count,
  }: {
    clientHeight: number
    rowHeight: rowHeightType
    count: number
  }) {
    this._clientHeight = clientHeight
    this.rowHeight = rowHeight
    this.count = count
  }

  get clientHeight(): number {
    return this._clientHeight + VirtualList.OFFSET * 2
  }

  protected abstract getStartAndEndIndex({ scrollTop }: { scrollTop: number }): {
    startIndex: number
    endIndex: number
  }
  protected abstract getTopHeight({ startIndex }: { startIndex: number }): number
  protected abstract getBottomHeight({
    topHeight,
    scrollTop,
    startIndex,
    endIndex,
  }: {
    topHeight: number
    scrollTop: number
    startIndex: number
    endIndex: number
  }): number

  getRowHeight(index?: number) {
    if (typeof this.rowHeight === "number") return this.rowHeight
    else if (typeof index === "number") return this.rowHeight(index)
    return -1
  }

  calculate(scrollTop: number) {
    const { startIndex, endIndex } = this.getStartAndEndIndex({ scrollTop })
    const topHeight = this.getTopHeight({ startIndex })
    const bottomHeight = this.getBottomHeight({ topHeight, scrollTop, startIndex, endIndex })
    return { startIndex, endIndex, topHeight, bottomHeight }
  }
}

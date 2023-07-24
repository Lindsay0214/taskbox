import React, { useState, useEffect, useRef } from "react"
import { rowHeightType, VirtualList } from "./VirtualList"
import StaticVirtualList from "./StaticVirtualList"
import DynamicVirtualList from "./DynamicVirtualList"
import ReactVirtualized from "./ReactPlugin/ReactVirtualized";
import ReactWindow from "./ReactPlugin/ReactWindow";

type VirtualizedProps<T> = {
  data: T[]
  height: number
  rowHeight: rowHeightType
  renderRow: (rowData: T, index: number) => React.ReactNode
}

const Virtualized = <T,>({ data, height, rowHeight, renderRow }: VirtualizedProps<T>) => {
  const [startIndex, setStartIndex] = useState(0)
  const [topHeight, setTopHeight] = useState(0)
  const [bottomHeight, setBottomHeight] = useState(0)
  const [visibleData, setVisibleData] = useState<T[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const virtualListRef = useRef<VirtualList>(
    (() => {
      const virtualParams = {
        clientHeight: height,
        rowHeight,
        count: data.length,
      }
      return typeof rowHeight === "number"
        ? new StaticVirtualList(virtualParams)
        : new DynamicVirtualList(virtualParams)
    })(),
  )

  useEffect(() => {
    const scroll = () => {
      if (containerRef.current) {
        const { startIndex, endIndex, topHeight, bottomHeight } = virtualListRef.current.calculate(
          containerRef.current.scrollTop,
        )

        setStartIndex(startIndex)
        setTopHeight(topHeight)
        setBottomHeight(bottomHeight)
        setVisibleData(data.slice(startIndex, endIndex + 1))
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", scroll)
      scroll()
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", scroll)
      }
    }
  }, [])

  return (
    <div ref={containerRef} style={{ height: `${height}px`, overflowY: "auto" }}>
      <div style={{ height: `${topHeight}px` }}></div>
      {visibleData.map((rowData, index) => (
        <div
          key={`${startIndex}${index}`}
          style={{
            height: `${virtualListRef.current.getRowHeight(startIndex + index)}px`,
          }}>
          {renderRow(rowData, startIndex + index)}
        </div>
      ))}
      <div style={{ height: `${bottomHeight}px` }}></div>
    </div>
  )
}

export default Virtualized

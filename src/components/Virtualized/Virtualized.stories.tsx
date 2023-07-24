import { Meta } from "@storybook/react"
import Virtualized from "./index"
import data from "./virtualizedFakeData.json"

export default {
  title: "Example/Virtualized",
  component: Virtualized,
  argTypes: {
    className: {
      control: false,
    },
  },
} as Meta

export const DefaultVirtualized = () => {
  return (
    <Virtualized
      data={data}
      height={400}
      rowHeight={40}
      renderRow={(item, index) => (
        <div
          style={{
            background: "#FFF5CF",
            height: "100%",
            border: "1px solid #1EA7FD",
          }}
          key={`${item}${index}`}>
          {item.name} / {item.gender} / {item.location}
        </div>
      )}
    />
  )
}

export const DynamicHeightVirtualized = () => {
  const getRowHeight = (index: number) => {
    // const data = fakeData[index]
    if (index % 2 === 1) return 25
    return 50
  }
  return (
    <Virtualized
      data={data}
      height={400}
      rowHeight={index => getRowHeight(index)}
      renderRow={(item, index) => (
        <div
          style={{
            background: "#FFF5CF",
            border: "1px solid #1EA7FD",
            height: "100%",
            padding: "5px",
          }}
          key={`${item}${index}`}>
          {item.name} / {item.gender} / {item.location}
        </div>
      )}
    />
  )
}

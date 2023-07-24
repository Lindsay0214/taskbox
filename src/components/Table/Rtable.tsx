import { Table as RsuiteTable, TableProps as RsuiteTableProps } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.min.css"

// @ts-ignore
const Rtable = ({ data = [], autoHeight = true, ...props }: RsuiteTableProps) => {
    return (
        <div>
            <RsuiteTable
                {...props}
                autoHeight={autoHeight}
                data={data}
            />
        </div>
    )
}

export default Rtable

import Virtualized from "../Virtualized";
import { Meta } from "@storybook/react";
import { Column, HeaderCell, Cell } from "rsuite-table";
import Table from "./index";
import data from "./tableFakeData.json"
import { mockColumns } from './utils';

export default {
    title: "Example/Table",
    component: Table,
    argTypes: {
        className: {
            control: false,
        },
    },
} as Meta

export const RsuiteTable = () => {
    return (
        <Table.Rtable
            height={400}
            data={data}
        >
            <Column width={200} align="center">
                <HeaderCell>Time</HeaderCell>
                <Cell dataKey="time" />
            </Column>

            <Column width={100}>
                <HeaderCell>Member</HeaderCell>
                <Cell dataKey="member" />
            </Column>

            <Column width={200}>
                <HeaderCell>Action</HeaderCell>
                <Cell dataKey="action" />
            </Column>

            <Column width={200}>
                <HeaderCell>Market</HeaderCell>
                <Cell dataKey="market" />
            </Column>

            <Column width={200}>
                <HeaderCell>Handicap</HeaderCell>
                <Cell dataKey="handicap" />
            </Column>

            <Column width={300}>
                <HeaderCell>Company Name</HeaderCell>
                <Cell dataKey="companyName" />
            </Column>

            <Column width={300}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
            </Column>
        </Table.Rtable>
    )
}

export const TanstackTable = () => {
    return (
        <Table.TanstackTable data={data} columns={mockColumns} />
    )
}
export interface ColumnContent {
    id: string;
    header: string;
    accessorKet: string;
    cell: (context: { getValue: () => void }) => void;
}

export const generateColumn = (id: string, header: string, accessorKet: string): ColumnContent => ({
    id,
    header,
    accessorKet,
    cell: (context) => context.getValue(),
});

export const mockColumns: ColumnContent[] = [
    generateColumn('time', 'Time', 'time'),
    generateColumn('member', 'Member', 'member'),
    generateColumn('action', 'Action', 'action'),
    generateColumn('market', 'Market', 'market'),
    generateColumn('handicap', 'Handicap', 'handicap'),
    generateColumn('outcome', 'Outcome', 'outcome'),
    generateColumn('adjustValue', 'Adjust Value', 'adjustValue'),
    generateColumn('originalOdds', 'Odds(Original)', 'originalOdds'),
    generateColumn('afterOdds', 'Odds(After)', 'afterOdds'),
    generateColumn('comment', 'Comment', 'comment'),
];
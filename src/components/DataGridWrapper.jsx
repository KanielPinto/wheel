import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

/**
 * 
 * @param {Object} gridConfig - Data grid configuration options
 * @param {Object[]} gridConfig.rows - Rows (data)
 * @param {Object[]} [gridConfig.columns] - Columns (headers)
 * @param {Object} [gridConfig.slots=""] - Custom items to put in slot at the top of data grid.
 * @param {Object} [gridConfig.slotProps=""] - Props for items in slots
 * @param {Object} [gridConfig.styles=""] - Tailwind classes to apply to root container.
 *  
 * @returns 
 */
function DataGridWrapper({ rows, columns, slots = null, slotProps = null, styles = null, pageSize = 10 }) {
    return (
        <div className={`${styles} mt-0 m-6 shadow-soft rounded-2xl h-full`}>
            <DataGrid
                getRowId={(row) => row.transaction_id}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                initialState={{
                    pagination: { paginationModel: { pageSize: pageSize } },
                }}
                pageSizeOptions={[5, 10, 25, 100]}
                className={`!border-0 max-w-full rounded-2xl bg-gray-800`}
                rows={rows} columns={columns}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    '.MuiDataGrid-cell:where(.dark, .dark *)': {
                        color: "white",
                    },
                    '.MuiDataGrid-columnHeaderTitle:where(.dark, .dark *)': {
                        color: "white",
                    },
                    '.MuiDataGrid-columnHeaders': {
                        background: "black !important"
                    },
                    '.MuiToolbar-root:where(.dark, .dark *)': {
                        color: "white",
                    },
                    '.MuiToolbar-root': {
                        transitionDuration: '0s',
                    },
                    '.MuiDataGrid-cell': {
                        transitionDuration: '0s',
                    },
                }}
                slots={slots}
                slotProps={slotProps}
            />
        </div>
    )
}

export default DataGridWrapper
import React, { Fragment, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Admin } from 'hoc/admin'

import { EditTaskModal } from 'slices/task-modal/edit'

import { TableCell, TableRow, Checkbox, IconButton } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'

import { handleToggleTaskStatus } from './actions'

export const EnhancedTableRow = ({ labelId, row }) => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)

  const handleTransformStatus = (status) => {
    if (status === 0) return 'Задача не выполнена'
    if (status === 1) return 'Задача не выполнена, отредактирована админом'
    if (status === 10) return 'Задача выполнена'
    if (status === 11) return 'Задача отредактирована админом и выполнена'
  }

  const handleClick = () => {
    dispatch(handleToggleTaskStatus(row))
  }

  return (
    <Fragment>
      <TableRow hover key={row.id} role="checkbox" tabIndex={-1}>
        <Admin>
          <TableCell component="th" id={labelId} scope="row" padding="checkbox">
            <Checkbox
              onClick={() => handleClick(row)}
              checked={row.status === 10 || row.status === 11}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </TableCell>
        </Admin>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.text}</TableCell>
        <TableCell>{handleTransformStatus(row.status)}</TableCell>
        <Admin>
          <TableCell onClick={() => setEditing(true)} padding="checkbox">
            <IconButton aria-label="edit task">
              <EditIcon />
            </IconButton>
          </TableCell>
        </Admin>
      </TableRow>

      <EditTaskModal
        row={row}
        open={editing}
        handleClose={() => setEditing(false)}
      />
    </Fragment>
  )
}

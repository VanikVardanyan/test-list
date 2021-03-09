import React from 'react'

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

import { Admin } from 'hoc/admin'

const headCells = [
  { id: 'username', numeric: false, label: 'User name' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'text', numeric: false, label: 'Task text' },
  { id: 'status', numeric: false, label: 'Task status' },
]

export function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <Admin>
          <TableCell padding="checkbox"></TableCell>
        </Admin>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

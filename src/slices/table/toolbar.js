import React, { Fragment } from 'react'

import { CreateTaskModal } from 'slices/task-modal/create'

import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useToolbarStyles = makeStyles(() => ({
  toolbar: {
    paddingLeft: '16px',
  },
  title: {
    flex: '1 1 100%',
  },
}))

export const EnhancedTableToolbar = (props) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useToolbarStyles()
  const { page } = props

  return (
    <Fragment>
      <Toolbar disableGutters className={classes.toolbar}>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Task list
        </Typography>

        <Tooltip title="New task">
          <IconButton onClick={handleClickOpen} aria-label="filter list">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <CreateTaskModal open={open} handleClose={handleClose} page={page} />
    </Fragment>
  )
}

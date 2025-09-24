import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

/**
 * An accessible dialog component that follows ARIA best practices
 * and fixes common accessibility issues with Material-UI dialogs.
 */
const AccessibleDialog = ({
  open,
  onClose,
  title,
  titleId,
  contentId,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  disableRestoreFocus = false,
  dividers = false,
  ...props
}) => {
  // Generate default IDs if not provided
  const defaultTitleId = titleId || `dialog-title-${Math.random().toString(36).substr(2, 9)}`;
  const defaultContentId = contentId || `dialog-content-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableRestoreFocus={disableRestoreFocus}
      aria-labelledby={defaultTitleId}
      aria-describedby={defaultContentId}
      {...props}
    >
      {title && (
        <DialogTitle id={defaultTitleId}>
          {title}
        </DialogTitle>
      )}
      
      <DialogContent dividers={dividers} id={defaultContentId}>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AccessibleDialog;

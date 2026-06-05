import { useRef, useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import TableCell from '@mui/material/TableCell';

const TableCellTooltip = ({ children, maxWidth = '150px', ...props }) => {
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setShowTooltip(el.scrollWidth > el.clientWidth);
    }
  }, [children]);

  const content = (
    <span
      ref={textRef}
      style={{
        display: 'inline-block',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </span>
  );

  return (
    <TableCell
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth,
        cursor: showTooltip ? 'pointer' : 'default',
      }}
      {...props}
    >
      {showTooltip ? (
        <Tooltip title={children} arrow>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </TableCell>
  );
};

export default TableCellTooltip;

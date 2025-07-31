import { styled } from '@mui/material/styles';
import { TableCell, TableContainer, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#8D5524',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  textAlign: 'center',
  '&.MuiTableCell-root': {
    padding: theme.spacing(2),
  },
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 480,
  margin: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    textAlign: 'center',
    padding: theme.spacing(1.5),
  },
  '& .MuiLink-root': {
    color: '#8D5524',
    fontWeight: 500,
    '&:hover': {
      color: '#6d4019',
      textDecoration: 'underline',
    },
  },
}));

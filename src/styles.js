import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export const useStyles = makeStyles(theme => ({
  root: {
    width: '99%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  id: {
    width: '10%',
  },
  name: {
    width: '23%',
  },
  sexBornDied: {
    width: '9%',
  },
  father: {
    width: '20%',
  }
}));

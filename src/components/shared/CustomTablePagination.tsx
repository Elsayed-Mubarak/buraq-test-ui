
import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

type CustomPaginationProps = {
  data: any;
  page: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  rowsPerPage: number;
};

export default function CustomTablePagination({ data, page, setPage, rowsPerPage, setRowsPerPage }: CustomPaginationProps) {

  const handleChangePage = (
    event: any,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: any,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='font-nunito text-secondary-50 bg-white py-5 flex items-center justify-end'>
      <table aria-label="custom pagination table">
        <tfoot>
          <tr>
            <CustomPagination
              rowsPerPageOptions={[10, 20, 50]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'Rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                  slots: {
                    firstPageIcon: FirstPageRoundedIcon,
                    lastPageIcon: LastPageRoundedIcon,
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon,
                  },
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const CustomPagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color:'#fff';
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'Nunito', sans-serif;
    padding: 6px 8px 2px 2px;
    border: 1px solid #e0e0e0;
    border-radius: 8px; 
    background-color: transparent;
    color: #092445;
    outline: none;
  }

  & .${classes.displayedRows} {
    margin: 0;
  }

  & .${classes.actions} {
    display: flex;
    align-items: center;
    gap: 12px;
    border: transparent;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border-radius: 50%; 
    background-color: transparent;
    color: #092445;
    > svg {
      font-size: 22px;
    }
    &:disabled {
      opacity: 0.3;
    }
  }
  `,
);

import { Skeleton, TableCell, TableRow } from "@mui/material";

const RowUserSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton width={120} />
        <Skeleton width={160} variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton width={200} />
      </TableCell>
      <TableCell>
        <Skeleton width={100} />
      </TableCell>
      <TableCell>
        <Skeleton width={60} height={28} />
      </TableCell>
      <TableCell>
        <Skeleton width={90} height={28} />
      </TableCell>
      <TableCell>
        <Skeleton width={80} />
      </TableCell>
      <TableCell>
        <Skeleton width={100} />
      </TableCell>
    </TableRow>
  );
};

export default RowUserSkeleton;

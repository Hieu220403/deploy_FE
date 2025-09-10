import React, { useEffect, useState } from "react";
import { useAppDispatch } from "~/hooks/useAppDispatch";

const ListReview = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    // dispatch(getListReview({ page: 1, limit: 10 }));
  }, [dispatch]);
  return <div>ListReview</div>;
};

export default ListReview;

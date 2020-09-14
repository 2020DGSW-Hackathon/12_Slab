import React, { useCallback, useState, useEffect } from 'react';
import ShowLabStatus from 'components/ShowLabStatus';
import useStores from 'lib/useStores';
import { observer } from 'mobx-react';

const ShowLabStatusContainer = observer(() => {
  const { store } = useStores();
  const {
    handleLabStatus,
    selectLabModal,
    labstatus,
  } = store.ShowLabStatusStore;

  const [usableLab, setUsableLab] = useState();
  console.log('labstatuslabstatus', labstatus);

  const requestHandleLabStatus = useCallback(async () => {
    try {
      await handleLabStatus();
      // setUsableLab(response.data.list.length);
    } catch (error) {
      return error;
    }
  }, [handleLabStatus]);

  useEffect(() => {
    requestHandleLabStatus();
  }, [requestHandleLabStatus]);

  return (
    <>
      <ShowLabStatus labstatus={labstatus} selectLabModal={selectLabModal} />
    </>
  );
});

export default ShowLabStatusContainer;

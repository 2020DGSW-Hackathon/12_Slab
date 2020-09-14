import React, { useCallback, useEffect, useState } from 'react';
import useStores from 'lib/useStores';
import Modal from 'components/common/Modal/Modal';
import { observer } from 'mobx-react';
import SelectLab from 'components/SelectLab';
import moment from 'moment';
import Swal from 'sweetalert2';

const SelectLabContainer = observer(() => {
  const { store } = useStores();
  const { isSelectModal, selectLabModal } = store.ShowLabStatusStore;

  const { handleSelectLab, handleApplyLab, labList } = store.SelectLabStore;
  const { handleLabStatus } = store.ShowLabStatusStore;
  const {
    handleUserInfo,
    handleUserApplyLab,
    myApplyLabList,
  } = store.UserInfoStore;

  const requestHandleSelectLab = useCallback(async () => {
    try {
      const response = await handleSelectLab();
      // setAllLab(response.data.list);
    } catch (error) {
      return error;
    }
  }, [handleSelectLab]);

  const requestHandleApplyLab = useCallback(
    async (idx) => {
      const request = {
        isHave: '1',
        date: moment().format('YYYY-MM-DD'),
        whoMade: sessionStorage.getItem('id'),
      };

      console.log(request);
      try {
        const response = await handleApplyLab(request, idx);
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            title: '성공!',
            text: '랩실 신청을 완료했습니다!',
            icon: 'success',
          });
          await selectLabModal();
          await handleSelectLab();
          await handleUserApplyLab();
          console.log('1');
          await handleLabStatus();
          console.log('2');

          // await
        }
      } catch (error) {
        return error;
      }
    },
    [selectLabModal, handleSelectLab, handleUserApplyLab, handleLabStatus]
  );

  useEffect(() => {
    requestHandleSelectLab();
  }, [requestHandleSelectLab]);

  return (
    <>
      {isSelectModal ? (
        <Modal width={'1280px'} height={'880px'} handleClose={selectLabModal}>
          <SelectLab
            labList={labList}
            requestHandleApplyLab={requestHandleApplyLab}
          />
        </Modal>
      ) : null}
    </>
  );
});

export default SelectLabContainer;

import { action, observable } from 'mobx';
import { autobind } from 'core-decorators';
import ShowLabStatusRepository from './ShowLabStatusRepository';

@autobind
class ShowLabStatusStore {
  @observable isSelectModal = false;
  @observable labstatus = [];
  @action
  selectLabModal() {
    this.isSelectModal = !this.isSelectModal;
    console.log(this.isSelectModal);
  }

  @action
  async handleLabStatus() {
    const response = await ShowLabStatusRepository.labStatus();
    this.labstatus = response.data.list;
    console.log(this.labstatus);
    return response;
  }
}

export default ShowLabStatusStore;

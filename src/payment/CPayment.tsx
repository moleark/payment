import { CUqBase } from '../CBase';
import { VPayment } from './VPayment';
import { VPaymentDetail } from './VPaymentDetail';
import { observable } from 'mobx';

export class CPayment extends CUqBase {

    @observable cashouts: any[] = [];

    protected async internalStart(param: any) {
        this.cashouts=this.uqs.easyBuziPayment.SearchEasyBuziPaymentTaskHistory.list;
    }

    tab = () => this.renderView(VPayment);

            /**
     * 打开付款详情界面
     */
    onPaymentSelected = async (task: any) => {
        this.openVPage(VPaymentDetail, task);
    }
}
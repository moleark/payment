import { View} from 'tonva';
import { CUqBase } from '../CBase';
import { VPendingPayment } from './VPendingPayment';
import { VPendingPaymentDetail } from './VPendingPaymentDetail';
import { BoxId} from 'tonva';
import { observable } from 'mobx';

export class CPendingPayment extends CUqBase {

    @observable cashouts: any[] = [];

    async internalStart(param: any) {
        this.cashouts=this.uqs.easyBuziPayment.SearchEasyBuziPayment.list;
    }

    renderRootList() {
        this.renderView(VPendingPayment);
    }

    async getAccounts(agency: any): Promise<any[]> {
        return await this.uqs.webuser.WebUserAccountMap.obj({ agency: agency });
    }

        /**
     * 打开付款详情界面
     */
    onWebUserNameSelected = async (task: any) => {
        this.openVPage(VPendingPaymentDetail, task);
    }

    saveTask = async (task: any,result: string) => {
        //完结任务--后台数据
        let { taskid } = task;
        let param = {
            taskid: taskid,
            remarks:result,
            result: 1
        };
        await this.uqs.easyBuziPayment.AddEasyBuziPaymentTask.submit(param);
    }
}


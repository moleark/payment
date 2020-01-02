import { CUqBase } from '../CBase';
import { observable } from 'mobx';
import { VPrintPendingPayment } from './VPrintPendingPayment';
import { VPrintPendingPaymentDetail } from './VPrintPendingPaymentDetail';
import { VRejectPayment } from './VRejectPayment';
import { nav } from 'tonva';
import { PaymentSuccess } from './PaymentSuccess';

export class CPrintPendingPayment extends CUqBase {

    @observable printPending: any[] = [];
    @observable printPendings: any[] = [];

    protected async internalStart() {
        await this.load();
    }

    load = async () => {
        this.printPending = await this.uqs.ebPayment.SearchPrintPaymentPending.table(undefined);
        this.add8();
    }

    private add8() {
        function chinaOffset(d: Date): Date {
            if (d === undefined) return;
            let ret = new Date((d.getTime() + 8 * 3600 * 1000));
            return ret;
        }
        try {
            // 时差处理
            this.printPending.forEach(chs => {
                let { date, price, agency, taskid, id } = chs;
                this.printPendings.push({
                    date: chinaOffset(date) //  dayjs(ch.date).add(8, 'hour')
                    , price: price
                    , agency: agency
                    , taskid: taskid
                    , id: id
                })
            });
        }
        catch (err) {
            debugger;
        }
    }

    tab = () => this.renderView(VPrintPendingPayment);

    /**
    * 打开付款详情界面
    */
    onPaymentDetailSelected = async (task: any) => {
        this.openVPage(VPrintPendingPaymentDetail, task);
    }


    /**
    * 打开待打印任务界面
    */
    onNewRejectTask = async (task: any) => {
        this.openVPage(VRejectPayment, task);
    }

    RejectPayment = async (task: any, result: any) => {
        //确认驳回--后台数据
        let { taskid, comments } = result;
        let param = {
            pendingid: task.id,
            taskid: taskid,
            result: 0,
            comments: comments,
        };
        await this.uqs.ebPayment.AddEasyBuziPaymentTask.submit(param);
        let index = this.printPendings.findIndex(v => v.taskid === taskid);
        this.printPendings.splice(index, 1);
        // 打开下单成功显示界面
        nav.popTo(this.cApp.topKey);
        this.openVPage(PaymentSuccess);
    }

    saveTask = async (task: any) => {
        //确认付款--后台数据
        let { id, taskid } = task;
        let param = {
            pendingid: id,
            taskid: taskid,
            result: 1,
            comments: ''
        };
        await this.uqs.ebPayment.AddEasyBuziPaymentTask.submit(param);
        // 打开下单成功显示界面
        let index = this.printPendings.findIndex(v => v.id === id);
        this.printPendings.splice(index, 1);
        nav.popTo(this.cApp.topKey);
        this.openVPage(PaymentSuccess);
    }
}
import { CAppBase, IConstructor, User, nav } from "tonva";
import { UQs } from "./uqs";
import { CUqBase, CUqApp } from "./CBase";
import { VMain } from './ui/main';
import { CHome } from "./home/CHome";
import { CPayment } from './payment/CPayment';
import { CPendingPayment } from './payment/CPendingPayment';
import { CPrintPendingPayment } from './payment/CPrintPendingPayment';

export class CApp extends CUqApp {

    topKey: any;

    cHome: CHome;
    cPayment: CPayment;
    cPendingPayment: CPendingPayment;
    cPrintPendingPayment: CPrintPendingPayment;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cHome = this.newC(CHome);
        this.cPayment = this.newC(CPayment);
        this.cPendingPayment = this.newC(CPendingPayment);
        this.cPrintPendingPayment = this.newC(CPrintPendingPayment);
        let promises: PromiseLike<void>[] = [];
        promises.push(this.cPendingPayment.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
    async loginCallBack(user: User) {

    }
}

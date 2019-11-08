import { CAppBase, IConstructor, User, nav } from "tonva";
import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VMain } from './ui/main';
import { CHome } from "./home/CHome";
import { CPendingPayment } from './payment/CPendingPayment';

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };

    topKey: any;

    cHome: CHome;
    cPendingPayment: CPendingPayment;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cHome = this.newC(CHome);
        this.cPendingPayment = this.newC(CPendingPayment); 

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cPendingPayment.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}

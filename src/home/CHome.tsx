import { CUqBase } from '../CBase';
import { VHome } from './VHome';

export class CHome extends CUqBase {

    async internalStart(param: any) {

        let { cPendingPayment } = this.cApp;
        await cPendingPayment.start();
        this.openVPage(VHome);
    }

    toCashOutList = () => {
        let { cPendingPayment } = this.cApp;
        return cPendingPayment.renderRootList();
    }
    tab = () => this.renderView(VHome);
}
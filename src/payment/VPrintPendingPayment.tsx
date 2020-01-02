import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, Page } from 'tonva';
import { CPrintPendingPayment } from './CPrintPendingPayment';

export class VPrintPendingPayment extends View<CPrintPendingPayment> {

    private renderRootCategory = (item: any, parent: any) => {
        let { date, price, agency } = item;
        let left = <div className="mr-3"> {this.controller.cApp.cPendingPayment.renderUserIcon(agency.id)}</div>;
        let right = <div><i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>{price}
            &nbsp;&nbsp; <FA name="chevron-right" className="text-primary" /></div>
        return <LMR left={left} right={right} className="px-3 py-2" onClick={() => this.controller.onPaymentDetailSelected(item)}>
            {<div><EasyDate date={date} /></div>}
            <div className="small text-muted">{this.controller.cApp.cPendingPayment.renderInventory(agency.id)}</div>
        </LMR>
    }

    private page = () => {
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>待支出</span>
        </header>;
        return <Page header={header} headerClassName="bg-primary">
            <this.content />
        </Page>;
    };

    render() {
        return <this.page />
    }

    private content = observer(() => {
        let { printPendings } = this.controller;
        return <List items={printPendings} item={{ render: this.renderRootCategory }} none="目前还没有待支出任务哦！" />;
    });
} 

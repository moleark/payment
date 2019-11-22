import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, EasyDate, tv, LMR } from 'tonva';
import { CPayment } from './CPayment';
import { VPSiteHeader } from './VPSiteHeader';
import dayjs from 'dayjs';

export class VPayment extends VPage<CPayment> {

    async open(param?: any) {

    }

    private renderRootCategory = (item: any, parent: any) => {
        let { date, price, createdate, result, agency } = item;
        let left =
            <div>
                <div className="small">
                    <span>申请时间：{dayjs(createdate).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <div className="small">
                    <span>确认时间：{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <div className="small">
                    {this.controller.cApp.cPendingPayment.renderInventory(agency.id)}
                </div>
            </div>;
        let color = result === "已付" ? <div className="h4 mb-0 text-success small text-right">{result}</div> : <div className="h4 mb-0 text-danger small  text-right">{result}</div>;
        let right =
            <div>
                <div>
                    <span>
                        <i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>
                        {price}
                    </span>
                </div>
                {color}
            </div>;

        return <div className="py-1" onClick={() => this.controller.onPaymentSelected(item)} >
            <LMR left={left} right={right} className="px-3 py-2 bg-white" >
            </LMR>
        </div>
    }

    render() {
        return <this.content />
    }

    private content = observer(() => {
        let { cashouthistorys } = this.controller.cApp.cPendingPayment;
        let siteHeader = this.renderVm(VPSiteHeader);
        return <>
            {siteHeader}
            {cashouthistorys.map(v => this.renderRootCategory(v, undefined))}</>;
    });
} 
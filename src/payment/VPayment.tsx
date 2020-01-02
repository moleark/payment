import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, EasyDate, tv, LMR } from 'tonva';
import { CPayment } from './CPayment';
import dayjs from 'dayjs';

export class VPayment extends VPage<CPayment> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { date, price, createdate, result, agency } = item;
        let left =
            <div className="mr-3 small">
                <div>
                    {this.controller.cApp.cPendingPayment.renderUserIcon(agency.id)}
                </div>
                <div>
                    {this.controller.cApp.cPendingPayment.renderInventory(agency.id)}
                </div>
            </div>;
        let left1 =
            <div className="small">
                <div>
                    <span>申请时间：{dayjs(createdate).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <div>
                    <span>确认时间：{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
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
                {left1}
            </LMR>
        </div>
    }

    private page = () => {
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>已支出</span>
        </header>;
        return <Page header={header} headerClassName="bg-primary">
            <this.content />
        </Page>;
    };

    render() {
        return <this.page />
    }

    private content = observer(() => {
        let { cashouthistorys } = this.controller;
        return <>
            {cashouthistorys.map(v => this.renderRootCategory(v, undefined))}</>;
    });
} 
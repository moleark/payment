import * as React from 'react';
import { View,EasyDate,tv,LMR } from 'tonva';
import { CPayment } from './CPayment';

export class VPayment extends View<CPayment> {

    private renderRootCategory = async (item: any, parent: any) => {
        let { agency, date,price,createdate,result} = item;

        let right = 
        <span>
            <i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>
            {price}
        </span>;
        return <LMR right={right} className="px-3 py-2">
        <div onClick={() => this.controller.onPaymentSelected(item)}>
            <div className="flex-grow-1 small">
                <span>姓名：{tv(agency, v => <>{v.name}</>)}</span>
            </div>
            <div className="small">
                <span>提现时间：{<EasyDate date={date} />}</span>
            </div>
            <div className="small">
                <span>确认时间：{<EasyDate date={createdate} />}</span>
            </div>
            <div className="small">
                <span>结果：{result}</span>
            </div>
        </div>
    </LMR>
    }

    render(param: any): JSX.Element {
        let { cashouts } = this.controller;
        return <>{cashouts.map(v => this.renderRootCategory(v, undefined))}</>;
    }
} 
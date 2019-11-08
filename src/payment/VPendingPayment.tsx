import * as React from 'react';
import { View,EasyDate,tv,LMR } from 'tonva';
import { CPendingPayment } from './CPendingPayment';

export class VPendingPayment extends View<CPendingPayment> {

    private renderRootCategory = async (item: any, parent: any) => {
        let { agency, date, taskid, price,currency } = item;
        let right = 
        <span>
            <i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>
            {price}
        </span>;
        return <LMR right={right} className="px-3 py-2">
        <div onClick={() => this.controller.onWebUserNameSelected(item)}>
        <span>{tv(agency, v => <>{v.name}</>)}&nbsp; {<EasyDate date={date} />}</span>

        </div>
    </LMR>
    }

    render(param: any): JSX.Element {
        let { cashouts } = this.controller;
        return <>{cashouts.map(v => this.renderRootCategory(v, undefined))}</>;
    }
} 
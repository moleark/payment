import * as React from 'react';
import { observer } from 'mobx-react';
import { View, EasyDate, FA, LMR, List, EasyTime } from 'tonva';
import { CPendingPayment } from './CPendingPayment';
import dayjs from 'dayjs';

export class VPendingPayment extends View<CPendingPayment> {

    private renderRootCategory = (item: any, parent: any) => {
        let { date, price, agency } = item;
        /*
        let left = <div><div> {this.controller.renderUserIcon(agency.id)}{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>{this.controller.renderInventory(agency.id)}</div></div>
        let right = <div><i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>{price}
            &nbsp; <FA name="chevron-right" className="text-primary" />
        </div>;
        return <div className="d-block p-1">
            <LMR left={left} right={right} className="px-3 py-1" onClick={() => this.controller.onWebUserNameSelected(item)}>
            </LMR></div>
        */
        let left = <div className="mr-3"> {this.controller.renderUserIcon(agency.id)}</div>;
        let right = <div><i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>{price}
            &nbsp;&nbsp; <FA name="chevron-right" className="text-primary" /></div>
        return <LMR left={left} right={right} className="px-3 py-2" onClick={() => this.controller.onWebUserNameSelected(item)}>
            {/* <div>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</div> */ <div><EasyDate date={date} /></div>}
            <div className="small text-muted">{this.controller.renderInventory(agency.id)}</div>
        </LMR>
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private content = observer(() => {
        let { cashouts } = this.controller;
        return <List items={cashouts} item={{ render: this.renderRootCategory }} none="目前还没有待打印任务哦！" />;
    });
} 

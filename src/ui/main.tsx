import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { CApp } from '../CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }
    render = (param?: any): JSX.Element => {
        let { cHome, cPayment, cPrintPendingPayment } = this.controller;
        let faceTabs = [
            { name: 'home', label: '待打印', icon: 'print', content: cHome.tab, notify: undefined },
            { name: 'home', label: '待支出', icon: 'check-square-o', content: cPrintPendingPayment.tab, load: cPrintPendingPayment.load },
            { name: 'paid', label: '已支出', icon: 'history', content: cPayment.tab, load: cPayment.load }
        ].map(v => {
            let { name, label, icon, content, notify, load } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
                load: load,
            }
        });
        return <Page header={false}>
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}

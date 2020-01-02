import * as React from 'react';
import { CHome } from './CHome';
import { Page, View } from 'tonva';

export class VHome extends View<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.page />
    }

    private page = () => {
        let header = <header className="py-2 px-4 text-center text-white">
            <span className="h5 align-middle" style={{ textAlign: 'center' }}>待打印</span>
        </header>;
        return <Page header={header} headerClassName="bg-primary">
            <this.content />
        </Page>;
    };

    private content = () => {
        let { controller } = this;
        let { toCashOutList } = controller;
        return <>
            {toCashOutList()}
        </>
    };
}
import * as React from 'react';
import { View, nav } from 'tonva';
import { LMR, FA, SearchBox } from 'tonva';
import logo from '../images/logo.png';
import { CHome } from './CHome';

export class VSiteHeader extends View<CHome> {
    render() {
        return <LMR
        className="mb-3 align-items-center bg-primary">
        <div className="px-3 py-3 text-center">
            <div className="h4 px-3 mb-0 text-white">待办事宜</div>
        </div>
    </LMR>
        //return <div className="h4 px-3 mb-0">百灵威科技</div>
    }
}
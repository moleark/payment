import * as React from 'react';
import { VPage, User, Page, EasyDate, EasyTime, nav } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { CPayment } from './CPayment';
import logo from '../images/logo.png';
import dayjs from 'dayjs';
import { ProductImage } from 'tools/productImage';

export class VPaymentVoucher extends VPage<CPayment> {

    private task: any;
    private telephone: string
    private identitycard: string
    private identityicon: string
    private subbranchbank: string
    private bankaccountnumber: string
    private identityname: string

    async open(task: any) {
        this.task = task;
        let { agency } = task;
        let account = await this.controller.cApp.cPendingPayment.getAccounts(agency);
        if (account != undefined) {
            let { telephone, identitycard, identityicon, subbranchbank, bankaccountnumber, identityname } = account;
            this.telephone = telephone;
            this.identitycard = identitycard;
            this.identityicon = identityicon;
            this.subbranchbank = subbranchbank;
            this.identityname = identityname;
            this.bankaccountnumber = bankaccountnumber;
        } else {
            this.telephone = null;
            this.identitycard = null;
            this.identityicon = null;
            this.subbranchbank = null;
            this.identityname = null;
            this.bankaccountnumber = null;
        }

        this.openPage(this.page);
    }

    private page = () => {
        let taskData = _.clone(this.task);
        let { date, price, createdate, result, comments, user } = taskData;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">付款凭证</span>
        </header>;
        let identityimage = this.identityicon === null ? "无" : <ProductImage chemicalId={this.identityicon} className="img-thumbnail" />;
        return <Page header={header} headerClassName="bg-primary">
            <div className="m-1 text-center">
                <table className="table">
                    <tr style={{ borderTopStyle: 'hidden', lineHeight: '4px' }}>
                        <td rowSpan={2} style={{ textAlign: 'left', width: '10px' }}><img className="m-1" src={logo} alt="logo" style={{ height: "4rem", width: "4rem" }} /></td>
                        <td><h3 style={{ lineHeight: '2px' }}>支  出  凭  单</h3></td>
                    </tr>
                    <tr style={{ lineHeight: '0px' }}>
                        <td colSpan={2}>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                </table>
                <table className="table table-bordered">
                    <tr>
                        <td><h5 style={{ width: '50px', fontWeight: 'bold', textAlign: 'left' }}>即付</h5></td>
                        <td colSpan={2}><h5 style={{ fontWeight: 'bold' }}>服务费</h5></td>
                    </tr>
                    <tr>
                        <td colSpan={3}><h5 style={{ textAlign: 'right', fontWeight: 'bold' }}>对方科目编号</h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left', fontWeight: 'bold' }}>付款账户</h5></td>
                        <td colSpan={2}><h5 style={{ textAlign: 'left', fontWeight: 'bold' }}>北京百灵威</h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ textAlign: 'left', fontWeight: 'bold' }}>计人民币</h5></td>
                        <td><h5 className="text-uppercase" style={{ textAlign: 'left', fontWeight: 'bold' }}>{this.controller.digitUppercase(price)}</h5></td>
                        <td><h5 style={{ textAlign: 'left', fontWeight: 'bold' }}><i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>{price}</h5></td>
                    </tr>
                    <tr>
                        <td><h5 style={{ fontWeight: 'bold' }}>领款人：</h5></td>
                        <td><h5 style={{ textAlign: 'left' }}>{this.identityname}</h5></td>
                        <td><h5 style={{ textAlign: 'left', fontWeight: 'bold' }}>主管审批：系统管理员</h5></td>
                    </tr>
                </table>
                <div>
                    <table className="table" cellPadding={0} cellSpacing={0} style={{ border: '0', borderTopStyle: 'hidden' }}>
                        <tr>
                            <td><h5 style={{ textAlign: 'left' }}>财务审批人 张园</h5></td>
                            <td><h5 style={{ textAlign: 'right' }} >提交付款要求人 {this.identityname}</h5></td>
                        </tr>
                    </table>
                </div>
                <div className="text-left">
                    <span>姓名： {this.identityname}</span>
                </div>
                <div className="text-left">
                    <span>手机号：{this.telephone}</span>
                </div>
                <div className="text-left">
                    <span>身份证号码： {this.identitycard}</span>
                </div>
                <div className="text-left">
                    <span>账户名称： {this.identityname}</span>
                </div>
                <div className="text-left">
                    <span>开户银行： {this.subbranchbank}</span>
                </div>
                <div className="text-left">
                    <span>账号： {this.bankaccountnumber}</span>
                </div>
                <div>{identityimage}</div>
            </div>
        </Page>
    }

}

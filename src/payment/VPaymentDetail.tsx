import * as React from 'react';
import { VPage, FA, Page, EasyDate, Form } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { CPayment } from './CPayment';
import dayjs from 'dayjs';
import { ProductImage } from 'tools/productImage';

export class VPaymentDetail extends VPage<CPayment> {

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
        let { agency, date, price, createdate, result, comments, user } = taskData;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">付款详情</span>
        </header>;
        let right =
            <div onClick={() => this.controller.onNewPaymentVoucher(taskData)}>
                <span className="fa-stack">
                    <i className="fa fa-download fa-stack-1x text-white"></i>
                </span>
            </div>;
        let identityimage = this.identityicon === null ? "无" : <ProductImage chemicalId={this.identityicon} className="img-thumbnail w-50" />;
        return <Page header={header} right={right} headerClassName="bg-primary">
            <div className="h2 m-3 text-center">
                <i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>
                {price}
            </div>
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-warning" name="user-circle" /><span className="h6 py-2 px-2 align-middle small"><b> 收方身份信息</b></span>
                </div>
                <div className="cat-root-sub">
                    <div><span className="py-2 px-4 align-middle text-muted small">收方姓名</span><span className="py-2 px-4 small">{this.identityname}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">收方手机</span><span className="py-2 px-4 small">{this.telephone}</span></div>
                    <div><p><span className="py-2 px-4 align-middle text-muted small">收方身份证号</span><span className="py-3 small">{this.identitycard}</span></p></div>
                </div>
            </div>
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-success" name="credit-card" /><span className="h6 py-2 px-2 align-middle small"><b> 收方银行信息</b></span>
                </div>
                <div className="cat-root-sub">
                    <div><span className="py-2 px-4 pr-5 align-middle text-muted small">收方开户名</span><span className="small">{this.identityname}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">收方银行账号</span><span className="px-2 small">{this.bankaccountnumber}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">收方开户行支行</span><span className="small">{this.subbranchbank}</span></div>
                    <div><p><span className="py-2 px-4 align-middle text-muted small">身份证复印件</span><span className="py-2 small">{identityimage}</span></p></div>
                </div>
            </div>
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-danger" name="bookmark" /><span className="h6 py-2 px-2 align-middle small"><b> 详情</b></span>
                </div>
                <div className="cat-root-sub">
                    <div><span className="py-2 px-4 align-middle text-muted small">支付金额</span><span className="py-2 px-4 small">人民币 {price}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">申请时间</span><span className="py-2 px-4 small">{dayjs(createdate).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">确认时间</span><span className="py-2 px-4 small">{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">付款结果</span><span className="py-2 px-4 small text-danger">{result}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">驳回原因</span><span className="py-2 px-4 small text-danger">{comments}</span></div>
                </div>
            </div>
        </Page>
    }
}

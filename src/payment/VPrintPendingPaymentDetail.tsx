import * as React from 'react';
import { VPage, FA, Page, EasyDate, UiSchema, UiInputItem, UiIdItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import dayjs from 'dayjs';
import { CPrintPendingPayment } from './CPrintPendingPayment';
import { ProductImage } from 'tools/productImage';

const schema: Schema = [
    { name: 'taskid', type: 'id', required: false },
];

export class VPrintPendingPaymentDetail extends VPage<CPrintPendingPayment> {

    private form: Form;
    private task: any;
    private telephone: string
    private identitycard: string
    private identityicon: string
    private subbranchbank: string
    private bankaccountnumber: string
    private identityname: string

    private uiSchema: UiSchema = {
        items: {
            taskid: { visible: false },
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(task: any) {
        this.task = task;
        let { agency } = task;
        let account = await this.controller.cApp.cPendingPayment.getAccounts(agency.id);
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

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveTask(this.task);
        this.closePage();
    }

    private onSaveTask = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let taskData = _.clone(this.task);
        let { date, price } = taskData;
        let footer: any;
        if (this.telephone !== null && this.subbranchbank !== null && this.identityname !== null && this.identitycard !== null && this.identityicon !== null && this.bankaccountnumber !== null) {
            footer = <div className="d-flex px-3 py-2">
                <button type="button" className="btn btn-outline-info" onClick={() => this.controller.onNewRejectTask(taskData)} >&nbsp;驳&nbsp;回&nbsp;</button>
                <div className="flex-grow-1"></div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={this.onSaveTask}>&nbsp;支&nbsp;出&nbsp;</button>
            </div>;
        } else {
            footer = <div className="btn w-100">
                <button type="button" className="btn btn-outline-info" onClick={() => this.controller.onNewRejectTask(taskData)} >&nbsp;驳&nbsp;回&nbsp;</button>
            </div>;
        }

        let right =
            <div onClick={() => this.controller.cApp.cPayment.onNewPaymentVoucher(taskData)}>
                <span className="fa-stack">
                    <i className="fa fa-download fa-stack-1x text-white"></i>
                </span>
            </div>;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">确认付款信息</span>
        </header>;
        let identityimage = this.identityicon === null ? "无" : <ProductImage chemicalId={this.identityicon} className="img-thumbnail w-50" />;
        return <Page header={header} right={right} footer={footer} headerClassName="bg-primary">
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
                    <div><p><span className="py-2 px-4 align-middle text-muted small">收方身份证号</span><span className="py-2 small">{this.identitycard}</span></p></div>
                    <div><p><span className="py-2 px-4 align-middle text-muted small">身份证复印件</span><span className="py-2 small">{identityimage}</span></p></div>
                </div>
            </div>
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-success" name="credit-card" /><span className="h6 py-2 px-2 align-middle small"><b> 收方银行信息</b></span>
                </div>
                <div className="cat-root-sub">
                    <div><span className="py-2 px-4 pr-5 align-middle text-muted small">收方开户名</span><span className="py-2 small">{this.identityname}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">收方银行账号</span><span className="py-2 px-2 small">{this.bankaccountnumber}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">收方开户行支行</span><span className="py-2 small">{this.subbranchbank}</span></div>
                </div>
            </div>
            <div className="py-2 bg-white mb-3">
                <div className="cursor-pointer">
                    &nbsp;<FA className="align-middle text-danger" name="bookmark" /><span className="h6 py-2 px-2 align-middle small"><b> 详情</b></span>
                </div>
                <div className="cat-root-sub">
                    <div><span className="py-2 px-4 align-middle text-muted small">支付金额</span><span className="py-2 px-4 small">人民币 {price}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">申请时间</span><span className="py-2 px-4 small">{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    <div><span className="py-2 px-4 align-middle text-muted small">状态</span><span className="py-2 px-5 small text-danger">&nbsp;已打印</span></div>
                </div>
            </div>
            <div className="p-3">
                <Form ref={v => this.form = v} className="m-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={taskData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3}
                />
            </div>
        </Page>
    }
}

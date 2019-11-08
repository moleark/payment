import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem,UiIdItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { CPendingPayment } from './CPendingPayment';

const schema: Schema = [
    { name: 'taskid', type: 'id', required: false },
    { name: 'remarks', type: 'string', required: true },
];

export class VPendingPaymentDetail extends VPage<CPendingPayment> {

    private form: Form;
    private task: any;
    private telephone:string
    private identitycard:string
    private identityicon:string
    private subbranchbank:string
    private bankaccountnumber:string   
    private bankaccountname:string  

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },    
            remarks: { widget: 'text', label: '付款备注'} as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(task:any) {
        this.task = task;
        let { agency} = task;  
        let account=await this.controller.getAccounts(agency);
        let { telephone,identitycard,identityicon,subbranchbank,bankaccountnumber,bankaccountname} = account[0];
        this.telephone=telephone;
        this.identitycard=identitycard;
        this.identityicon=identityicon;
        this.subbranchbank=subbranchbank;
        this.bankaccountname=bankaccountname;
        this.bankaccountnumber=bankaccountnumber;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveTask(this.task,context.form.data);
        this.closePage();
    }

    private onSaveTask = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let taskData = _.clone(this.task);  
        let { agency, date, taskid, price } = taskData; 

        let footer : any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveTask}>确定</button>;

        return <Page header="确认付款信息" footer={footer}>   
                <div className="m-3">
                    <i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>
                    {price}
                </div>   
                <div className="bg-white mb-3">
                    <div className="py-2 px-3 cursor-pointer">
                        <b>收方信息</b>
                    </div>
                    <div className="cat-root-sub">
                        收方姓名：{tv(agency, v => <>{v.name}</>)}
                        收方手机：{this.telephone}
                        收方身份证号：{this.identitycard}
                        收方开户行支行：{this.subbranchbank}
                        收方开户名：{this.bankaccountname}
                        收方银行账号：{this.bankaccountnumber}
                    </div>
                </div>
                <div className="p-3 bg-white">
                    <Form ref={v => this.form = v}  className="m-3"
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

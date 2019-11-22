import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, BoxId, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CPendingPayment } from './CPendingPayment';

const schema: Schema = [
    { name: 'taskid', type: 'id', required: false },
    { name: 'comments', type: 'string', required: true },
];

export class VRejectPayment extends VPage<CPendingPayment> {

    private form: Form;
    private task: any;

    private uiSchema: UiSchema = {
        items: {
            taskid: { visible: false },        
            comments: { widget: 'text', label: '驳回原因', placeholder: '必填' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(task:any) {
        this.task = task;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.RejectPayment(this.task,context.form.data);
    }

    private onReject = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let taskData = _.clone(this.task);
        let footer : any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onReject}>确认驳回</button>;

        return <Page header="确认驳回" footer={footer}  headerClassName="bg-primary">
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

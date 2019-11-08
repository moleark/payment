import * as React from 'react';
import { VPage, Page, EasyDate } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { CPayment } from './CPayment';

export class VPaymentDetail extends VPage<CPayment> {

    private task: any;
    private telephone:string
    private identitycard:string
    private identityicon:string
    private subbranchbank:string
    private bankaccountnumber:string   
    private bankaccountname:string  

    async open(task:any) {
        this.task = task;
        let { agency} = task;  
        let account=await this.controller.cApp.cPendingPayment.getAccounts(agency);
        let { telephone,identitycard,identityicon,subbranchbank,bankaccountnumber,bankaccountname} = account[0];
        this.telephone=telephone;
        this.identitycard=identitycard;
        this.identityicon=identityicon;
        this.subbranchbank=subbranchbank;
        this.bankaccountname=bankaccountname;
        this.bankaccountnumber=bankaccountnumber;
        this.openPage(this.page);
    }

    private page = () => {
        let taskData = _.clone(this.task);  
        let { agency, date,price,createdate,result,comments,user} = taskData; 

        return <Page header="确认付款信息">   
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
                        提现申请时间：{<EasyDate date={createdate} />}
                    </div>
                </div>  
                <div className="bg-white mb-3">
                    <div className="py-2 px-3 cursor-pointer">
                        <b>付款结果</b>
                    </div>
                    <div className="cat-root-sub">
                        付款人：{tv(user, v => <>{v.name}</>)}
                        付款时间：{<EasyDate date={date} />}
                        付款结果：{result}
                        收方备注：{comments}
                    </div>
                </div>  
        </Page>
    }
}

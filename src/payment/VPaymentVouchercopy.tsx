import * as React from 'react';
import { VPage, User, Page, EasyDate, EasyTime, nav } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { CPayment } from './CPayment';
import logo from '../images/logo.png';
import dayjs from 'dayjs';
import { ProductImage } from 'tools/productImage';

export class VPaymentVouchercopy extends VPage<CPayment> {

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
        let { date, price } = taskData;

        let header = <header className="py-2 text-center text-white">
            <span className="h5 align-middle">付款凭证</span>
        </header>;
        let identityimage = this.identityicon === null ? "无" : <ProductImage chemicalId={this.identityicon} className="img-thumbnail" />;
        return <Page header={header} headerClassName="bg-primary">
            <div>
                <div className="container">
                    <div className="row" >
                        <div className="col-md-2" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <img className="m-1" src={logo} alt="logo" style={{ height: "4rem", width: "4rem" }} />
                        </div>
                        <div className="col-md-10" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444', textAlign: 'center' }}>
                            <div className="row" >
                                <div className="col-md-10">
                                    <h3>支  出  凭  单</h3>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-10">
                                    {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row" >
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>即付</h4>
                        </div>
                        <div className="col-md-9" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444', textAlign: 'center' }}>
                            <h4>服务费</h4>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-12" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444', textAlign: 'right' }}>
                            <h4>对方科目编号</h4>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>付款账户</h4>
                        </div>
                        <div className="col-md-9" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>北京百灵威</h4>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>计人民币</h4>
                        </div>
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>{this.controller.digitUppercase(price)}</h4>
                        </div>
                        <div className="col-md-6" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444', textAlign: 'right' }}>
                            <h4><i className="fa fa-jpy fa-jpy-2x" aria-hidden="true"></i>{price}</h4>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>领款人</h4>
                        </div>
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>{this.identityname}</h4>
                        </div>
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>主管审批</h4>
                        </div>
                        <div className="col-md-3" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444' }}>
                            <h4>系统管理员</h4>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-6" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444', textAlign: 'center' }}>
                            <h4>财务审批人  张园</h4>
                        </div>
                        <div className="col-md-6" style={{ boxShadow: 'inset 1px -1px 1px #444, inset -1px 1px 1px #444', textAlign: 'center' }}>
                            <h4>提交付款要求人  {this.identityname}</h4>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <span>姓名： {this.identityname}</span>
                </div>
                <div className="container">
                    <span>手机号：{this.telephone}</span>
                </div>
                <div className="container">
                    <span>身份证号码： {this.identitycard}</span>
                </div>
                <div className="container">
                    <span>账户名称： {this.identityname}</span>
                </div>
                <div className="container">
                    <span>开户银行： {this.subbranchbank}</span>
                </div>
                <div className="container">
                    <span>账号： {this.bankaccountnumber}</span>
                </div>
                <div>{identityimage}</div>
            </div>
        </Page>
    }

}

import { Query,Map,Tuid, Action } from "tonva";

export interface UqPayment {
    SearchEasyBuziPayment: Query;
    SearchEasyBuziPaymentTaskHistory: Query;
    AddEasyBuziPaymentTask:Action;
}

export interface UqWebUser {
    WebUser: Tuid;
    WebUserAccountMap: Map;
}
export interface UQs {
    easyBuziPayment: UqPayment;
    webuser: UqWebUser;
}

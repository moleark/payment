import { Query, Map, Tuid, Action } from "tonva";

export interface UqPayment {
    SearchEasyBuziPayment: Query;
    SearchEasyBuziPaymentTaskAccount: Query;
    SearchPrintPaymentPending: Query;
    AddEasyBuziPaymentTask: Action;
    AddPrintPaymentTask: Action;
}

export interface UqSalesTask {
    WebUserAccountMap: Map;
    $user: Tuid;
}

export interface UqCommon {
    Currency: Tuid;
}

export interface UQs {
    ebPayment: UqPayment;
    salesTask: UqSalesTask;
    common: UqCommon;
}

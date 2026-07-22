import { Enum } from "enum-plus";

/**
 * 订单状态枚举
 */
export const OrderStatus = Enum({
  PENDING_PAYMENT: { value: "pending_payment", label: "待付款" },
  PENDING_SHIPMENT: { value: "pending_shipment", label: "待发货" },
  PENDING_RECEIPT: { value: "pending_receipt", label: "待收货" },
  COMPLETED: { value: "completed", label: "已完成" },
  AFTER_SALES: { value: "after_sales", label: "售后中" },
  CANCELED: { value: "canceled", label: "已取消" },
});

/**
 * 支付方式枚举
 */
export const PaymentMethod = Enum({
  WXPAY: { value: "wxpay", label: "微信支付" },
  ALIPAY: { value: "alipay", label: "支付宝支付" },
  COD: { value: "cod", label: "货到付款" },
  POINTS: { value: "points", label: "积分支付" },
});

/**
 * 订单操作枚举
 */
export const OrderAction = Enum({
  PAY: { value: "pay", label: "支付订单" },
  CANCEL: { value: "cancel", label: "取消订单" },
  SHIP: { value: "ship", label: "发货" },
  CONFIRM_RECEIPT: { value: "confirm_receipt", label: "确认收货" },
  APPLY_AFTER_SALES: { value: "apply_after_sales", label: "申请售后" },
  COMPLETE: { value: "complete", label: "完成订单" },
  DELETE: { value: "delete", label: "删除订单" },
  VIEW_LOGISTICS: { value: "view_logistics", label: "查看物流" },
  REMIND_SHIP: { value: "remind_ship", label: "提醒发货" },
  REMIND_RECEIPT: { value: "remind_receipt", label: "提醒收货" },
});

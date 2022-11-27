import { ClassEnum } from 'class-enum'

export default class OrderStatus extends ClassEnum<OrderStatus> {
  public static readonly APPROVE = new OrderStatus('APPROVE', '승인')
  public static readonly CANCEL = new OrderStatus('CANCEL', '미승인')
  public static readonly PENDING = new OrderStatus('PENDING', '대기중')

  public readonly title

  constructor(value: string, title: string) {
    super(value)
    this.title = title
  }

  public isApprove() {
    return this.equals(OrderStatus.APPROVE)
    // return (this.value = OrderStatus.APPROVE.value)
  }

  public getStatusTitle() {
    return this.title
  }
}

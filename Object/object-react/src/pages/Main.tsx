import React, { useEffect, useState } from 'react'
import OrderStatus from '../enum/OrderStatus'

const Main = () => {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.APPROVE)
  // 서버 FETCHING
  useEffect(() => {
    const status = 'CANCEL'
    setStatus(OrderStatus.valueOf(status))
  }, [])

  // 캡슐화 자체가 필요한 뷰인가?
  return (
    <button style={{ backgroundColor: status.isApprove() ? 'blue' : 'red' }}>
      {status.getStatusTitle()}
    </button>
  )
}

export default Main

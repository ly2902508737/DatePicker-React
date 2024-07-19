import React, { useMemo } from 'react'
import cls from 'classnames'
import { DatePickerPanelCommonProps } from './panel'
import moment from 'moment'
import { ArrowLeftIcon,ArrowRightIcon } from '../icon'
interface DatePickerPanelHeaderProps extends DatePickerPanelCommonProps {
  selectedDate: moment.Moment
  onSubtractMonth: () => void
  onAddMonth: () => void
}

export default function DatePickerPanelHeader(props: DatePickerPanelHeaderProps) {
  const { prefixCls, selectedDate, onSubtractMonth, onAddMonth } = props
  // const panelHeaderPrefixCls = useMemo(() => `${prefixCls}-panel-header`, [prefixCls])
  const panelHeaderPrefixCls = useMemo(() => `date-picker-panel-header`, [prefixCls])


  const selectedYear = useMemo(() => selectedDate.year(), [selectedDate])
  const selectedMonth = useMemo(() => selectedDate.month() + 1, [selectedDate])

  return (
    <div className={cls(panelHeaderPrefixCls)}>
      <span className={cls(`${panelHeaderPrefixCls}-selected-date`)}>
        <span className={cls(`${panelHeaderPrefixCls}-selected-date-year`)}>
          {selectedYear}年
        </span>
        <span className={cls(`${panelHeaderPrefixCls}-selected-date-month`)}>
          {selectedMonth}月
        </span>
        {/* <span className={cls(`${panelHeaderPrefixCls}-selected-date-day`)}>
          x日
        </span> */}
      </span>
      <span className={cls(`${panelHeaderPrefixCls}-switch`)}>
        <span
          className={cls(`${panelHeaderPrefixCls}-switch-group`)}
          onClick={onSubtractMonth}
        >  
          <ArrowLeftIcon/>
        </span>
        <span 
          className={cls(`${panelHeaderPrefixCls}-switch-group`)}
          onClick={onAddMonth}
        >
          <ArrowRightIcon/>
        </span>
      </span>
    </div>
  )
}

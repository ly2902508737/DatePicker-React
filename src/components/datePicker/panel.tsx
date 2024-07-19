import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import DatePickerPanelContent from './content'
import DatePickerPanelFooter from './footer'
import DatePickerPanelHeader from './header'
import { createPortal } from 'react-dom'
import moment, { Moment } from 'moment'
import { DatePickerProps } from '.'
import cls from 'classnames'

export interface DatePickerPanelCommonProps
  extends Required<Pick<DatePickerProps, 'prefixCls'>> { }

export interface DatePickerPanelProps
  extends Omit<DatePickerProps, 'onChange'> {
  visible: boolean | null;
  selectedDate: string | Moment | undefined;
  onSelectedDate?: DatePickerProps['onChange'];
  onClearSelectedDate?: () => void;
  position: { top: number | string; left: number | string };
  onGetPanelRef: (ref: RefObject<HTMLDivElement>) => void;
}

export default function DatePickerPanel(props: DatePickerPanelProps) {
  const {
    showToday,
    allowClear,
    getPopupContainer = () => document.body,
    prefixCls,
    position,
    popupContainerClassName,
    visible: panelVisible,
    selectedDate: selectedDateFromProps,
  } = props

  const [selectedDate, setSelectedDate] = useState<Moment>(() => moment())

  useEffect(() => {
    setSelectedDate(selectedDateFromProps || moment())
  }, [selectedDateFromProps])

  const onAddMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().add(1, 'month'))
  }, [selectedDate])

  const onSubtractMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().subtract(1, 'month'))
  }, [selectedDate])

  const { left, top } = position;

  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    props.onGetPanelRef(panelRef)
  }, [panelRef])

  const onSelectedDate = useCallback((value: moment.Moment | undefined) => {
    setSelectedDate(() => {
      props.onSelectedDate?.(value)
      return value || moment()
    })
  }, [props.onSelectedDate])

  const onSelectToday = useCallback(() => {
    onSelectedDate(moment())
  }, [onSelectedDate])

  const onClearSelectedDate = useCallback(() => {
    onSelectedDate(undefined)
    props.onClearSelectedDate?.()
  }, [onSelectToday])

  return createPortal(
    <div
      className={cls(`${prefixCls}-panel`, popupContainerClassName, {
        [`${prefixCls}-open`]: panelVisible,
        [`${prefixCls}-close`]: !panelVisible,
        [`${prefixCls}-no-animation`]: panelVisible === null,
      })}
      style={{ left, top }}
      ref={panelRef}
    >
      <DatePickerPanelHeader
        selectedDate={selectedDate}
        prefixCls={prefixCls!}
        onAddMonth={onAddMonth}
        onSubtractMonth={onSubtractMonth}
      />
      <DatePickerPanelContent
        prefixCls={prefixCls!}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
      />
      <DatePickerPanelFooter
        prefixCls={prefixCls!}
        showToday={showToday}
        allowClear={allowClear}
        onClearSelectedDate={onClearSelectedDate}
        onSelectToday={onSelectToday}
      />
    </div>,
    getPopupContainer()
  )
}

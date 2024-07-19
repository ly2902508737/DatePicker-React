import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import DatePickerPanel, { DatePickerPanelProps } from './panel'
import { Moment } from 'moment';
import cls from 'classnames'
import './index.less'
import { ClearIcon, CalendarIcon } from '../icon';
import useWindowResize from '../../hooks/useWindowResize';

export interface DatePickerProps {
  prefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onChange?: (value: Moment | any) => void;
  showToday?: boolean;
  allowClear?: boolean;
  className?: string;
  popupContainerClassName?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  value?: Moment;
  defaultValue?: Moment;
}

export default function DatePicker(props: DatePickerProps) {
  useWindowResize(() => {
    setPanelPosition(getPanelPosition())
  })
  const { placeholder, disabled, defaultValue, value, allowClear, ...attr } = props
  const { prefixCls } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [panelVisible, setPanelVisible] = useState<DatePickerPanelProps['visible']>(null)
  const [panelPosition, setPanelPosition] = useState<DatePickerPanelProps['position']>({
    top: 0,
    left: 0
  })
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined)
  const onSelectedDate = useCallback((value?: Moment) => {
    setSelectedDate(value)
    props.onChange?.(value)
    onClosePanel()
  }, [props.onChange])
  const [panelRef, setPanelRef] = useState<RefObject<HTMLDivElement>>({
    current: null
  })
  const onGetPanelRef = useCallback((ref: any) => {
    setPanelRef(ref)
  }, [])
  const getPanelPosition = useCallback(() => {
    const { height, top, left } = inputRef.current!.getBoundingClientRect()
    return {
      top: top + height + window.scrollY,
      left: left
    }
  }, [inputRef.current])
  const onOpenPanel = useCallback(() => {
    setPanelVisible(true)
    setPanelPosition(getPanelPosition())
  }, [])
  const onClosePanel = useCallback(() => {
    setPanelVisible(false)
  }, [])
  const onClickOutsideHandler = useCallback((event: any) => {
    event.stopPropagation()
    if (
      panelVisible &&
      !inputRef.current?.contains(event.target) &&
      !panelRef.current?.contains(event.target)
    ) {
      onClosePanel()
    }
  }, [panelVisible, inputRef, panelRef])
  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler, false)
    return () => {
      window.removeEventListener('click', onClickOutsideHandler, false)
    }
  }, [onClickOutsideHandler])
  const onClearSelectedDate = useCallback(() => {
    setSelectedDate(undefined)
    props.onChange?.(undefined)
  }, [props.onChange])
  return (
    <>
      <div className={`${prefixCls}-input-wrapper`}>
        <input type="text" placeholder={placeholder} readOnly disabled={disabled}
          className={cls(`${prefixCls}-input`, {
            [`${prefixCls}-input-disabled`]: disabled
          })}
          ref={inputRef}
          onClick={onOpenPanel}
          value={selectedDate ? selectedDate.format('YYYY/MM/DD') : ''}
        />
        {selectedDate && allowClear ? (
          <ClearIcon
            className={`${prefixCls}-input-suffix`}
            onClick={onClearSelectedDate}
          />
        ) : (
          <CalendarIcon className={`${prefixCls}-input-suffix`} />
        )}
      </div>
      <DatePickerPanel
        position={panelPosition}
        visible={panelVisible}
        onGetPanelRef={onGetPanelRef}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
        allowClear={allowClear}
        onClearSelectedDate={onClearSelectedDate}
        {...attr} />
    </>
  )
}

DatePicker.defaultProps = {
  prefixCls: 'date-picker',
  showToday: true,
  allowClear: true,
  disabled: false,
  getPopupContainer: () => document.body
} as DatePickerProps


import React, { useCallback, useMemo } from 'react'
import cls from 'classnames'
import moment from 'moment'
import { DatePickerPanelCommonProps } from './panel'
import { DatePickerProps } from '.';
import { range } from '../../utils';

interface DatePickerPanelContentProps extends DatePickerPanelCommonProps {
  selectedDate: moment.Moment;
  onSelectedDate?: DatePickerProps['onChange'];
}

type SelectedMonthType = 'prev' | 'next' | 'current'
const CALENDAR_HEADERS = ['一', '二', '三', '四', '五', '六', '日']
const WEEKDAY = 7
const COLUMN = 6

export default function DatePickerPanelContent(props: DatePickerPanelContentProps) {
  const { prefixCls, selectedDate: selectedDateFromprops } = props
  const panelContentPrefixCls = useMemo(() => `${prefixCls}-panel-content`, [prefixCls]);
  // const panelContentPrefixCls = useMemo(() => `date-picker-panel-content`, [prefixCls]);


  // 获取当前月份
  const cloneSelectedDate = useMemo(() => {
    return selectedDateFromprops.clone()
  }, [selectedDateFromprops])
  // 当前选中的哪一天
  const selectedDate = useMemo(() =>
    // .date()
    cloneSelectedDate.date(),
    [cloneSelectedDate]
  )
  // 当前月份天数
  const selectedMonthVisibleDays = useMemo(() =>
    // .daysInMonth()
    cloneSelectedDate.daysInMonth(),
    [cloneSelectedDate]
  )
  // 这个月的第一天
  const selectedDateFirst = useMemo(() =>
    // .startOf('month')
    cloneSelectedDate.date(1),
    [cloneSelectedDate]
  )
  // 上个月显示天数
  const prevMonthVisibleDays = useMemo(
    () => selectedDateFirst.isoWeekday() - 1,
    [selectedDateFirst]
  );
  // 上一个月有多少天
  const prevMonthDays = useMemo(
    () => cloneSelectedDate.clone().subtract(1, 'month').daysInMonth(),
    [cloneSelectedDate]
  );

  // 下个月显示的天数
  const nextMonthVisibleDays = useMemo(
    () => COLUMN * WEEKDAY - selectedMonthVisibleDays - prevMonthVisibleDays,
    [selectedMonthVisibleDays, prevMonthVisibleDays]
  );
  const onSelectedDate = useCallback(
    (originSelectedDate: number) => (type: SelectedMonthType) => () => {
      let selectedDate = cloneSelectedDate.date(originSelectedDate);
      switch (type) {
        case 'prev':
          selectedDate = selectedDate.subtract(1, 'month');
          break;
        case 'next':
          selectedDate = selectedDate.add(1, 'month');
          break;
      }
      props.onSelectedDate?.(selectedDate);
    },
    [cloneSelectedDate]
  );

  return (
    <div className={cls(panelContentPrefixCls)}>
      <div className={cls(`${panelContentPrefixCls}-header`)}>
        {CALENDAR_HEADERS.map((day) => (
          <span
            className={cls(
              `${panelContentPrefixCls}-header-day`,
              `${prefixCls}-day-title`
            )}
            key={day}
          >
            {day}
          </span>
        ))}
      </div>
      <div>
        {range(prevMonthVisibleDays).map((_, index) => {
          const currentDate = prevMonthDays - prevMonthVisibleDays + index + 1;
          return (
            <span
              className={cls(
                `${panelContentPrefixCls}-date`,
                `${panelContentPrefixCls}-prev-month`
              )}
              key={`prev-month-date-${index}`}
              onClick={onSelectedDate(currentDate)('prev')}
            >
              {currentDate}
            </span>
          );
        })}
        {range(selectedMonthVisibleDays).map((_, index) => {
          const currentDate = index + 1;
          return (
            <span
              className={cls(
                `${panelContentPrefixCls}-date`,
                `${prefixCls}-current-month`,
                {
                  [`${prefixCls}-selected-date`]: selectedDate === currentDate,
                }
              )}
              key={`current-month-date-${index}`}
              onClick={onSelectedDate(currentDate)('current')}
            >
              {currentDate}
            </span>
          );
        })}
        {range(nextMonthVisibleDays).map((_, index) => {
          const currentDate = index + 1;
          return (
            <span
              className={cls(
                `${panelContentPrefixCls}-date`,
                `${panelContentPrefixCls}-next-month`
              )}
              key={`next-month-date-${index}`}
              onClick={onSelectedDate(currentDate)('next')}
            >
              {currentDate}
            </span>
          );
        })}
      </div>
    </div>
  );
}

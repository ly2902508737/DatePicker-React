import React, { useMemo } from 'react';
import cls from 'classnames';
import { DatePickerPanelCommonProps, DatePickerPanelProps } from './panel';

export interface DatePickerPanelFooterProps
    extends DatePickerPanelCommonProps,
    Pick<DatePickerPanelProps, 'allowClear' | 'showToday'> {
    onSelectToday: () => void;
    onClearSelectedDate: () => void;
}

export default function DatePickerPanelFooter(props: DatePickerPanelFooterProps) {
    const {
        showToday,
        allowClear,
        prefixCls,
        onSelectToday,
        onClearSelectedDate,
    } = props;

    const panelFooterPrefixCls = useMemo(() => `${prefixCls}-panel-footer`, [
        prefixCls,
    ]);

    return showToday || allowClear ? (
        <div className={cls(panelFooterPrefixCls)}>
            {showToday && (
                <div
                    className={cls(`${panelFooterPrefixCls}-today`)}
                    onClick={onSelectToday}
                >
                    今天
                </div>
            )}
            {allowClear && (
                <div
                    className={cls(`${panelFooterPrefixCls}-clear`)}
                    onClick={onClearSelectedDate}
                >
                    清除
                </div>
            )}
        </div>
    ) : null;
}
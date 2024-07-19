// Icon/index.tsx
import React from 'react';
import { FiChevronRight, FiChevronLeft, FiCalendar } from 'react-icons/fi';

import { IoMdCloseCircle } from 'react-icons/io';

// 右箭头
export const ArrowRightIcon = (props: any) => <FiChevronRight {...props} />;
// 左箭头
export const ArrowLeftIcon = (props: any) => <FiChevronLeft {...props} />;
// 日历图标
export const CalendarIcon = (props: any) => <FiCalendar {...props} />;
// 清除图标
export const ClearIcon = (props: any) => <IoMdCloseCircle {...props} />;
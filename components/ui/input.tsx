/**
 * Input 组件系统
 * 提供了一个标准化的输入框组件，支持各种输入类型和状态
 */

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Input 组件
 * 基础输入框组件，提供了以下特性：
 * - 统一的样式和尺寸
 * - 支持所有HTML input类型
 * - 响应式设计
 * - 聚焦状态的视觉反馈
 * - 禁用状态的样式处理
 * - 文件上传的特殊样式
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

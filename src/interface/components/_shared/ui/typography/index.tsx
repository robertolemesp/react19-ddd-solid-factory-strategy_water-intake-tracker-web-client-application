import type { FC, PropsWithChildren, JSX } from 'react'

import { mergeClassNames } from '@/utils/classname'

export interface TypographyProps extends PropsWithChildren {
  variant?: 'title' | 'subtitle' | 'body' | 'caption'
  weight?: 'bold' | 'semibold' | 'normal'
  size?: 'sm' | 'base' | 'lg' | 'xl'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const baseStyles = {
  title: 'text-2xl',
  subtitle: 'text-xl',
  body: 'text-base',
  caption: 'text-sm'
}

const weightStyles = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  normal: 'font-normal'
}

const Typography: FC<TypographyProps> = ({ className, variant = 'body', weight = 'normal', size, as = 'p', children }) => {
  const Tag = as

  const textSizeClass = size ? `text-${size}` : baseStyles[variant]
  const fontWeightClass = weightStyles[weight]

  return <Tag className={mergeClassNames(textSizeClass, fontWeightClass, className)}>
    { children }
  </Tag>
}

export default Typography
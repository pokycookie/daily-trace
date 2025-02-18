import { Icon, IconifyIconProps } from '@iconify/react'

export function Iconify({ width, icon }: IconifyIconProps) {
  return <Icon icon={icon} width={width ?? 20} height={width ?? 20} />
}

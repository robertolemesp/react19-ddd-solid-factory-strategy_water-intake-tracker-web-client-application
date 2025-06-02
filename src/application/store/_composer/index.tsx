import type { FC, PropsWithChildren, ReactNode } from 'react'

interface StoreComposerProps extends PropsWithChildren {
  contextProviderComponents: FC<PropsWithChildren>[]
}

const StoreComposer: FC<StoreComposerProps> = ({ contextProviderComponents, children }): ReactNode => 
  contextProviderComponents.reduceRight(
    (acc, ContextProviderComponent) => <ContextProviderComponent>{acc}</ContextProviderComponent>,
    children
  )

export default StoreComposer

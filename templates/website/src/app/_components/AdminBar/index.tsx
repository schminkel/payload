'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'

import { Gutter } from '../Gutter'
import classes from './index.module.scss'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'

  const onAuthChange = React.useCallback((user) => {
    setShow(user?.id)
  }, [])

  return (
    <div className={[classes.adminBar, show && classes.show].filter(Boolean).join(' ')}>
      <Gutter className={classes.blockContainer}>
        <PayloadAdminBar
          {...adminBarProps}
          className={classes.payloadAdminBar}
          classNames={{
            controls: classes.controls,
            logo: classes.logo,
            user: classes.user,
          }}
          cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </Gutter>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import router from 'umi/router'
import styles from './index.module.less'
import { connect } from 'dva'
import { Button } from 'antd'
import classNames from 'classnames/bind'
import dayjs from 'dayjs'
import iconAudio from 'assets/icon_audio.svg'

const cx = classNames.bind(styles)

const Discover = props => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      clearInterval(t)
    }
  })

  useEffect(() => {
    props.dispatch({
      type: 'discover/fetchList',
      payload: { hello: 'world' },
    })
  }, [])

  return (
    <div>
      <h3 className={cx('hlight')}>{count}</h3>
      <span>{dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')}</span>
      <Button>点击</Button>
      <img src={iconAudio} alt="" />
      <span>{props.name}</span>
      <h4>{props.username}</h4>
      <div className={cx('img-bg')} />
    </div>
  )
}

export default connect(({ user, discover }) => {
  console.log('user-------', user, discover)
  return { ...user, ...discover }
})(Discover)

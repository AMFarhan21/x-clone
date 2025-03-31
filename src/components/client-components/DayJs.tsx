"use client"
import dayjs from 'dayjs'
import React from 'react'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const DayJs = ({date}: {date: string}) => {

  let formatedDate = dayjs(date).fromNow().replace(/\ban\b/g, "1").replace(/\ba minute\b/g, "1 minute")


  return (
    <div>
        {formatedDate}
    </div>
  )
}

export default DayJs
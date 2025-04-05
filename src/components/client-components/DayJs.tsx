"use client"
import dayjs from 'dayjs'
import React from 'react'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const DayJs = ({date, profilesCreated}: {date: string | null, profilesCreated: string | null}) => {
  
  let formatedDate;

  if(profilesCreated) {
    formatedDate = dayjs(profilesCreated).format('MMMM YYYY')
  } else {
    formatedDate = dayjs(date).fromNow().replace(/\ban\b/g, "1").replace(/\ba minute\b/g, "1 minute")
  }


  return (
    <div>
        {formatedDate}
    </div>
  )
}

export default DayJs
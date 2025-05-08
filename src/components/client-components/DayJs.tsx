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
    formatedDate = dayjs(date).fromNow().replace("a ", "1").replace("ago", "").replace("our", "").replace("inute", "").replace("econds", "").replace("ay", "").replace("s", "").replace(" ", "").replace("1few", "a few seconds ago")
  }


  return (
    <div>
        {formatedDate}
    </div>
  )
}

export default DayJs
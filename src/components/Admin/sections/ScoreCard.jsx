import React, { useState } from 'react'
import { useEffect } from 'react'
import ExamCard from './ExamCard'

const ScoreCard = () => {
  return (
    <>
    <ExamCard score={true} heading={"Student Scores"}/>
    </>
  )
}

export default ScoreCard